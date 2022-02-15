import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import supertokensNode from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Footer from '../components/Footer';
import Header from '../components/Header';
import QuoteList from '../components/QuoteList';
import { backendConfig } from '../config/backendConfig';
import styles from '../styles/Home.module.css';

const PasswordlessAuthNoSSR = dynamic(
  new Promise((res) =>
    res(Passwordless.PasswordlessAuth)
  ),
  { ssr: false }
)

export async function getServerSideProps(context) {
  // this runs on the backend, so we must call init on supertokens-node SDK
  supertokensNode.init(backendConfig())
  let session
  try {
    session = await Session.getSession(context.req, context.res)
  } catch (err) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: 'needs-refresh' } }
    } else if (err.type === Session.Error.UNAUTHORISED) {
      return { props: {} }
    } else {
      throw err
    }
  }

  return {
    props: { userId: session.getUserId() },
  }
}

export default function Home(props) {
  return (
    <PasswordlessAuthNoSSR>
      <ProtectedPage userId={props.userId} />
    </PasswordlessAuthNoSSR>
  )
}

function ProtectedPage({ userId }) {
  async function logoutClicked() {
    await Passwordless.signOut()
    Passwordless.redirectToAuth()
  }

 

  return (
    <div className={styles.container}>
      <Head>
        <title>Retell</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header logoutClicked={logoutClicked} />
      <main className={styles.main}>
        <QuoteList />
      </main>
      <Footer />
    </div>
  )
}

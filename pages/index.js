import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import supertokensNode from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
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

  async function fetchUserData() {
    const res = await fetch('/api/user')
    if (res.status === 200) {
      const json = await res.json()
      alert(JSON.stringify(json))
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Quotes App!
        </h1>
        {/*<p className={styles.description}>
          You are authenticated with SuperTokens! (UserID: {userId})
        </p>*/}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '70px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingLeft: '75px',
            paddingRight: '75px',
          }}
        >
        <div
            onClick={logoutClicked}
            style={{
              display: 'flex',
              width: '116px',
              height: '42px',
              backgroundColor: '#000000',
              borderRadius: '10px',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            SIGN OUT
          </div>
          <div>Powered by SuperTokens and Next.js</div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://tapasadhikary.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Tapas Adhikary
        </a>
      </footer>
    </div>
  )
}

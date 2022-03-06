import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import QuoteList from '../components/QuoteList';
import styles from '../styles/Home.module.css';


export default function Home(props) {
  return (
   <div className={styles.container}>
      <Head>
        <title>Retell</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <QuoteList />
      </main>
      <Footer />
    </div>
  )
}
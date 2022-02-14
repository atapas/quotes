
import React from 'react'
import SuperTokensReact from 'supertokens-auth-react'
import { frontendConfig } from '../config/frontendConfig'
import '../styles/globals.css'


if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
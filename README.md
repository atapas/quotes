# Retell

`Retell` is an app to get you famous quotes from famous people around the world. This app is created to demonstrate the integration of `SuperTokens` Authentication with `Nextjs`. 

We use the `Passwordless` recipe of SuperTokens to fetch quotes in a guarded way and show them in a `Nextjs` component.

## Screenshots

The Login Screen:

<p align="center">
  <img src="screens/login.png" alt="login" />
</p>

The Quotes Screen:

<p align="center">
  <img src="screens/quotes.png" alt="quotes" />
</p>  

Liked it? Please support the project with a STAR(⭐).

### Many Thanks to all the `Stargazers` who has supported this project with stars(⭐)

[![Stargazers repo roster for @atapas/quotes](https://reporoster.com/stars/atapas/quotes)](https://github.com/atapas/quotes/stargazers)


## Getting Started
First, you need to install dependencies for `Retell`:

```bash
npm install

# or

yarn
```

Create a `.env.local` file at the root of the project with the following content:

```bash
NEXT_PUBLIC_NODEMAILER_USER=<YOUR_GMAIL_ID>
NEXT_PUBLIC_NODEMAILER_PASSWORD=<YOUR_GMAIL_PASSWORD>

NEXT_PUBLIC_APP_URL=http://localhost:3000
```
> **Important Note**: The Gmail id and password is required to send OTP over email. Please do not
use your personal Gmail id for this purpose. You can create a fake gmail id
and lower the security settings to use it for testing purposes.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:
- [SuperTokens Documentation](https://supertokens.com/docs/community/introduction) - The documentation for SuperTokens
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the repository - your feedback and contributions are welcome!


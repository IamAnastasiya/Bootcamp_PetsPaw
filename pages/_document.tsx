import { Html, Main, Head, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Find, vote and upload images of cats, join the cat lovers community" />
        <link rel="shortcut icon" href="/favicon/favicon.png"></link>
      </Head> 
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

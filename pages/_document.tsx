import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Pets Paw</title>
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

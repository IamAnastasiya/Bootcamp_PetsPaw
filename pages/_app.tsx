import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'
import store from '@/store';
import MainLayout from '@/components/layout/MainLayout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Pets Paw</title>
        <meta name='description' content='Find the best cats pictures and give Your votes!'/>
      </Head> 
      <MainLayout>
          <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

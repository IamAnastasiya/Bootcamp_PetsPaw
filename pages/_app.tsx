import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'
import store from '@/store';
import MainLayout from '@/components/layout/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
          <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

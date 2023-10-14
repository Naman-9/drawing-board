import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from "@/components/Board"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

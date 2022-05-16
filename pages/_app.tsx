import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAutn'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* HOC => Higher Order Components */}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp

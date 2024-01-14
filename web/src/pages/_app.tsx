import 'styles/globals.css';
import type {AppProps} from 'next/app';
import {Montserrat_Alternates} from 'next/font/google';

const monterserrat = Montserrat_Alternates({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${monterserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

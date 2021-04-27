import '../styles/globals.css'
import {dbConnect} from '../services/middleware/db'

function MyApp({ Component, pageProps }) {
  async function getServerSideProps(context) {
    await dbConnect()
  }
  return <Component {...pageProps} />
}

export default MyApp

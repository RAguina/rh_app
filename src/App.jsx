import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Layout from './Layout'
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <div>
          <Layout/>
          <AppRoutes/>
          <Footer/>
      </div>
    </Router>
  )
}

export default App

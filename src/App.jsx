import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Layout from './Layout'
import Footer from "./components/Footer"
import { AuthProvider } from './config/AuthContext'
function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Layout/>
          <AppRoutes/>
          <Footer/>
          </AuthProvider>
      </div>
    </Router>
  )
}

export default App

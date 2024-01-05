import Header from "./components/Header"
import { useLocation } from 'react-router-dom'
import { AuthProvider } from "./config/AuthContext"

const Layout = () => {
  const location = useLocation()
  return (
    <div >
      <AuthProvider>
        <Header/>
      </AuthProvider>
    </div>
  )
}

export default Layout
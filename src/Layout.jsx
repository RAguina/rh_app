import Header from "./components/Header"
import { useLocation } from 'react-router-dom'
import { AuthProvider } from "./config/AuthContext"

const Layout = () => {
  const location = useLocation()
  return (
    <div >
        <Header/>
    </div>
  )
}

export default Layout
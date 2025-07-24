import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/auth'
import { ApiProvider } from './context/api'
import { CartProvider } from './context/cart'
import { Header } from "./components/Header"
import { Home } from './pages/Home'
import { LoginPage } from './pages/loginPage/LogInPage'
import { ProtectedRoute } from './ProtectedRoute'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Product } from './components/Product'
import { ToastContainer, Bounce } from 'react-toastify'
import { Helmet } from 'react-helmet'

function App() {

  return (
    <>
      <AuthProvider>
        <ApiProvider>
          <CartProvider>
            <BrowserRouter>
              <Header />
              <Helmet>
                <title>Shopping</title>
                <meta name='description' content='Buy some products on this beautiful website'/>
                <meta name='keywords' content='buy, buy products, shopping' />
              </Helmet>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/dashboard' element={
                  <ProtectedRoute>
                    <Dashboard/>
                  </ProtectedRoute>
                }/>
                <Route path='/:id' element={<Product />} />
              </Routes>
              <ToastContainer 
                position='bottom-left' 
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
              />
            </BrowserRouter>
          </CartProvider>
        </ApiProvider>
      </AuthProvider>
    </>
  )
}

export default App
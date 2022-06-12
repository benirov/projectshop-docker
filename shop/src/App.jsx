import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AutState from './context/auth/authState';
import AppState from './context/app/appState';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Products from './pages/Products';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';



function App() {


  return (
    <AutState>
      <AppState>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Registrar />} />

                <Route path="/products" element={<Products />}>
                    <Route path=":id" element={<Product />} />
                </Route>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </BrowserRouter>
      </AppState>
    </AutState>
  )
}

export default App
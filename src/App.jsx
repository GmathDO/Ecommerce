import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { Cart } from "./components/Cart"
import { Products } from "./components/Products"

function useCart(){
    const [cart, setCart] = useState([])

    const addToCart = product => {
        const productInCartIndex = cart.findIndex(item => item.id === product.id)
        console.log(productInCartIndex)

        if(productInCartIndex >= 0){
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }

        setCart(prevState => ([...prevState, {...product, quantity: 1}]))
        
    }
    
    const clearCart = () => {
        setCart([])
    }

    const removeFromCart = product => {
        setCart(prevState => prevState.filter(item => item.id !== product.id))
    }

    return({cart, setCart, addToCart, clearCart, removeFromCart})
}

function App() {

  const [products, setProducts] = useState([])
  const { cart, addToCart, removeFromCart, clearCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products').
      then(res => res.json())
      .then(json => setProducts(json));    
  }, [])

  return (
    <>
      <Header />
      <Cart cart={cart} addToCart={addToCart} clearCart={clearCart} />
      <Products products={products} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
    </>
  )
}

export default App
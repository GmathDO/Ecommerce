import './Cart.css'
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";

export function Cart({ cart, addToCart, clearCart }){
    const cartCheckboxId = useId()

    return(
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden/>
            <aside className="cart">
                <ul>
                    {cart.map(product => {
                        return(
                            <li key={product.id}>
                                <img src={product.image} alt={product.title} />
                                <div>
                                    <strong>{product.title}</strong> - ${product.price}
                                </div>

                                <footer>
                                    <small>
                                        Qty: {product.quantity}
                                    </small>
                                    <button onClick={() => addToCart(product)}>+</button>
                                </footer>
                            </li>
                        )                        
                    })}
                </ul>

                <button onClick={() => clearCart()}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}
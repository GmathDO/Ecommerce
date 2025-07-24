import "./Header.css"
import { Cart } from "./Cart"
import { Link } from "react-router";
import { useAuth } from "../context/auth";
import { FaSearch } from "react-icons/fa";
import { UserButton } from "./UserButton";
import { useEffect, useState, useRef, useCallback } from "react";
import { useApi } from "../context/api";
import debounce from "just-debounce-it";

function useSearch(){
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    useEffect(() => {
        if(isFirstInput){
            isFirstInput.current = search === ""
            return
        }
        if(search === ''){
            setError('No se puede buscar una producto vacío')
            return
        }
        if(search.match(/^\d+$/)){
            setError('No se puede buscar un producto con un numero')
            return
        }
        setError(null)
    },[search])

    return { search, setSearch, error }
}

export function Header(){
    const { getProductByName } = useApi()
    const { search, setSearch, error } = useSearch()
    const { token } = useAuth()
    
    const debouncedProductSearch = useCallback(
        debounce(search => {
            getProductByName(search)
        }, 400)
        ,[]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        getProductByName(search)
    }

    const handleChange = (event) => {
        const newSearch = event.target.value
        setSearch(newSearch)
        debouncedProductSearch(newSearch)
    }

    return (
        <header className="header">
            <nav>
                <Link to='/' className="header-title" >
                    <h1>Shopping Cart</h1>
                </Link>
                <form className="header-search" onSubmit={handleSubmit}>
                    <input placeholder="Buscar producto..." value={search} onChange={handleChange} />
                    <FaSearch />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
                <section className="header-panel-section">
                    <Cart />
                    {
                        token ? <UserButton />
                        :   <Link to='/login'>
                                <button className="header-login-button">
                                    Iniciar sesión
                                </button>
                            </Link>
                    }
                </section>
            </nav>
        </header>
    )
}
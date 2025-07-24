import { createContext, useContext, useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilters";
import { errorNotify } from "../hooks/useNotify";

export const ApiContext = createContext();

export function ApiProvider({ children }){

    const [products, setProducts] = useState([])
    const { filterProducts } = useFilters()
    const filteredProducts = filterProducts(products)
    const API_URL = "https://api.escuelajs.co/api/v1"

    const fetchProductos = async () => {
        try{
            const res = await fetch(`${API_URL}/products`)
            if(!res.ok){
                throw new Error('Error al obtener los productos')
            }
            const json = await res.json()
            setProducts(json)
        } catch (error){
            console.error(error.message)
            errorNotify('Error al obtener los productos')
        }
    }
    useEffect(() => {        
        fetchProductos()
    }, [])

    const getCategories = async () => {
        try{
            const res = await fetch(`${API_URL}/categories`)
            if(!res.ok){
                throw new Error('Error al obtener las categorias')
            }
            const json = await res.json()
            return json
        } catch (error){
            console.log(error.message)
            errorNotify('Error al obtener las categorias')
        }
    }

    const addProduct = async (product) => {
        try {
            const res = await fetch(`${API_URL}/products/`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json"},
                    body: JSON.stringify(product)
                })
            if(!res.ok) throw new Error('Eror al añadir producto')
            fetchProductos()
        } catch (error) {
            errorNotify('Error al añadir producto')
            console.log(error)
        }
    }

    const editProduct = async (product) => {
        try {
            const res = await fetch(`${API_URL}/products/${product.id}`,
                {
                    method: "PUT",
                    headers: { "Content-type": "application/json"},
                    body: JSON.stringify(product)
                })
            if(!res.ok) throw new Error('Eror al editar producto')
            fetchProductos()
        } catch (error) {
            errorNotify('Error al editar producto')
            console.log(error)
        }
    }
    
    const deleteProduct = async (productId) => {
        if(window.confirm('¿Seguro que quieres eliminar este producto?')){
            try {
                const res = await fetch(`${API_URL}/products/${productId}`,
                    {
                        method: "DELETE",
                    })
                if(!res.ok) throw new Error('Eror al eliminar producto')
                fetchProductos()
            } catch (error) {
                errorNotify('Error eliminando producto o el producto quizá ya haya sido eliminado')
                console.log(error)
            }
        }
    }

    const getProduct = async (productId) => {
        try {
            const res = await fetch(`${API_URL}/products/${productId}`)
            if(!res.ok) {
                throw new Error('Eror al editar producto')
            }
            const json = await res.json()
            return json
        } catch (error) {
            alert('Error editando producto')
            console.log(error)
        }
    }

    const getProductByName = async (productTitle) => {
        try{
            if(productTitle){
                const res = await fetch(`${API_URL}/products/?title=${productTitle}`)
                if(!res.ok){
                    throw new Error('Error al buscar producto')
                }
                const json = await res.json()
                setProducts(json)
            } else {
                fetchProductos()
            }
        } catch (error) {
                errorNotify('Error buscando producto')
                console.log(error)
            }
    }

    return(
        <ApiContext.Provider value={{ filteredProducts, getCategories, addProduct, editProduct, deleteProduct, getProduct, getProductByName }} >
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => useContext(ApiContext)
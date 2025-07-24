import './Dashboard.css'
import { useEffect, useState } from 'react';
import { useApi } from '../../context/api'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { successNotify } from '../../hooks/useNotify';
import { Helmet } from 'react-helmet';

function useProductForm(){
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        categoryId: '',
        category: {name: ''},
        images: [''],
        description: ''
    });
    const [editedProduct, setEditedProduct] = useState({
        title: '',
        price: '',
        category: { name: '' },
        images: [''],
        description: ''
    });
    const [isEditing, setIsEditing] = useState(false)
    const [categories, setCategories] = useState([])
    const { addProduct, getCategories, editProduct } = useApi()

    useEffect(() => {
        getCategories().then(res => setCategories(res))
    },[])

    const matchCategory = (value) => {
        const newCategory = categories.filter((category) => category.name === value)
        return newCategory[0]
    }

    const handleAddChange = (event, key, key2) => {
        const newState = structuredClone(newProduct)
        if(key === 'categoryId'){
            newState[key] = matchCategory(event.target.value)?.id
            newState['category']['name'] = matchCategory(event.target.value).name
        } else if(key2 !== undefined){
            newState[key][key2] = event.target.value
        } else{
            newState[key] = event.target.value
        }
        setNewProduct(newState)
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()
        addProduct(newProduct)
        setNewProduct({
            title: '',
            price: '',
            categoryId: '',
            category: {name: ''},
            images: [''],
            description: ''
        })
        successNotify('El producto ha sido añadido')
    }

    const handleEditChange = (event, key, key2) => {
        const newState = structuredClone(editedProduct)
        if(key === 'category'){
            newState[key] = matchCategory(event.target.value)
        } else if(key2 !== undefined){
            newState[key][key2] = event.target.value
        } else{
            newState[key] = event.target.value
        }
        setEditedProduct(newState)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        editProduct(editedProduct)
        setEditedProduct({
            title: '',
            price: '',
            category: { name: '' },
            images: [''],
            description: ''
        })
        setIsEditing(false)
        successNotify('El producto ha sido editado')
    }

    return { newProduct, handleAddChange, handleAddSubmit ,editedProduct, setEditedProduct, isEditing, setIsEditing, categories, handleEditChange, handleEditSubmit }
}

export const Dashboard = () => {
    const { newProduct, handleAddChange, handleAddSubmit ,editedProduct, setEditedProduct, isEditing, setIsEditing, categories, handleEditChange, handleEditSubmit } = useProductForm()
    const { filteredProducts, deleteProduct } = useApi()

    return(
        <div className='dashboard-container'>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <form className='dashboard-add-formulario' onSubmit={handleAddSubmit}>
                <div className='input-label-div'>
                    <label htmlFor="product-name">Nombre</label>
                    <input type="text" id="product-name" value={newProduct.title} onChange={(e) => handleAddChange(e,'title')} />
                </div>

                <div className='input-label-div'>
                    <label htmlFor="price">Precio</label>
                    <input type="text" id="price" value={newProduct.price} onChange={(e) => handleAddChange(e, 'price')} />
                </div>

                <div className='input-label-div'>
                    <label htmlFor="category">Categoría</label>
                    <select id="category" value={newProduct.category.name} onChange={(e) => handleAddChange(e, 'categoryId')} >
                        <option value="" label='Selecciona'></option>
                        {
                            categories.map((category) => {
                            return (<option key={category.id} >{category.name}</option>)
                        })}
                    </select>
                </div>

                <div className='input-label-div'>
                    <label htmlFor="img">Imagen</label>
                    <input type="text" id='img' value={newProduct.images?.[0]} onChange={(e) => handleAddChange(e, 'images', 0)} />
                </div>

                <div className='input-label-div'>
                <label htmlFor="description">Description</label>
                <textarea id="description" value={newProduct.description} onChange={(e) => handleAddChange(e, 'description')} ></textarea>
                </div>
                <button type='submit'>Añadir Producto</button>
            </form>
            <section className={isEditing ? 'modal--active' : 'modal' }>
                <form className='dashboard-edit-formulario' onSubmit={handleEditSubmit} id='editForm' >
                    <h2>Edición</h2>
                    <div className="input-label-div">
                        <label htmlFor="signup-product-name">Nombre</label>
                        <input type="text" id="signup-product-name" value={editedProduct.title} onChange={(e) => handleEditChange(e,'title')}/>
                    </div>
                    <div className="input-label-div">
                        <label htmlFor="signup-price">Precio</label>
                        <input type="text" id="signup-price" value={editedProduct.price} onChange={(e) => handleEditChange(e, 'price')} />
                    </div>
                    <div className="input-label-div">
                        <label htmlFor="signup-category">Categoría</label>
                        <select id="signup-category" value={editedProduct.category.name} onChange={(e) => handleEditChange(e, 'category', 'name')} >
                            <option value="" label='Selecciona'></option>
                            {
                                categories.map((category) => {
                                return (<option key={category.id} >{category.name}</option>)
                            })}
                        </select>
                    </div>
                    <div className="input-label-div">
                        <label htmlFor="signup-img">Imagen</label>
                        <input type="text" id='signup-img' value={editedProduct.images?.[0]} onChange={(e) => handleEditChange(e, 'images', 0)} />
                    </div>
                    <div className="input-label-div">
                        <label htmlFor="signup-description">Description</label>
                        <textarea id="signup-description" value={editedProduct.description} onChange={(e) => handleEditChange(e, 'description')} ></textarea>
                    </div>
                    <button type='submit'>Editar Producto</button>
                    <IoMdCloseCircleOutline className='close-button' onClick={() => setIsEditing(false)} />
                </form>
            </section>
            <div>
                <table className='tabla-productos'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                       </tr>
                    </thead>
                    <tbody>
                        {
                            filteredProducts.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <td className='img-tabla'><img src={product.images[0]} alt="Producto 1"/></td>
                                        <td className='title-tabla'>{product.title}</td>
                                        <td className='price-tabla'>{product.price}</td>
                                        <td className='actions-tabla'>
                                            <CiEdit className='edit-button' onClick={() => {
                                                setIsEditing(true)
                                                setEditedProduct(product)
                                            }} />
                                            <MdDeleteForever className='delete-button' onClick={() => {
                                                    deleteProduct(product.id)
                                                    successNotify('Se ha eliminado el producto')
                                                }}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
import './Filters.css'
import { useEffect, useId, useState } from 'react'
import { useFilters } from '../hooks/useFilters'
import { useApi } from '../context/api'

export function Filters(){
    const [categories, setCategories] = useState([])
    const { filters, setFilters } = useFilters()
    const { getCategories } = useApi()

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    useEffect(() => {
        getCategories().then(res => setCategories(res))
    },[])

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ... prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ... prevState,
            category: event.target.value
        }))
    }

    return(
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
                <input 
                    type="range"
                    id="price"
                    min='0'
                    max='1000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Category</label>
                <select id="category" onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    {
                        categories.map((category) => {
                            return (<option key={category.id} >{category.name}</option>)
                        })
                    }
                </select>
            </div>
        </section>
    )
}
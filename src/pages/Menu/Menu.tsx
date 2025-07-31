import { useEffect, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import ProductCard from '../../components/ProductCard/ProductCard'
import Search from '../../components/Search/Search'
import { PREFIX } from '../../helpers/API'
import type { Product } from '../../interfaces/product.interface'
import styles from './Menu.module.css'

export function Menu() {
	const [products, setProducts] = useState<Product[]>([])

	const getMenu = async () => {
		try {
			const res = await fetch(`${PREFIX}/products`)
			if (!res.ok) return
			const data = (await res.json()) as Product[]
			setProducts(data)
		} catch (e) {
			console.error(e)
			return
		}
	}

	useEffect(() => {
		getMenu()
	}, [])

	return (
		<>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div className={styles['product-list']}>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.ingredients.join(' ,')}
						rating={product.rating}
						price={product.price}
						image={product.image}
					/>
				))}
			</div>
		</>
	)
}

import { Suspense } from 'react'
import Heading from '../../components/Heading/Heading'
import Search from '../../components/Search/Search'
import type { Product } from '../../interfaces/product.interface'
import styles from './Menu.module.css'
import { MenuList } from './MenuList/MenuList'
import { useLoaderData } from 'react-router-dom'

export default function Menu() {
	const products = useLoaderData() as Product[]

	return (
		<Suspense fallback={<>Загружаем продукты...</>}>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div className={styles['product-list']}>
				<MenuList products={products} />
			</div>
		</Suspense>
	)
}

import { useEffect, useState, type ChangeEvent } from 'react'
import Heading from '../../components/Heading/Heading'
import Search from '../../components/Search/Search'
import type { Product } from '../../interfaces/product.interface'
import styles from './Menu.module.css'
import { MenuList } from './MenuList/MenuList'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { PREFIX } from '../../helpers/API'

export default function Menu() {
	const initialProducts = useLoaderData() as Product[]
	const [filteredProducts, setFilteredProducts] =
		useState<Product[]>(initialProducts) // Состояние для отфильтрованных
	const [filter, setFilter] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false) // Для индикации загрузки
	const [error, setError] = useState<string | null>(null) // Для ошибок

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value)
	}

	const getFilteredMenu = async (name: string) => {
		try {
			setIsLoading(true)
			setError(null)
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name: name || undefined,
				},
			})
			setFilteredProducts(data)
		} catch (err) {
			setError('Ошибка загрузки меню')
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (filter !== undefined) {
			getFilteredMenu(filter)
		}
	}, [filter])

	return (
		<>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search
					placeholder='Введите блюдо или состав'
					onChange={updateFilter}
				/>
			</div>
			<div className={styles['product-list']}>
				{isLoading ? (
					<p>Загрузка...</p>
				) : error ? (
					<p>{error}</p>
				) : (
					<MenuList products={filteredProducts} />
				)}
			</div>
		</>
	)
}

import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import Heading from '../../components/Heading/Heading'
import { useEffect, useState } from 'react'
import type { Product } from '../../interfaces/product.interface'
import axios from 'axios'
import { PREFIX } from '../../helpers/API'
import CartItem from '../../components/CartItem/CartItem'

export function Cart() {
	const [cardProducts, setCardProducts] = useState<Product[]>()
	const items = useSelector((s: RootState) => s.cart.items)

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`)
		return data
	}

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)))
		setCardProducts(res)
	}

	useEffect(() => {
		loadAllItems()
	}, [items])

	return (
		<>
			<Heading>Корзина {items.length}</Heading>
			{items.map((i) => {
				const product = cardProducts?.find((p) => p.id === i.id)
				if (!product) {
					return
				}
				return <CartItem count={i.count} {...product} />
			})}
		</>
	)
}

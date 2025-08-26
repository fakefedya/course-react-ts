import styles from './Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import Heading from '../../components/Heading/Heading'
import { useEffect, useState } from 'react'
import type { Product } from '../../interfaces/product.interface'
import axios from 'axios'
import { PREFIX } from '../../helpers/API'
import CartItem from '../../components/CartItem/CartItem'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { cartActions } from '../../store/cart.slice'

const DELIVERY_FEE = 169

export function Cart() {
	const [cardProducts, setCardProducts] = useState<Product[]>()
	const items = useSelector((s: RootState) => s.cart.items)
	const jwt = useSelector((s: RootState) => s.user.jwt)
	const dispatch = useDispatch<AppDispatch>()

	const navigate = useNavigate()
	const total = items
		.map((i) => {
			const product = cardProducts?.find((p) => p.id === i.id)
			if (!product) {
				return 0
			}
			return i.count * product.price
		})
		.reduce((acc, i) => (acc += i), 0)

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`)
		return data
	}

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)))
		setCardProducts(res)
	}

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		)
		dispatch(cartActions.clean())
		navigate('/success')
	}

	useEffect(() => {
		loadAllItems()
	}, [items])

	return (
		<>
			<Heading>Корзина</Heading>
			<div className={styles['cart-items-list']}>
				{items.map((i) => {
					const product = cardProducts?.find((p) => p.id === i.id)
					if (!product) {
						return
					}
					return <CartItem key={product.id} count={i.count} {...product} />
				})}
			</div>
			<div className={styles['cart-summary']}>
				<div className={styles['line']}>
					<div className={styles['text']}>Итог</div>
					<div className={styles['price']}>
						{total}&nbsp;<span>₽</span>
					</div>
				</div>
				<hr className={styles['hr']} />
				<div className={styles['line']}>
					<div className={styles['text']}>Доставка</div>
					<div className={styles['price']}>
						{DELIVERY_FEE}&nbsp;<span>₽</span>
					</div>
				</div>
				<hr className={styles['hr']} />
				<div className={styles['line']}>
					<div className={styles['text']}>
						Итог <span>({items.length})</span>
					</div>
					<div className={styles['price']}>
						{total + DELIVERY_FEE}&nbsp;<span>₽</span>
					</div>
				</div>
			</div>
			<div className={styles['checkout']}>
				<Button appearance='big' onClick={checkout}>
					Оформить
				</Button>
			</div>
		</>
	)
}

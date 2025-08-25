import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import Heading from '../../components/Heading/Heading'

export function Cart() {
	const items = useSelector((s: RootState) => s.cart.items)
	return (
		<>
			<Heading>Корзина</Heading>
		</>
	)
}

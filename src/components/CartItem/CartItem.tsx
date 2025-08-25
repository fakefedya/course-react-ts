import styles from './CartItem.module.css'
import { CartItemProps } from './CartItem.props'

function CartItem() {
	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{
					backgroundImage: `url('')`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			></div>
		</div>
	)
}
export default CartItem

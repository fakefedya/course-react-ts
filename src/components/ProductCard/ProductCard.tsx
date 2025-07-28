import styles from './ProductCard.module.css'
import type { ProductCardProps } from './ProductCard.props'

function ProductCard({
	id,
	title,
	description,
	image,
	price,
	rating,
}: ProductCardProps) {}

export default ProductCard

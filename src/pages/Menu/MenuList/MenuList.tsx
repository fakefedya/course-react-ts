import ProductCard from '../../../components/ProductCard/ProductCard'
import type { MenuListProps } from './MenuList.props'

export function MenuList({ products }: MenuListProps) {
	console.log(products)
	return products.map((product) => (
		<ProductCard
			key={product.id}
			id={product.id}
			name={product.name}
			description={product.ingredients.join(' ,')}
			rating={product.rating}
			price={product.price}
			image={product.image}
		/>
	))
}

import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Cart } from './pages/Cart/Cart.tsx'
import { Error } from './pages/Error/Error.tsx'
import { Layout } from './layout/Layout/Layout.tsx'
import { Product } from './pages/Product/Product.tsx'
import axios from 'axios'
import { PREFIX } from './helpers/API.ts'

const Menu = lazy(() => import('./pages/Menu/Menu')) // Добавили LAZY свойство для компонента Menu. Для больших компонент и тяжеловесных и верхне уровневых

// Как правило, роутер объявляется в main.tsx
const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				),
				loader: async () => {
					try {
						const { data } = await axios.get(`${PREFIX}/products`)
						return data
					} catch (e) {
						console.error(e)
					}
				},
				errorElement: <>Ошибка загрузки меню</>,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/product/:id',
				element: <Product />,
				loader: async ({ params }) => {
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`)
					return data
				},
				errorElement: <>Ошибка загрузки продукта</>,
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)

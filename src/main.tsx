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
import { AuthLayout } from './layout/Auth/AuthLayout.tsx'
import { Login } from './pages/Login/Login.tsx'
import { Register } from './pages/Register/Register.tsx'
import { RequireAuth } from './helpers/RequireAuth.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Success } from './pages/Success/Success.tsx'

const Menu = lazy(() => import('./pages/Menu/Menu')) // Добавили LAZY свойство для компонента Menu. Для больших компонент и тяжеловесных и верхне уровневых

// Как правило, роутер объявляется в main.tsx
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				),
				loader: async ({ request }) => {
					try {
						const url = new URL(request.url) // Получаем URL с search params
						const name = url.searchParams.get('name') || '' // Параметр name, если есть
						const { data } = await axios.get(
							`${PREFIX}/products${
								name ? `?name=${encodeURIComponent(name)}` : ''
							}`
						)
						return data
					} catch (error: unknown) {
						if (axios.isAxiosError(error)) {
							throw new Response(
								error.response?.data?.message ?? error.message,
								{
									status: error.response?.status || 500,
								}
							)
						}
						throw new Response('Неизвестная ошибка', { status: 500 })
					}
				},
				errorElement: <>Ошибка загрузки меню</>,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/success',
				element: <Success />,
			},
			{
				path: '/product/:id',
				element: <Product />,
				loader: async ({ params }) => {
					try {
						const { data } = await axios.get(`${PREFIX}/products/${params.id}`)
						return data
					} catch (error: unknown) {
						if (axios.isAxiosError(error)) {
							throw new Response(
								error.response?.data?.message ?? error.message,
								{
									status: error.response?.status || 500,
								}
							)
						}
						throw new Response('Неизвестная ошибка', { status: 500 })
					}
				},
				errorElement: <>Ошибка загрузки продукта</>,
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)

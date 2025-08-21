import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Heading from '../../components/Heading/Heading'
import Input from '../../components/Input/Input'
import styles from './Login.module.css'
import { useEffect, useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { login } from '../../store/user.slice'

export type LoginForm = {
	email: {
		value: string
	}
	password: {
		value: string
	}
}

export function Login() {
	const [error, setError] = useState<string | null>()
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const jwt = useSelector((s: RootState) => s.user.jwt)

	useEffect(() => {
		if (jwt) {
			navigate('/')
		}
	}, [jwt, navigate])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		const target = e.target as typeof e.target & LoginForm
		const { email, password } = target
		await sendLogin(email.value, password.value)
		navigate('/') // Для навигации (перенаправления) после успешной авторизации
	}

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }))
	}

	return (
		<div className={styles['login']}>
			<Heading>Вход</Heading>
			{error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input id='email' placeholder='Email' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input id='password' type='password' placeholder='Пароль' />
				</div>
				<Button appearance='big'>Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<Link to={'/auth/register'}>Зарегистрироваться</Link>
			</div>
		</div>
	)
}

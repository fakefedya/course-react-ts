import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Heading from '../../components/Heading/Heading'
import Input from '../../components/Input/Input'
import styles from './Login.module.css'
import type { FormEvent } from 'react'
import axios from 'axios'
import { PREFIX } from '../../helpers/API'

export type LoginForm = {
	email: {
		value: string
	}
	password: {
		value: string
	}
}

export function Login() {
	const submit = async (e: FormEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & LoginForm
		const { email, password } = target
		await sendLogin(email.value, password.value)
	}

	const sendLogin = async (email: string, password: string) => {
		const { data } = await axios.post(`${PREFIX}/auth/login`, {
			email,
			password,
		})
		console.log(data)
	}

	return (
		<div className={styles['login']}>
			<Heading>Вход</Heading>
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

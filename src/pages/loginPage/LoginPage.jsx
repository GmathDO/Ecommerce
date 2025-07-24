import './LogInPage.css'
import { useState } from 'react'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router'
import { errorNotify } from '../../hooks/useNotify'
import { Helmet } from 'react-helmet'

export function LoginPage(){
    const { login } = useAuth()
    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [toggle, setToggle] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(login(user, password)){
            navigate('/')
        } else{
            setError('Usuario o contraseña incorrecta')
            errorNotify(error)
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault()
    }

    const isToggle = (index) => {
        return toggle === index
    }

    return(
        <div className='login-formulario-container'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="log-selector">
                <button type='button' className={isToggle(1) ? 'tab active-tab' : 'tab'} onClick={() => setToggle(1)} >Iniciar Sesion</button>
                <button type='button' className={isToggle(2) ? 'tab active-tab' : 'tab'} onClick={() => setToggle(2)} >Registrarse</button>
            </div>
            <strong>{isToggle(1) ? 'Log In' : 'Sing Up' }</strong>
            <form className={isToggle(1) ? 'login-formulario active-content' : 'login-formulario'} onSubmit={handleSubmit}>
                <section className='login-formulario-section'>
                    <label htmlFor='username' className='login-label'>Usuario</label>
                    <input type='text' className='login-input' id='username' placeholder='usuario123@hotmail.com' value={user} onChange={(e) => setUser(e.target.value)}/>
                </section>
                <section className='login-formulario-section'>
                    <label htmlFor='password' className='login-label'>Contraseña</label>
                    <input type='password' className='login-input' id='password' placeholder='contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                </section>
                <button type='submit'>Iniciar Sesión</button>
            </form>
            <form className={isToggle(2) ? 'signup-formulario active-content' : 'signup-formulario'} onSubmit={handleSignUp}>
                <section className='signup-formulario-section'>
                    <label htmlFor='usernameSignup' className='signup-label'>Usuario</label>
                    <input type='text' className='signup-input' id='usernameSingup' placeholder='usuario123@hotmail.com' />
                </section>
                <section className='signup-formulario-section'>
                    <label htmlFor='passwordSingUp' className='signup-label'>Contraseña</label>
                    <input type='password' className='signup-input' id='passwordSingup' placeholder='contraseña' />
                </section>
                <button type='submit'>Crear Cuenta</button>
            </form>
        </div>
    )
}
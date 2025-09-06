import { useState } from "react"
import useAuth from "../hooks/useAuth"
import type { General } from "../types/types"

export default function Auth() {
    const auth = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState<General['error']>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault
        setError(null)
        const { error } = await auth.login({email: formData.email, password: formData.password})
        if (error) {
            setError(error.message)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault
        setError(null)
        const { error } = await auth.signUp({email: formData.email, password: formData.password})
        if (error) {
            setError(error.message)
        } else {
            alert('認証メールを送信しました。メールを確認してください。')
        }
    }
    
    return (
        <form>
            <div>
                <label htmlFor="email">email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                {error ?
                <p>処理中にエラーが発生しました。</p> :
                null
                }
            </div>
            <div>
                <button type="button" onClick={handleLogin} disabled={auth.loading}>{auth.loading ? 'loading...' : 'login'}</button>
                <button type="button" onClick={handleSignUp} disabled={auth.loading}>{auth.loading ? 'loading...' : 'sign up'}</button>
            </div>
        </form>
    )
}
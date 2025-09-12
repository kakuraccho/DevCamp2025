import { useState } from "react"
import useAuth from "../hooks/useAuth"
import type { General } from "../types/types"
import { Button, TextField, Typography, Stack } from "@mui/material"

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
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={2}
                    sx={{
                        p: 2,
                        height: '100vh'
                    }}
                >
                    <div>
                        <TextField
                            label="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{
                                width: '30vw'
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {error ?
                        <Typography variant="inherit">処理中にエラーが発生しました。</Typography> :
                        null
                        }
                    </div>
                    <Stack
                        spacing={1}
                        direction={"row"}
                    >
                        <Button variant="outlined" type="button" onClick={handleLogin} disabled={auth.loading}>
                            {auth.loading ? 'loading...' : 'login'}
                        </Button>
                        <Button variant="outlined" type="button" onClick={handleSignUp} disabled={auth.loading}>
                            {auth.loading ? 'loading...' : 'sign up'}
                        </Button>
                    </Stack>
                </Stack>
            </form>
    )
}
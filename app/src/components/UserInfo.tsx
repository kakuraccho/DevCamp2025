import useFetchDB from "../hooks/useFetchDB"
import useAuth from "../hooks/useAuth"
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function UserInfo() {
    const [formData, setFormData] = useState({
        username: '',
        roomid: '',
        floor: ''
    })

    const { session, loading: authLoading } = useAuth()
    const userId = session?.user.id

    const { data, loading: dataLoading } = useFetchDB(
        'users',
        'user_id',
        userId || ''
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (data && data.length > 0) {
            const userData = data[0]
            
            setFormData({
                username: userData.name || '',
                roomid: userData.roomid?.toString() || '',
                floor: userData.floor?.toString() || ''
            })
        }
    }, [data])

    if (authLoading || dataLoading) return <p>loading...</p>

    if (!userId) {
        console.error('useridが見つかりませんでした')
        alert('エラーが発生しました')
        return <p>エラーが発生しました</p>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { data, error } = await supabase
        .from('users')
        .update({
            name: formData.username,
            roomid: parseInt(formData.roomid),
            floor: parseInt(formData.floor)
        })
        .eq('user_id', userId)
        .select()
        if (error) {
            console.error(error)
            alert(`送信中にエラーが発生しました: ${error.message}`)
        } else {
            const alertMessage = `
            以下の内容で送信しました。
            name: ${data[0].name}
            roomid: ${data[0].roomid}
            floor: ${data[0].floor}
            `

            alert(alertMessage)

            navigate('/')
        }
    }

        return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="roomid">room id</label>
                    <input type="text" name="roomid" value={formData.roomid} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="floor">floor</label>
                    <input type="text" name="floor" value={formData.floor} onChange={handleChange} />
                </div>
                <div>
                    <button>submit</button>
                </div>
            </form>
        </div>
    )
}
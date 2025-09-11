import useFetchDB from "../hooks/useFetchDB"
import useAuth from "../hooks/useAuth"
import Avatar from './Avatar';
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"
import type { User } from "@supabase/supabase-js"
import useUploadStorage from "../hooks/useUploadStorage"

export default function UserInfo() {
    const [formData, setFormData] = useState({
        username: '',
        roomid: '',
        floor: ''
    })

    const { session, loading: authLoading } = useAuth()
    const userId = session?.user.id
    const user = session?.user

    const { data, loading: dataLoading } = useFetchDB(
        'users',
        'user_id',
        userId || ''
    )

    const navigate = useNavigate()

    const { uploading, uploadAvatar } = useUploadStorage(user as User)

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

    if (authLoading || dataLoading) {
        return <p>loading...</p>
    }

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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const result = await uploadAvatar(file);
            if (result.success) {
                alert('アバターが正常にアップロードされました！');
                // データを再取得するか、直接更新
                window.location.reload(); // 簡単な方法（より良い方法は後述）
            }
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const { data: updateData, error } = await supabase
                .from('users')
                .update({
                    name: formData.username,
                    roomid: parseInt(formData.roomid) || null,
                    floor: parseInt(formData.floor) || null
                })
                .eq('user_id', userId)
                .select()
                
            if (error) {
                throw error
            }
            
            const alertMessage = `
            以下の内容で送信しました。
            name: ${updateData[0].name}
            roomid: ${updateData[0].roomid}
            floor: ${updateData[0].floor}
            `
            alert(alertMessage)
            navigate('/')
            
        } catch (error: any) {
            console.error('更新エラー:', error)
            alert(`送信中にエラーが発生しました: ${error.message}`)
        }
    }

    return (
        <div>
            <h2>プロフィール情報</h2>
            <div>
                {/* ★ Avatarコンポーネントにpropsとしてデータを渡す */}
                <Avatar 
                    userId={userId} 
                    avatarUrl={data?.[0]?.avatar_url}
                    size={120}
                    fallbackText={formData.username || ''}
                    alt="ユーザーアバター"
                />
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {uploading && <p>アップロード中...</p>}
                {/* Avatarコンポーネント内でエラーを処理するので、UserInfoでは不要 */}
                {/* {error && <p style={{ color: 'red' }}>エラー: {error}</p>} */}
            </div>

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
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    )
}
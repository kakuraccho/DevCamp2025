import useFetchDB from "../hooks/useFetchDB"
import useAuth from "../hooks/useAuth"
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
    const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null)

    const { session, loading: authLoading } = useAuth()
    const userId = session?.user.id
    const user = session?.user

    const { data, loading: dataLoading } = useFetchDB(
        'users',
        'user_id',
        userId || ''
    )

    const navigate = useNavigate()

    // avatarUrlの読み取りを停止し、警告を解決
    const { uploading, error, uploadAvatar } = useUploadStorage(user as User)

    // デバッグ用の関数を修正
    const debugAvatarSystem = async () => {
        if (!userId) return
        
        console.log('=== アバターシステム デバッグ ===')
        
        // 1. 現在のユーザーデータ
        console.log('ユーザーID:', userId)
        console.log('DB取得データ:', data)
        
        // 2. 想定されるファイルパス
        const expectedPath = `${userId}/avatar.jpg` // 例
        console.log('想定ファイルパス:', expectedPath)
        
        // 3. ユーザーフォルダのファイル一覧
        try {
            const { data: files, error } = await supabase.storage
                .from('avatars')
                .list(userId)
            
            console.log('ユーザーフォルダ内ファイル:', files)
            if (error) console.error('ファイル一覧取得エラー:', error)
        } catch (error) {
            console.error('フォルダアクセスエラー:', error)
        }
        
        // 4. バケット設定確認（修正版）
        try {
            const { data: buckets, error } = await supabase.storage.listBuckets()
            const avatarBucket = buckets?.find(bucket => bucket.id === 'avatars')
            console.log('アバターバケット情報:', avatarBucket)
            if (error) console.error('バケット一覧取得エラー:', error)
        } catch (error) {
            console.error('バケット情報取得エラー:', error)
        }
        
        // 5. 現在のアバターURL確認
        if (data && data.length > 0 && data[0].avatar_url) {
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(data[0].avatar_url)
            
            console.log('現在のアバター公開URL:', urlData.publicUrl)
            
            // URLにアクセスできるかテスト
            try {
                const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
                console.log('アバターURL応答ステータス:', response.status)
            } catch (error) {
                console.error('アバターURL接続エラー:', error)
            }
        }
    }

    useEffect(() => {
        if (data && data.length > 0) {
            const userData = data[0]
            
            setFormData({
                username: userData.name || '',
                roomid: userData.roomid?.toString() || '',
                floor: userData.floor?.toString() || ''
            })

            // アバター表示の修正
            if (userData.avatar_url) {
                console.log('DBから取得したavatar_url:', userData.avatar_url)
                
                // ファイルパスから公開URLを生成
                const { data: urlData } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(userData.avatar_url)
                
                console.log('生成された公開URL:', urlData.publicUrl)
                setUserAvatarUrl(urlData.publicUrl)
            } else {
                console.log('avatar_urlが設定されていません')
                setUserAvatarUrl(null)
            }
        }
    }, [data])

    // デバッグ実行
    useEffect(() => {
        if (userId && data) {
            debugAvatarSystem()
        }
    }, [userId, data])

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
                // ★ アップロード成功後、アバターURLを即座に更新する
                setUserAvatarUrl(result.url || null);
                alert('アバターが正常にアップロードされました！');
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
                {/* ★ アバター表示ロジック */}
                {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt="アバター" style={{ width: '100px', height: '100px' }} />
                ) : (
                    <img src="https://placehold.co/100x100?text=No+Avatar" alt="デフォルトアバター" style={{ width: '100px', height: '100px' }} />
                )}
                {/* ★ ファイル選択フォーム */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {uploading && <p>アップロード中...</p>}
                {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
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
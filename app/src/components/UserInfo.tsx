import useFetchDB from "../hooks/useFetchDB"
import useAuth from "../hooks/useAuth"
import Avatar from './Avatar';
import { useState, useEffect, useRef } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"
import type { User } from "@supabase/supabase-js"
import useUploadStorage from "../hooks/useUploadStorage"
import { Box, Typography, TextField, Button, CircularProgress, Alert, Stack } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function UserInfo() {
    const [formData, setFormData] = useState({
        username: '',
        roomid: '',
        floor: ''
    })

    const { session, loading: authLoading } = useAuth()
    const userId = session?.user.id
    const user = session?.user
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!userId) {
        console.error('useridが見つかりませんでした')
        return <Alert severity="error">エラーが発生しました: ユーザーIDが見つかりません</Alert>
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
                window.location.reload();
            } else {
                alert('アバターのアップロードに失敗しました。');
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 4 }}>
            <Box sx={{ maxWidth: 400, width: '100%', textAlign: 'center', p: 4, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    プロフィール情報
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stack spacing={2} alignItems="center">
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
                            ref={fileInputRef}
                            hidden
                        />
                        <Button
                            variant="outlined"
                            component="span"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            startIcon={<PhotoCameraIcon />}
                        >
                            {uploading ? <CircularProgress size={24} /> : 'ファイルを選択'}
                        </Button>
                    </Stack>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="room id"
                            type="text"
                            name="roomid"
                            value={formData.roomid}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="floor"
                            type="text"
                            name="floor"
                            value={formData.floor}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={uploading}
                            fullWidth
                        >
                            submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}
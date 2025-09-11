import { useState } from "react"
import { supabase } from "../supabaseClient"
import type { User } from "@supabase/supabase-js"

export default function useUploadStorage(user: User) {
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const uploadAvatar = async (file: File) => {
        try {
            setUploading(true)
            setError(null)

            if (!user) {
                throw new Error('セッションがありません')
            }

            const fileExt = file.name.split('.').pop()
            // ★ 新しいポリシー構造に合わせて修正: userid/filename.ext
            const fileName = `${user.id}/avatar.${fileExt}`

            console.log('アップロード開始:', fileName)
            console.log('ユーザーID:', user.id)

            const { data, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: true
                })
            
            if (uploadError) {
                console.error('アップロードエラー:', uploadError)
                throw uploadError
            }

            console.log('アップロード成功:', data)

            // 公開URLを生成
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName)
            
            const publicUrl = urlData.publicUrl
            console.log('生成された公開URL:', publicUrl)

            // ★ データベースにはファイルパスを保存
            const { data: updateData, error: updateError } = await supabase
                .from('users')
                .update({ avatar_url: fileName })
                .eq('user_id', user.id)
                .select()
            
            if (updateError) {
                console.error('DB更新エラー:', updateError)
                throw updateError
            }

            console.log('DB更新成功:', updateData)

            setAvatarUrl(publicUrl)

            return { success: true, url: publicUrl }
        } catch (err) {
            const errorMessage = (err as Error).message;
            console.error('useUploadStorage エラー:', errorMessage)
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setUploading(false);
        }
    }

    return { uploading, avatarUrl, error, uploadAvatar }
}
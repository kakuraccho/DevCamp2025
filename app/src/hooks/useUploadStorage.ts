import { useState } from "react"
import { supabase } from "../supabaseClient"
import type { User } from "@supabase/supabase-js"

export default function useUploadStorage( user: User ) {
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
            const fileName = `${user.id}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: true
                })
            
            if (uploadError) {
                throw uploadError
            }

            const publicUrl = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName).data.publicUrl
            
            const { error: updateError } = await supabase
                .from('users')
                .update({ avatar_url: publicUrl })
                .eq('user_id', user.id)
            
            if (updateError) {
                throw updateError
            }

            setAvatarUrl(publicUrl)

            return { success: true, url: publicUrl }
        } catch (err) {
            const errorMessage = (err as Error).message;
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setUploading(false);
        }
    }

    return { uploading, avatarUrl, error, uploadAvatar }
}
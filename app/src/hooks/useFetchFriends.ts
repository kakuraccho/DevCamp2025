import type { Friend } from "../types/types"
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

export default function useFetchFriends() {
    const [data, setData] = useState<Friend[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFriendship = async () => {
            const { data, error } = await supabase
                .from('friends')
                .select('*')

            if (error) {
                setError(error.message)
            } else if (data) {
                const validFriends = data.filter(
                    (data): data is Friend => data.friend_id !== null
                )
                setData(validFriends)
            }
            setLoading(false)
        }
        fetchFriendship()
    },[])

    return { data, loading, error }
}
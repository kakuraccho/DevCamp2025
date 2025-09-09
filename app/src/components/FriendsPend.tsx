import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { supabase } from "../supabaseClient"
import type { PendingRequest } from "../types/types"

export default function FriendsPend() {

    const { session, loading: authLoading } = useAuth()
    const myUserId = session?.user.id

    const [requests, setRequests] = useState<PendingRequest[]>([])
    const [dataLoading, setDataLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!myUserId) {
            setDataLoading(false)
            return
        }

        const fetchPendingRequests = async () => {
            const { data, error: fetchError } = await supabase
                .from('friendships')
                .select(`
                    *,
                    requester:users!requester_id ( name, user_id )
                `)
                .eq('status', 'pending')
                .eq('receiver_id', myUserId)
            
            if (fetchError) {
                setError(fetchError.message)
            } else if (data) {
                setRequests(data)
            }
            setDataLoading(false)
        }
        fetchPendingRequests()
    },[myUserId])

    const handleAccept = async (requester_id: string) => {
        const { error } = await supabase.rpc('accept_friend_request', {
            p_requester_id: requester_id
        })
        if (error) {
            alert(`承認中にエラーが発生しました: ${error.message}`)
        } else {
            alert('承認が完了しました')
            setRequests(prev => prev.filter(
                req => req.requester_id !== requester_id
            ))
        }
    }

    if (authLoading || dataLoading) return <p>loading...</p>

    if (error) return <p>エラーが発生しました: {error}</p>

    if (requests.length === 0 ) return <p>承認待ちのフレンドはいません</p>

    return (
        <ul>
            {requests.map(item => {
                return (
                    <li key={item.requester_id}>
                        <p>{item.requester.name} さん</p>
                        <button type="button" onClick={() => handleAccept(item.requester_id)}>accept</button>
                    </li>
                )
            })}
        </ul>
    )
}
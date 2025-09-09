import useFetchDB from "../hooks/useFetchDB"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function FAMRegist({ id }: { id: string }) {

    const { data: facility, loading, error } = useFetchDB('fam_locations', 'id', id)
    const navigate = useNavigate()

    if (loading) return <p>loading...</p>

    if (error) {
        console.error(error)
        return <p>データの取得中にエラーが発生しました: {error}</p>
    }

    if (!facility || facility.length === 0) return <p>施設が見つかりません</p>

    const handleEnter = async () => {
        const { error } = await supabase.rpc('enter_location', { u_location_id: parseInt(id) })
        if (error) {
            return <p>{error.message}</p>
        } else {
            alert('入室処理が完了しました')
            navigate('/')
        }
    }

    return (
        <div>
            <p>{facility[0].name}に入室しますか？</p>
            <button onClick={handleEnter}>yes</button>
            <button onClick={() => navigate('/')}>no</button>
        </div>
    )
}
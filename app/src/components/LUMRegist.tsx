import { useState } from "react"
import useFetchDB from "../hooks/useFetchDB"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function LUMRegist({ id }: { id: string }) {

    const { data: tableData, error: tableError, loading } = useFetchDB('lum', 'id', id)
    const [time, setTime] = useState<number>(0)
    const navigate = useNavigate()

    if (tableError) {
        console.error(tableError)
        return <p>データの取得中にエラーが発生しました: {tableError.message}</p>
    }

    if (loading) {
        return <p>loading...</p>
    }

    if (!tableData || tableData.length === 0) {
        return <p>該当する洗濯機が見つかりません</p>
    }

    const machine = tableData[0]

    if (tableData[0].status !== 'free') {
        return <p>{machine.name}は使用中です</p>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueAsNumber = parseInt(e.target.value, 10)
        setTime(isNaN(valueAsNumber) ? 0 : valueAsNumber)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (time <= 0) {
            alert('利用時間を正しく入力してください')
            return
        }

        const { error } = await (supabase as any).rpc('start_laundry_session', {
            machine_id_to_start: id,
            duration_in_minutes: time
        })

        if (error) {
            console.error('利用登録中にエラーが発生しました: ', error)
            return <p>利用登録中にエラーが発生しました: {error.message}</p>
        } else {
            alert('利用登録が完了しました')
            navigate('/')
        }
    }

    return (
        <div>
            <h1>{tableData[0].name}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="time">time</label>
                    <input type="number" name="time" id="time" value={time} onChange={handleChange} />
                    <span>[min]</span>
                </div>
                <div>
                    <button>submit</button>
                </div>
            </form>
        </div>
    )
}
import useAuth from "../hooks/useAuth"
import useFetchDB from "../hooks/useFetchDB"

export default function LUMDashBoard() {

    const { session, loading: authLoading } = useAuth()
    const userId = session?.user.id

    const { data: LUMData, error, loading: dataLoading } = useFetchDB('lum', 'userid' , userId || '')

    if (authLoading || dataLoading) {
        return <p>loading...</p>
    }

    if (error) {
        console.error('データの取得中にエラーが発生しました: ', error)
        return <p>データの取得中にエラーが発生しました: {error.message}</p>
    }

    if (!LUMData || LUMData.length === 0) {
        return <p>あなたが利用中の洗濯機はありません。</p>
    }

    console.log(LUMData)

    return (
        <div>
            <ul>
                {LUMData.map(item => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.starttime}</p>
                        <p>{item.endtime}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
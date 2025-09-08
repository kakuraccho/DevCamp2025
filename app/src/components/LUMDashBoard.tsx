import { useLUMData } from "../contexts/LUMContext"
import useAuth from "../hooks/useAuth"
import LUMdbItem from "./LUMdbItem"

export default function LUMDashBoard() {

    const { session, loading: authLoading } = useAuth()
    const userId = session?.user.id

    const LUMData = useLUMData()
    const ownLUMData = LUMData?.filter(data => data.userid === userId)

    if (authLoading) {
        return <p>loading...</p>
    }


    if (!ownLUMData || ownLUMData.length === 0) {
        return <p>あなたが利用中の洗濯機はありません。</p>
    }

    return (
        <div>
            <ul>
                {ownLUMData.map(item => (
                    <li key={item.id}>
                        <LUMdbItem item={item} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
import useFetchDB from "../hooks/useFetchDB";
import Dryers from "./Dryers";
import Laundries from "./Laundries";

export default function LUMList({ floor }: { floor: number }) {
    const { data: LUMData, loading: LUMLoading, error } = useFetchDB(
        'lum',
        'floor',
        floor
    )

    const laundriesData = LUMData.filter(item => item['type'] === 'laundry')
    const dryersData =LUMData.filter(item => item['type'] === 'dryer')

    if (LUMLoading) {
        return <p>{floor}階の情報を読み込んでいます...</p>;
    }

    if (error) {
        console.error('データの読込中にエラーが発生しました: ', error);
        return <p>データの読込中にエラーが発生しました</p>;
    }

    if (!LUMData || LUMData.length === 0) { 
        return <p>{floor}階には利用可能な洗濯機がありません。</p>;
    }

    return (
        <div>
            <h1>{floor}階の状況</h1>
            <Laundries data={laundriesData} />
            <Dryers data={dryersData} />
        </div>
    );
}
import { useLUMData } from "../contexts/LUMContext";
import Dryers from "./Dryers";
import Laundries from "./Laundries";

export default function LUMList({ floor }: { floor: number }) {
    const LUMData = useLUMData()

    if (!LUMData || LUMData.length === 0) { 
        return <p>データの取得中にエラーが発生しました。</p>;
    }

    const myFloorLUMData = LUMData.filter(data => data.floor === floor)

    const laundriesData = myFloorLUMData.filter(item => item['type'] === 'laundry')
    const dryersData = myFloorLUMData.filter(item => item['type'] === 'dryer')

    return (
        <div>
            <h1>{floor}階の状況</h1>
            <Laundries data={laundriesData} />
            <Dryers data={dryersData} />
        </div>
    );
}
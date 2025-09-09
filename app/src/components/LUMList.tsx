import { useLUMData } from "../contexts/LUMContext";
import LUMDryers from "./LUMDryers";
import LUMLaundries from "./LUMLaundries";

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
            <LUMLaundries data={laundriesData} />
            <LUMDryers data={dryersData} />
        </div>
    );
}
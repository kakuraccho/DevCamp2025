import useRestTime from "../hooks/useRestTime";
import type { LUMItemProps } from "../types/types";

export default function LUMdbItem({ item }: { item: LUMItemProps }) {

    const restTime = useRestTime(item.endtime || '')

    return (
        <div>
            <p>{item.name}</p>
            <p>残り約 {restTime} 分</p>
        </div>
    )
}
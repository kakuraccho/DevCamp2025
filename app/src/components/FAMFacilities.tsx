import type { FAMFacilitiesProps } from "../types/types";

export default function FAMFacilities( { data, facilityInfo }: FAMFacilitiesProps) {

    return (
        <div>
            <h1>{facilityInfo.name}</h1>
            {data.length > 0 ? (
                <ul>
                    {data.map(item => (
                        <li key={item.friend_id}>
                            
                            {item.friend_name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>フレンドは誰も利用していません</p>
            )}
        </div>
    )
}
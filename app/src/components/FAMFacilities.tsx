import { useState } from "react";
import { supabase } from "../supabaseClient";
import type { FAMFacilitiesProps, FriendsView } from "../types/types";
import Avatar from "./Avatar";

export default function FAMFacilities( { data, facilityInfo }: FAMFacilitiesProps) {
    const [friendAvatarUrl, setFriendAvatarUrl] = useState<string | null>(null)

    return (
        <div>
            <h1>{facilityInfo.name}</h1>
            {data.length > 0 ? (
                <ul>
                    {data.map(item => {
                        const fetchAvatarData = async (item: FriendsView) => {
                            if (!item.friend_id) {
                                return
                            }
                            const { data } = await supabase
                                .from('users')
                                .select('avatar_url')
                                .eq('user_id', item.friend_id)
                                .single()
                            if (data) {
                                setFriendAvatarUrl(data.avatar_url)
                            } else {
                                setFriendAvatarUrl(null)
                            }
                        }
                        fetchAvatarData(item)
                        return (
                            <li key={item.friend_id}>
                                <Avatar
                                    userId={item.friend_id}
                                    avatarUrl={friendAvatarUrl}
                                    size={100}
                                    fallbackText={item.friend_name || 'ユーザー'}
                                />
                                {item.friend_name}
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <p>フレンドは誰も利用していません</p>
            )}
        </div>
    )
}
import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import type { FriendsView } from '../types/types';

const FriendContext = createContext<FriendsView[] | null>(null);

export function FriendProvider({ children }: { children: React.ReactNode }) {
    const [friendData, setFriendData] = useState<FriendsView[]>([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const { data } = await supabase.from('friends').select();
            if (data) setFriendData(data);
        };
        fetchInitialData();

        const channel = supabase
            .channel('friend_realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'fam_activity_log' },
                () => fetchInitialData()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <FriendContext.Provider value={friendData}>
            {children}
        </FriendContext.Provider>
    );
}

export function useFriendData() {
    return useContext(FriendContext);
}
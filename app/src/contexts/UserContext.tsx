import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import type { Database } from '../types/database.types';

type UserData = Database['public']['Tables']['users']['Row'];

const UserContext = createContext<UserData[] | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData[]>([]);

useEffect(() => {
    const fetchInitialData = async () => {
        const { data: userData } = await supabase.from('users').select();
        if (userData) setUserData(userData);
    };
    
    // 初回データ取得
    fetchInitialData();

    // usersテーブルのリアルタイム変更を監視
    const userChannel = supabase
        .channel('user_realtime')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'users' },
            () => fetchInitialData()
        )
        .subscribe();

    return () => {
        // コンポーネントのアンマウント時にチャンネルを削除
        supabase.removeChannel(userChannel);
    };
}, []);
  return (
      <UserContext.Provider value={userData}>
        {children}
      </UserContext.Provider>
  );
}

// 修正後のuseLUMDataフック
export function useUserData() {
  const userData = useContext(UserContext);

  if (userData === null) {
    throw new Error('useLUMData must be used within a LUMProvider');
  }

  return {userData}
}
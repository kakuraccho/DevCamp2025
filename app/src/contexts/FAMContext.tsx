import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import type { Database } from '../types/database.types';

type FamData = Database['public']['Tables']['fam_locations']['Row'];
type UserData = Database['public']['Tables']['users']['Row'];

const FAMContext = createContext<FamData[] | null>(null);
const UserContext = createContext<UserData[] | null>(null);

export function FAMProvider({ children }: { children: React.ReactNode }) {
  const [famData, setFamData] = useState<FamData[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);

useEffect(() => {
    const fetchInitialData = async () => {
        const { data: famData } = await supabase.from('fam_locations').select();
        const { data: userData } = await supabase.from('users').select();
        if (famData) setFamData(famData);
        if (userData) setUserData(userData);
    };
    
    // 初回データ取得
    fetchInitialData();

    // fam_locationsテーブルのリアルタイム変更を監視
    const famChannel = supabase
        .channel('fam_realtime')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'fam_locations' },
            () => fetchInitialData()
        )
        .subscribe();

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
        supabase.removeChannel(famChannel);
        supabase.removeChannel(userChannel);
    };
}, []);
  return (
    <FAMContext.Provider value={famData}>
      <UserContext.Provider value={userData}>
        {children}
      </UserContext.Provider>
    </FAMContext.Provider>
  );
}

// 修正後のuseLUMDataフック
export function useFAMData() {
  const famData = useContext(FAMContext);
  const userData = useContext(UserContext);

  if (famData === null || userData === null) {
    throw new Error('useLUMData must be used within a LUMProvider');
  }

  return { famData, userData };
}
import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import type { Database } from '../types/database.types';

type LumData = Database['public']['Tables']['lum']['Row'];

const LUMContext = createContext<LumData[] | null>(null);

export function LUMProvider({ children }: { children: React.ReactNode }) {
    const [lumData, setLumData] = useState<LumData[]>([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const { data } = await supabase.from('lum').select();
            if (data) setLumData(data);
        };
        fetchInitialData();

        const channel = supabase
            .channel('lum_realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'lum' },
                () => fetchInitialData()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <LUMContext.Provider value={lumData}>
            {children}
        </LUMContext.Provider>
    );
}

export function useLUMData() {
    return useContext(LUMContext);
}
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import type { Database } from "../types/database.types"

type Tables = Database['public']['Tables']
type TableName = keyof Tables

export default function useFetchDB<T extends TableName>(
    tableName: T,
    column?: keyof Tables[T]['Row'] | null,
    value?: any
) {
    
    const [data, setData] = useState<Tables[T]['Row'][]>([])
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const fetchFromDB = async () => {
            setLoading(true)
            
            let query = supabase.from(tableName).select()
            
            // columnとvalueが両方指定されている場合のみフィルタを適用
            if (column !== null && column !== undefined && value !== null && value !== undefined) {
                query = query.eq(column as string, value)
            }

            const { data: queryData, error: queryError } = await query

            if (isMounted) {
                if (queryError) {
                    setError(queryError)
                    setData([])
                } else if (queryData) {
                    setData(queryData as unknown as Tables[T]['Row'][])
                }
                setLoading(false)
            }
        }
        
        fetchFromDB()

        return () => {
            isMounted = false
        }
    }, [tableName, column, value])

    return { data, error, loading }
}
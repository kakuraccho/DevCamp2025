import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import type { Database } from "../types/database.types"

type Tables = Database['public']['Tables']
type TableName = keyof Tables

export default function useFetchDB<T extends TableName>(
    tableName: T,
    column: keyof Tables[T]['Row'],
    value: any
) {
    
    const [data, setData] = useState<Tables[T]['Row'][]>([])
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const fetchFromDB = async () => {
            if (!value) {
                if (isMounted) {
                    setLoading(false)
                    setData([])
                }
                return
            }
            setLoading(true)
            const { data: queryData, error: queryError } = await supabase
                .from(tableName)
                .select()
                .eq(column as string, value)

            if (isMounted) {
                if (queryError) {
                    setError(queryError)
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
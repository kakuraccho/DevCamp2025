import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { type General, type AuthHookProps } from "../types/types"
import type { AuthHook } from "../types/types"

export default function useAuth() {
    const [session, setSession] = useState<AuthHook['session']>(null)
    const [loading, setLoading] = useState<General['loading']>(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        }).finally(() => {
            setLoading(false)
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    },[])

    const login = async ({ email, password }: AuthHookProps) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)
        return { error }
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        setLoading(false)
        return { error }
    }

    const signUp = async ({ email, password }: AuthHookProps) => {
        const { error } = await supabase.auth.signUp({ email, password })
        setLoading(false)
        return { error }
    }

    return { session, loading, login, logout, signUp }
}
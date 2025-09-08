import type { Session, AuthError } from "@supabase/supabase-js"
import type { Database } from "./database.types"

export interface General {
    loading: boolean
    error: string | null
}

export interface LUMProps {
    floor: number
}

export interface AuthHook {
    session: Session | null
    login: () => Promise<{ error: AuthError | null }>
    logout: () => Promise<{ error: AuthError | null }>
    signUp: () => Promise<{ error: AuthError | null }>
}

export interface AuthHookProps {
    email: string
    password: string
}

export type LUMItemProps = Database['public']['Tables']['lum']['Row']
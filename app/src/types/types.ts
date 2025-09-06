import type { Session, AuthError } from "@supabase/supabase-js"

export interface General {
    loading: boolean
}

export interface LUMPageProps {
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
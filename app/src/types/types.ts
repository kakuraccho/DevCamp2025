import type { Session, AuthError } from "@supabase/supabase-js"
import type { Database } from "./database.types"
import type { ReactNode } from "react"

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

export interface ModalProps {
    openMessage: string
    children: ReactNode
}

export interface Friend {
    friend_id: string
    friend_name: string
    fam_current_location_id: number
}

export interface FriendsView {
    fam_current_location_id: number | null
    friend_id: string | null
    friend_name: string | null
    friend_avatar_url?: string | null
}[]

export interface FAMFacilitiesProps {
    data: FriendsView[]
    facilityInfo: { id: number, name: string }
}

export interface PendingRequest {
    requester_id: string
    receiver_id: string
    status: string
    requester: {
        name: string | null
        user_id: string
    }
}

export type LUMItemProps = Database['public']['Tables']['lum']['Row']
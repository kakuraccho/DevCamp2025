export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      debug_logs: {
        Row: {
          created_at: string | null
          data: Json | null
          function_name: string | null
          id: number
          message: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          function_name?: string | null
          id?: number
          message?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          function_name?: string | null
          id?: number
          message?: string | null
        }
        Relationships: []
      }
      fam_activity_logs: {
        Row: {
          created_at: string
          event: string
          id: number
          location_id: number
          userid: string
        }
        Insert: {
          created_at?: string
          event: string
          id?: never
          location_id: number
          userid: string
        }
        Update: {
          created_at?: string
          event?: string
          id?: never
          location_id?: number
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fam_activity_logs_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "fam_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fam_activity_logs_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      fam_locations: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      friendships: {
        Row: {
          created_at: string
          receiver_id: string
          requester_id: string
          status: string
        }
        Insert: {
          created_at?: string
          receiver_id: string
          requester_id: string
          status?: string
        }
        Update: {
          created_at?: string
          receiver_id?: string
          requester_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "friendships_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "friendships_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lum: {
        Row: {
          endtime: string | null
          floor: number
          id: number
          name: string
          starttime: string | null
          status: string
          type: string
          userid: string | null
        }
        Insert: {
          endtime?: string | null
          floor: number
          id?: never
          name: string
          starttime?: string | null
          status: string
          type: string
          userid?: string | null
        }
        Update: {
          endtime?: string | null
          floor?: number
          id?: never
          name?: string
          starttime?: string | null
          status?: string
          type?: string
          userid?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          discord_id: string | null
          email: string
          fam_current_location_id: number | null
          floor: number | null
          name: string | null
          roomid: number | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          discord_id?: string | null
          email: string
          fam_current_location_id?: number | null
          floor?: number | null
          name?: string | null
          roomid?: number | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          discord_id?: string | null
          email?: string
          fam_current_location_id?: number | null
          floor?: number | null
          name?: string | null
          roomid?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_fam_current_location_id_fkey"
            columns: ["fam_current_location_id"]
            isOneToOne: false
            referencedRelation: "fam_locations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      friends: {
        Row: {
          fam_current_location_id: number | null
          friend_id: string | null
          friend_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_fam_current_location_id_fkey"
            columns: ["fam_current_location_id"]
            isOneToOne: false
            referencedRelation: "fam_locations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_friend_request: {
        Args: { p_requester_id: string }
        Returns: undefined
      }
      cleanup_old_debug_logs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      enter_location: {
        Args: { u_location_id: number }
        Returns: undefined
      }
      force_checkout_stale_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      leave_location: {
        Args: { u_location_id: number }
        Returns: undefined
      }
      notify_discord: {
        Args: { p_discord_id: string; p_message: string }
        Returns: undefined
      }
      reset_finished_laundry_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      send_friend_request: {
        Args: { p_receiver_id: string }
        Returns: string
      }
      send_test_notification: {
        Args: { p_discord_id: string }
        Returns: string
      }
      start_laundry_session: {
        Args: { duration_in_minutes: number; machine_id_to_start: number }
        Returns: undefined
      }
    }
    Enums: {
      "lum-enable": "free" | "used"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      "lum-enable": ["free", "used"],
    },
  },
} as const

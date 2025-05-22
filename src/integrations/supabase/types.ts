export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          api_key: string
          api_secret: string
          created_at: string
          exchange: string
          id: string
          is_testnet: boolean
          updated_at: string | null
          user_id: string
        }
        Insert: {
          api_key: string
          api_secret: string
          created_at?: string
          exchange: string
          id?: string
          is_testnet?: boolean
          updated_at?: string | null
          user_id: string
        }
        Update: {
          api_key?: string
          api_secret?: string
          created_at?: string
          exchange?: string
          id?: string
          is_testnet?: boolean
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      earnings: {
        Row: {
          amount: number
          created_at: string
          date: string
          difference_rate: string | null
          followers: number | null
          id: string
          level: number | null
          rank: string | null
          referred_user: string | null
          status: string
          strategy: string | null
          trader_id: string | null
          type: string
          updated_at: string | null
          user_id: string
          user_rank: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          date: string
          difference_rate?: string | null
          followers?: number | null
          id?: string
          level?: number | null
          rank?: string | null
          referred_user?: string | null
          status: string
          strategy?: string | null
          trader_id?: string | null
          type: string
          updated_at?: string | null
          user_id: string
          user_rank?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          difference_rate?: string | null
          followers?: number | null
          id?: string
          level?: number | null
          rank?: string | null
          referred_user?: string | null
          status?: string
          strategy?: string | null
          trader_id?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
          user_rank?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "earnings_referred_user_fkey"
            columns: ["referred_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "earnings_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "traders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "earnings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      followed_traders: {
        Row: {
          active: boolean
          allocation_percent: number
          created_at: string
          id: string
          trader_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean
          allocation_percent: number
          created_at?: string
          id?: string
          trader_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean
          allocation_percent?: number
          created_at?: string
          id?: string
          trader_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followed_traders_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "traders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followed_traders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          balance: number | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          balance?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          balance?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          level: number
          referred_user_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level: number
          referred_user_id: string
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: number
          referred_user_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      traders: {
        Row: {
          api_key: string | null
          api_secret: string | null
          avatar_url: string | null
          created_at: string | null
          description: string | null
          followers: string | null
          id: string
          name: string | null
          positive: boolean | null
          profit_30d: string | null
          profit_90d: string | null
          specialization: string | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
          win_rate: string | null
        }
        Insert: {
          api_key?: string | null
          api_secret?: string | null
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
          followers?: string | null
          id: string
          name?: string | null
          positive?: boolean | null
          profit_30d?: string | null
          profit_90d?: string | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          win_rate?: string | null
        }
        Update: {
          api_key?: string | null
          api_secret?: string | null
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
          followers?: string | null
          id?: string
          name?: string | null
          positive?: boolean | null
          profit_30d?: string | null
          profit_90d?: string | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          win_rate?: string | null
        }
        Relationships: []
      }
      trades: {
        Row: {
          amount: number
          created_at: string
          current_price: number
          date: string
          entry_price: number
          id: string
          pair: string
          profit: string
          status: string
          trader_id: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          current_price: number
          date: string
          entry_price: number
          id?: string
          pair: string
          profit: string
          status: string
          trader_id: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          current_price?: number
          date?: string
          entry_price?: number
          id?: string
          pair?: string
          profit?: string
          status?: string
          trader_id?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "traders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_ranks: {
        Row: {
          bonus_rate: string
          created_at: string
          earned: string
          id: string
          progress: number
          rank: string
          required_referrals: string | null
          target: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bonus_rate: string
          created_at?: string
          earned: string
          id?: string
          progress: number
          rank: string
          required_referrals?: string | null
          target: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bonus_rate?: string
          created_at?: string
          earned?: string
          id?: string
          progress?: number
          rank?: string
          required_referrals?: string | null
          target?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_ranks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

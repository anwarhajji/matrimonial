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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      _seenMessages: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_seenMessages_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Message"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_seenMessages_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      _UserConversations: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_UserConversations_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_UserConversations_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Account: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Conversation: {
        Row: {
          createdAt: string
          id: string
          isGroup: boolean | null
          lastMessageAt: string
          messagesIds: string[] | null
          name: string | null
          userIds: string[] | null
        }
        Insert: {
          createdAt?: string
          id: string
          isGroup?: boolean | null
          lastMessageAt?: string
          messagesIds?: string[] | null
          name?: string | null
          userIds?: string[] | null
        }
        Update: {
          createdAt?: string
          id?: string
          isGroup?: boolean | null
          lastMessageAt?: string
          messagesIds?: string[] | null
          name?: string | null
          userIds?: string[] | null
        }
        Relationships: []
      }
      Message: {
        Row: {
          body: string | null
          conversationId: string
          createdAt: string
          id: string
          seenIds: string[] | null
          senderId: string
        }
        Insert: {
          body?: string | null
          conversationId: string
          createdAt?: string
          id: string
          seenIds?: string[] | null
          senderId: string
        }
        Update: {
          body?: string | null
          conversationId?: string
          createdAt?: string
          id?: string
          seenIds?: string[] | null
          senderId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_conversationId_fkey"
            columns: ["conversationId"]
            isOneToOne: false
            referencedRelation: "Conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Message_senderId_fkey"
            columns: ["senderId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      PasswordResetToken: {
        Row: {
          email: string
          expires: string
          id: string
          token: string
        }
        Insert: {
          email: string
          expires: string
          id: string
          token: string
        }
        Update: {
          email?: string
          expires?: string
          id?: string
          token?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          age: number | null
          conversationIds: string[] | null
          createdAt: string
          email: string | null
          emailVerified: string | null
          fullname: string | null
          gender: string | null
          id: string
          image: string | null
          name: string | null
          password: string | null
          profilcomplete: boolean | null
          role: Database["public"]["Enums"]["UserRole"]
          seenMessageIds: string[] | null
          stepCompletion: number | null
          updatedAt: string
          username: string | null
        }
        Insert: {
          age?: number | null
          conversationIds?: string[] | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          fullname?: string | null
          gender?: string | null
          id: string
          image?: string | null
          name?: string | null
          password?: string | null
          profilcomplete?: boolean | null
          role?: Database["public"]["Enums"]["UserRole"]
          seenMessageIds?: string[] | null
          stepCompletion?: number | null
          updatedAt: string
          username?: string | null
        }
        Update: {
          age?: number | null
          conversationIds?: string[] | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          fullname?: string | null
          gender?: string | null
          id?: string
          image?: string | null
          name?: string | null
          password?: string | null
          profilcomplete?: boolean | null
          role?: Database["public"]["Enums"]["UserRole"]
          seenMessageIds?: string[] | null
          stepCompletion?: number | null
          updatedAt?: string
          username?: string | null
        }
        Relationships: []
      }
      UserProfile: {
        Row: {
          city: string | null
          country: string | null
          drinkinghabits: string | null
          education: string | null
          height: string | null
          id: string
          income: string | null
          kids: string | null
          maritalstatus: string | null
          occupation: string | null
          pets: string | null
          phonenumber: string | null
          profilpicture: string | null
          religion: string | null
          smokinghabits: string | null
          travelpreferences: string | null
          userId: string
          weight: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          drinkinghabits?: string | null
          education?: string | null
          height?: string | null
          id: string
          income?: string | null
          kids?: string | null
          maritalstatus?: string | null
          occupation?: string | null
          pets?: string | null
          phonenumber?: string | null
          profilpicture?: string | null
          religion?: string | null
          smokinghabits?: string | null
          travelpreferences?: string | null
          userId: string
          weight?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          drinkinghabits?: string | null
          education?: string | null
          height?: string | null
          id?: string
          income?: string | null
          kids?: string | null
          maritalstatus?: string | null
          occupation?: string | null
          pets?: string | null
          phonenumber?: string | null
          profilpicture?: string | null
          religion?: string | null
          smokinghabits?: string | null
          travelpreferences?: string | null
          userId?: string
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "UserProfile_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      VerificationToken: {
        Row: {
          email: string
          expires: string
          id: string
          token: string
        }
        Insert: {
          email: string
          expires: string
          id: string
          token: string
        }
        Update: {
          email?: string
          expires?: string
          id?: string
          token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Gender: "MALE" | "FEMALE"
      MaritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED" | "SEPARATED"
      NKids: "NO" | "YES"
      UserRole: "ADMIN" | "USER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

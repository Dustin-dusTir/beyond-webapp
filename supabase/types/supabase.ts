export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          id: number
          created_at: string | null
          owning_user_uuid: string | null
          document_id: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          owning_user_uuid?: string | null
          document_id?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          owning_user_uuid?: string | null
          document_id?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      testament_gen_question_answers: {
        Row: {
          created_at: string | null
          user_id: string
          question_id: number
          chosen_option: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          user_id: string
          question_id: number
          chosen_option?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          user_id?: string
          question_id?: number
          chosen_option?: number | null
          updated_at?: string | null
        }
      }
      testament_gen_questions: {
        Row: {
          id: number
          created_at: string | null
          id_in_mermaid: string | null
          name_of_question: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          id_in_mermaid?: string | null
          name_of_question?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          id_in_mermaid?: string | null
          name_of_question?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

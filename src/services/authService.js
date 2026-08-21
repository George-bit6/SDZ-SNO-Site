import supabase from "../../supabase";

/**
 * Authentication Service - Handles all authentication operations
 * Follows SOLID principles: Single Responsibility for authentication
 */
export class AuthService {
  /**
   * Get current user ID
   * @returns {Promise<string|null>} User ID or null
   */
  async getUserId() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Get user id error:", error.message);
        return null;
      }
      
      return user?.id ?? null;
    } catch (error) {
      console.error("Unexpected error getting user ID:", error);
      return null;
    }
  }

  /**
   * Get current user
   * @returns {Promise<object|null>} User data or null
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Get user error:", error.message);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error("Unexpected error getting user:", error);
      return null;
    }
  }

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} Login result
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.error("Unexpected login error:", error);
      return {
        success: false,
        error: "An unexpected error occurred"
      };
    }
  }

  /**
   * Sign out
   * @returns {Promise<object>} Sign out result
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error.message);
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true
      };
    } catch (error) {
      console.error("Unexpected sign out error:", error);
      return {
        success: false,
        error: "An unexpected error occurred"
      };
    }
  }

  /**
   * Get user role (member or leader)
   * @param {string} userId - User ID
   * @returns {Promise<string|null>} User role or null
   */
  async getUserRole(userId) {
    try {
      // Check if user is a leader
      const { data: leaderData } = await supabase
        .from('Leaders')
        .select('leader_id')
        .eq('leader_id', userId)
        .single();

      if (leaderData) {
        return 'leader';
      }

      // Check if user is a member
      const { data: memberData } = await supabase
        .from('Scout_members')
        .select('Scout_id')
        .eq('Scout_id', userId)
        .single();

      if (memberData) {
        return 'member';
      }

      return null;
    } catch (error) {
      console.error("Error getting user role:", error);
      return null;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
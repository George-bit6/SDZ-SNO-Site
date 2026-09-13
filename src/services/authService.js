import supabase from "../../supabase";

/**
 * Authentication Service - Handles all authentication operations
 * Follows SOLID principles: Single Responsibility for authentication
 */
export class AuthService {
  /**
   * Get current user ID from Supabase authentication
   * Purpose: Retrieves the authenticated user's unique identifier from the current session
   * Frontend Display: Used to identify the current user throughout the application for personalized content,
   *                  role-based access control, and user-specific data fetching
   * @returns {Promise<string|null>} User ID if authenticated, null if not authenticated or error occurs
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
   * Get current user data from Supabase authentication
   * Purpose: Retrieves the complete user object including email, metadata, and session information
   * Frontend Display: Used to display user profile information, show user-specific UI elements,
   *                  and populate user profile forms with current data
   * @returns {Promise<object|null>} Complete user object if authenticated, null if not authenticated or error occurs
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
   * Sign in user with email and password
   * Purpose: Authenticates a user using their email and password credentials via Supabase Auth
   * Frontend Display: Triggers user login flow, redirects to dashboard on success,
   *                  displays error messages on failure, and updates authentication state
   * @param {string} email - User's email address for authentication
   * @param {string} password - User's password for authentication
   * @returns {Promise<object>} Login result object with success status, user data, session info, or error details
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
   * Sign out current user
   * Purpose: Terminates the current user's authentication session via Supabase Auth
   * Frontend Display: Logs the user out of the application, redirects to login page,
   *                  clears user-specific data from state, and updates UI to show logged-out state
   * @returns {Promise<object>} Sign out result object with success status or error details
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
   * Get user role from database (member or leader)
   * Purpose: Determines the user's role by checking if they exist in Leaders or Scout_members tables
   * Frontend Display: Used for role-based access control, determines which dashboard/features are accessible,
   *                  controls navigation menu options, and shows role-specific UI components
   * @param {string} userId - User's unique identifier to check role for
   * @returns {Promise<string|null>} User role ('leader', 'member', or null if user has no role)
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
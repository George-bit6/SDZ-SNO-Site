import supabase from "../../supabase";

/**
 * Base Data Service - Abstract base class for all data services
 * Follows SOLID principles: Single Responsibility, Open/Closed, Liskov Substitution
 */
export class BaseDataService {
  constructor() {
    if (new.target === BaseDataService) {
      throw new Error("Abstract class BaseDataService cannot be instantiated directly");
    }
  }

  /**
   * Generic method to fetch data from Supabase
   * @param {string} table - Table name
   * @param {object} filters - Filter conditions
   * @param {string} select - Select columns
   * @returns {Promise<Array|null>} Data or null on error
   */
  async fetchAll(table, filters = {}, select = '*') {
    try {
      let query = supabase.from(table).select(select);
      
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data, error } = await query;
      
      if (error) {
        console.error(`Error fetching from ${table}:`, error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error(`Unexpected error fetching from ${table}:`, error);
      return null;
    }
  }

  /**
   * Generic method to fetch single record
   * @param {string} table - Table name
   * @param {object} filters - Filter conditions
   * @param {string} select - Select columns
   * @returns {Promise<object|null>} Data or null on error
   */
  async fetchOne(table, filters = {}, select = '*') {
    try {
      let query = supabase.from(table).select(select);
      
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data, error } = await query.single();
      
      if (error) {
        console.error(`Error fetching single from ${table}:`, error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error(`Unexpected error fetching single from ${table}:`, error);
      return null;
    }
  }

  /**
   * Generic method to call RPC function
   * @param {string} functionName - RPC function name
   * @param {object} params - Function parameters
   * @returns {Promise<any>} Result or null on error
   */
  async callRpc(functionName, params = {}) {
    try {
      const { data, error } = await supabase.rpc(functionName, params);
      
      if (error) {
        console.error(`Error calling RPC ${functionName}:`, error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error(`Unexpected error calling RPC ${functionName}:`, error);
      return null;
    }
  }
}
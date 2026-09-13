import supabase from "../../supabase.js";

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
   * Generic method to fetch multiple records from Supabase
   * Purpose: Retrieves multiple records from a specified Supabase table with optional filtering and column selection
   * Frontend Display: Used to populate lists, tables, dropdowns, and any UI components that display multiple data items
   * @param {string} table - Supabase table name to fetch data from
   * @param {object} filters - Optional filter conditions as key-value pairs (e.g., { status: 'active' })
   * @param {string} select - Optional column selection string (default: '*' for all columns)
   * @returns {Promise<Array|null>} Array of records if successful, null if error occurs
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
   * Generic method to fetch a single record from Supabase
   * Purpose: Retrieves exactly one record from a specified Supabase table using filter conditions
   * Frontend Display: Used to populate detail views, edit forms, profile pages, and any UI components displaying single items
   * @param {string} table - Supabase table name to fetch data from
   * @param {object} filters - Filter conditions as key-value pairs to identify the specific record
   * @param {string} select - Optional column selection string (default: '*' for all columns)
   * @returns {Promise<object|null>} Single record object if successful, null if error occurs or no record found
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
   * Generic method to call Supabase RPC (Remote Procedure Call) function
   * Purpose: Executes custom database functions stored in Supabase for complex queries and business logic
   * Frontend Display: Used for specialized data operations like calculating statistics, joining complex data,
   *                  or performing database-side operations that require custom SQL logic
   * @param {string} functionName - Name of the RPC function to execute in Supabase
   * @param {object} params - Optional parameters to pass to the RPC function
   * @returns {Promise<any>} Result from the RPC function if successful, null if error occurs
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
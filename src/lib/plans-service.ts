import { supabase } from './supabase-client';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  icon: string;
  popular: boolean;
  highlight: string;
  hotmart_url: string;
  order: number;
  features?: PlanFeature[];
  created_at: string;
  updated_at: string;
}

export interface PlanFeature {
  id: string;
  plan_id: string;
  feature: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// Fetch all plans with their features
export const fetchPlans = async (): Promise<Plan[]> => {
  try {
    const { data: plans, error: plansError } = await supabase
      .from('plans')
      .select('*')
      .order('order', { ascending: true });

    if (plansError) throw plansError;

    // Fetch features for each plan
    const plansWithFeatures = await Promise.all(
      (plans || []).map(async (plan) => {
        const { data: features, error: featuresError } = await supabase
          .from('plan_features')
          .select('*')
          .eq('plan_id', plan.id)
          .order('order', { ascending: true });

        if (featuresError) throw featuresError;

        return {
          ...plan,
          features: features || [],
        };
      })
    );

    return plansWithFeatures;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

// Fetch a single plan with its features
export const fetchPlanById = async (planId: string): Promise<Plan | null> => {
  try {
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError) throw planError;
    if (!plan) return null;

    const { data: features, error: featuresError } = await supabase
      .from('plan_features')
      .select('*')
      .eq('plan_id', planId)
      .order('order', { ascending: true });

    if (featuresError) throw featuresError;

    return {
      ...plan,
      features: features || [],
    };
  } catch (error) {
    console.error('Error fetching plan:', error);
    throw error;
  }
};

// Create a new plan
export const createPlan = async (plan: Omit<Plan, 'id' | 'created_at' | 'updated_at'>): Promise<Plan> => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .insert([plan])
      .select()
      .single();

    if (error) throw error;
    return { ...data, features: [] };
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

// Update a plan
export const updatePlan = async (planId: string, updates: Partial<Plan>): Promise<Plan> => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .update(updates)
      .eq('id', planId)
      .select()
      .single();

    if (error) throw error;

    // Fetch updated features
    const { data: features } = await supabase
      .from('plan_features')
      .select('*')
      .eq('plan_id', planId)
      .order('order', { ascending: true });

    return { ...data, features: features || [] };
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
};

// Delete a plan
export const deletePlan = async (planId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('plans')
      .delete()
      .eq('id', planId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting plan:', error);
    throw error;
  }
};

// Add a feature to a plan
export const addPlanFeature = async (planId: string, feature: string, order: number): Promise<PlanFeature> => {
  try {
    const { data, error } = await supabase
      .from('plan_features')
      .insert([{ plan_id: planId, feature, order }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding plan feature:', error);
    throw error;
  }
};

// Update a feature
export const updatePlanFeature = async (featureId: string, feature: string): Promise<PlanFeature> => {
  try {
    const { data, error } = await supabase
      .from('plan_features')
      .update({ feature })
      .eq('id', featureId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating plan feature:', error);
    throw error;
  }
};

// Delete a feature
export const deletePlanFeature = async (featureId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('plan_features')
      .delete()
      .eq('id', featureId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting plan feature:', error);
    throw error;
  }
};

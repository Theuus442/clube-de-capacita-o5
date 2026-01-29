import { useState, useEffect } from 'react';
import { fetchPlans, Plan } from '@/lib/plans-service';

interface UsePlans {
  plans: Plan[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const usePlans = (): UsePlans => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPlans();
      setPlans(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch plans');
      setError(error);
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    refetch: loadPlans,
  };
};

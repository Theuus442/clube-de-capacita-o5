import { useState, useEffect } from 'react';
import { fetchTracks, Track } from '@/lib/tracks-service';

interface UseTracks {
  tracks: Track[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useTracks = (): UseTracks => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTracks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTracks();
      setTracks(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch tracks');
      setError(error);
      console.error('Error loading tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTracks();
  }, []);

  return {
    tracks,
    loading,
    error,
    refetch: loadTracks,
  };
};

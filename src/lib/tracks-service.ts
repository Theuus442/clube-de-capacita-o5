import { supabase } from './supabase-client';

export interface Track {
  id: string;
  title: string;
  icon: string;
  color: string;
  order: number;
  courses?: Course[];
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  track_id: string;
  title: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// Fetch all tracks with their courses
export const fetchTracks = async (): Promise<Track[]> => {
  try {
    const { data: tracks, error: tracksError } = await supabase
      .from('tracks')
      .select('*')
      .order('order', { ascending: true });

    if (tracksError) throw tracksError;

    // Fetch courses for each track
    const tracksWithCourses = await Promise.all(
      (tracks || []).map(async (track) => {
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('track_id', track.id)
          .order('order', { ascending: true });

        if (coursesError) throw coursesError;

        return {
          ...track,
          courses: courses || [],
        };
      })
    );

    return tracksWithCourses;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};

// Fetch a single track with its courses
export const fetchTrackById = async (trackId: string): Promise<Track | null> => {
  try {
    const { data: track, error: trackError } = await supabase
      .from('tracks')
      .select('*')
      .eq('id', trackId)
      .single();

    if (trackError) throw trackError;
    if (!track) return null;

    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .eq('track_id', trackId)
      .order('order', { ascending: true });

    if (coursesError) throw coursesError;

    return {
      ...track,
      courses: courses || [],
    };
  } catch (error) {
    console.error('Error fetching track:', error);
    throw error;
  }
};

// Create a new track
export const createTrack = async (track: Omit<Track, 'id' | 'created_at' | 'updated_at'>): Promise<Track> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .insert([track])
      .select()
      .single();

    if (error) throw error;
    return { ...data, courses: [] };
  } catch (error) {
    console.error('Error creating track:', error);
    throw error;
  }
};

// Update a track
export const updateTrack = async (trackId: string, updates: Partial<Track>): Promise<Track> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .update(updates)
      .eq('id', trackId)
      .select()
      .single();

    if (error) throw error;

    // Fetch updated courses
    const { data: courses } = await supabase
      .from('courses')
      .select('*')
      .eq('track_id', trackId)
      .order('order', { ascending: true });

    return { ...data, courses: courses || [] };
  } catch (error) {
    console.error('Error updating track:', error);
    throw error;
  }
};

// Delete a track
export const deleteTrack = async (trackId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('tracks')
      .delete()
      .eq('id', trackId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting track:', error);
    throw error;
  }
};

// Add a course to a track
export const addCourse = async (trackId: string, courseTitle: string, order: number): Promise<Course> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([{ track_id: trackId, title: courseTitle, order }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

// Update a course
export const updateCourse = async (courseId: string, title: string): Promise<Course> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .update({ title })
      .eq('id', courseId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (courseId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

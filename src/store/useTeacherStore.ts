import create from 'solid-zustand';
import { teachersQuery } from '../api/teachersQuery';

interface GroupStore {
  teachers: string[];
  fetch(fetcher: typeof teachersQuery): Promise<void>;
  add(teacherName: string): void;
  remove(teacherName: string): void;
}

export const useTeachersStore = create<GroupStore>((set) => ({
  teachers: [] as string[],
  fetch: async (fetcher: typeof teachersQuery) => {
    set({ teachers: await fetcher() });
  },
  add: (teacherName: string) => {
    set((state) => {
      const teachers = [...state.teachers, teacherName];
      return { teachers };
    });
  },
  remove: (teacherName: string) => {
    set((state) => {
      const teachers = state.teachers.filter((teacher) => teacher !== teacherName);
      return { teachers };
    });
  },
}));

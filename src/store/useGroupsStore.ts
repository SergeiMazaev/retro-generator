import create from 'solid-zustand';
import { Group, groupsQuery } from '../api/groupsQuery';

interface GroupStore {
  groups: Group[];
  fetch(fetcher: typeof groupsQuery): Promise<void>;
  add(groupName: string, studentName: string): void;
  remove(groupName: string, studentName: string): void;
}

export const useGroupsStore = create<GroupStore>((set) => ({
  groups: [] as Group[],
  fetch: async (fetcher: typeof groupsQuery) => {
    set({ groups: await fetcher() });
  },
  add: (groupName: string, studentName: string) => {
    set((state) => {
      const groups = state.groups.map((group) => {
        if (group.name !== groupName) return group;
        return {
          ...group,
          students: [...group.students, { id: Math.random().toString(), name: studentName }],
        };
      });
      return { groups };
    });
  },
  remove: (groupName: string, studentName: string) => {
    set((state) => {
      const groups = state.groups.map((group) => {
        if (group.name !== groupName) return group;
        return {
          ...group,
          students: group.students.filter((student) => student.name !== studentName),
        };
      });
      return { groups };
    });
  },
}));

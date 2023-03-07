export interface Group {
  id: string;
  name: string;
  phase: number;
  groupType: 'online' | 'msk' | 'spb';
  students: {
    id: string;
    name: string;
  }[];
  isArchive: boolean;
}

const url = 'https://pairs-generator.onrender.com/api/groups/';

export const groupsQuery = async (): Promise<Group[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const groups = (await (await fetch(url)).json()) as Group[];
  return groups.filter(({ groupType }) => groupType === 'online');
};

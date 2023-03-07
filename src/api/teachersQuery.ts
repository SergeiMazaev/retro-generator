interface TeacherResponse {
  groupType: 'online' | 'msk' | 'spb';
  teachers: string[];
  timegaps: string[];
}

const url = 'https://pairs-generator.onrender.com/api/teachersandtime?groupType=online';

export const teachersQuery = async (): Promise<string[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response = await (await fetch(url)).json();
  return (response as TeacherResponse).teachers;
};

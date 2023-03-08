import {GroupType} from "../types";

interface TeacherResponse {
  groupType: GroupType;
  teachers: string[];
  timegaps: string[];
}

const url = (groupType: GroupType) => `https://pairs-generator.onrender.com/api/teachersandtime?groupType=${groupType}`;

export const teachersQuery = async (groupType: GroupType = 'online'): Promise<string[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response = await (await fetch(url(groupType))).json();
  return (response as TeacherResponse).teachers;
};

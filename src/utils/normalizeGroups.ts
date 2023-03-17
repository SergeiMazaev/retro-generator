/* eslint-disable no-param-reassign, no-plusplus, @typescript-eslint/no-use-before-define */
export interface Group {
  name: string;
  phase: number;
  students: string[][];
}

export const normalizeGroups = (teacherNumber: number, groups: Group[]) => {
  for (let i = 0; i < teacherNumber; i++) {
    let firstTeacherStudentCount = countTeacherStudent(groups, i);
    for (let j = 0; j < teacherNumber; j++) {
      const secondTeacherStudentCount = countTeacherStudent(groups, j);
      if (Math.abs(firstTeacherStudentCount - secondTeacherStudentCount) > 1) {
        const index = groups.findIndex(({ students }) => students[i].length !== students[j].length);
        const temp = groups[index].students[j];
        groups[index].students[j] = groups[index].students[i];
        groups[index].students[i] = temp;
        firstTeacherStudentCount = countTeacherStudent(groups, i);
      }
    }
  }
};

function countTeacherStudent(groups: Group[], teacherIndex: number) {
  return groups.reduce((acc, group) => acc + group.students[teacherIndex].length, 0);
}

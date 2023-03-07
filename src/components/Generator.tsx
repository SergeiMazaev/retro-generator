import { createSignal, For } from 'solid-js';
import { Group } from '../api/groupsQuery';
import { shuffle } from '../utils/shuffle';
import { DisplayRetro } from './DisplayRetro';

interface DataDisplay {
  teachers: string[];
  groups: {
    name: string;
    phase: number;
    students: string[][];
  }[];
}

interface Props {
  teachers: string[];
  groups: Group[];
}

export const Generator = (props: Props) => {
  const [blocks, setBlocks] = createSignal<DataDisplay>([]);
  const generate = () => {
    const teachers = shuffle(props.teachers);
    const groups = props.groups
      .map((group) => ({
        students: shuffle(group.students).map(({ name }) => name),
        name: group.name,
        phase: group.phase,
      }))
      .map((group) => {
        let j = 0;
        const result: string[][] = [];
        for (let i = teachers.length; i > 1; i -= 1) {
          const step = Math.round((group.students.length - j) / i);
          result.push(group.students.slice(j, j + step));
          j += step;
        }
        result.push(group.students.slice(j));
        return { ...group, students: result };
      });

    for (let i = 0; i < teachers.length; i++) {
      const countI = groups.reduce((acc, group) => acc + group.students[i].length, 0);
      for (let j = 0; j < teachers.length; j++) {
        const countJ = groups.reduce((acc, group) => acc + group.students[j].length, 0);
        if (Math.abs(countI - countJ) > 1) {
          const index = groups.findIndex(
            ({ students }) => students[i].length !== students[j].length,
          );
          const temp = groups[index].students[j];
          groups[index].students[j] = groups[index].students[i];
          groups[index].students[i] = temp;
        }
      }
    }

    setBlocks(() => ({ teachers, groups }));
  };

  return (
    <>
      <DisplayRetro teachers={blocks().teachers} groups={blocks().groups} />
      <button onClick={generate} class="bg-gray-300 border-2 px-3 py-1 rounded">Generate</button>
    </>
  );
};

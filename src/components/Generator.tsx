import { createSignal } from 'solid-js';
import { Group } from '../api/groupsQuery';
import { shuffle } from '../utils/shuffle';
import { DisplayRetro } from './DisplayRetro';
import { normalizeGroups } from '../utils/normalizeGroups';

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
  const [blocks, setBlocks] = createSignal<DataDisplay>({ teachers: [], groups: [] });
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

    normalizeGroups(teachers.length, groups);

    setBlocks(() => ({ teachers, groups }));
  };

  return (
    <>
      <DisplayRetro teachers={blocks().teachers} groups={blocks().groups} />
      <button onClick={generate} class="bg-gray-300 border-2 px-3 py-1 rounded">
        Generate
      </button>
    </>
  );
};

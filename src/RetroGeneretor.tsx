import { createEffect, createResource, createSignal } from 'solid-js';
import { teachersQuery } from './api/teachersQuery';
import { CheckboxBlock } from './components/CheckboxBlock';
import { groupsQuery } from './api/groupsQuery';
import { Generator } from './components/Generator';

export const RetroGeneretor = () => {
  const [teachers] = createResource(teachersQuery);
  const [groups] = createResource(groupsQuery);
  const [teacherCheck, setTeacherCheck] = createSignal<[string, boolean][]>([]);
  const [groupCheck, setGroupCheck] = createSignal<[string, boolean][]>([]);

  createEffect(() => {
    setTeacherCheck(() => teachers()?.map((teacher) => [teacher, true]) ?? []);
  });

  createEffect(() => {
    setGroupCheck(() => groups()?.map(({ name }) => [name, true]) ?? []);
  });

  const onChangeTeacher = (teacherName: string) => {
    setTeacherCheck((prev) => {
      return prev.map(([name, value]) => {
        return [name, teacherName === name ? !value : value];
      });
    });
  };

  const onChangeGroup = (groupName: string) => {
    setGroupCheck((prev) => {
      return prev.map(([name, value]) => {
        return [name, groupName === name ? !value : value];
      });
    });
  };

  return (
    <div class="flex flex-col items-center m-auto w-3/4">
      <CheckboxBlock title="Преподаватели" values={teacherCheck()} onChange={onChangeTeacher} />
      <CheckboxBlock title="Группы студентов" values={groupCheck()} onChange={onChangeGroup} />
      <Generator
        groups={groupCheck()
          .filter(([, checked]) => checked)
          .map(([name]) => name)
          .map((name) => groups()?.find((group) => group.name === name)!)}
        teachers={teacherCheck()
          .filter(([, checked]) => checked)
          .map(([name]) => name)}
      />
    </div>
  );
};

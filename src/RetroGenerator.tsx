import { createEffect, createSignal } from 'solid-js';
import { teachersQuery } from './api/teachersQuery';
import { CheckboxBlock } from './components/CheckboxBlock';
import { groupsQuery } from './api/groupsQuery';
import { Generator } from './components/Generator';
import { Selector } from './components/Selector';
import { GroupType } from './types';
import { useGroupsStore } from './store/useGroupsStore';
import { useTeachersStore } from './store/useTeacherStore';
import { TeacherWindow } from './components/TeacherWindow';

export const RetroGenerator = () => {
  const [groupType, setGroupType] = createSignal<GroupType>('online');
  const groupStore = useGroupsStore();
  const teacherStore = useTeachersStore();
  const [teacherCheck, setTeacherCheck] = createSignal<[string, boolean][]>([]);
  const [groupCheck, setGroupCheck] = createSignal<[string, boolean][]>([]);

  createEffect(() => {
    groupStore.fetch(() => groupsQuery(groupType()));
    teacherStore.fetch(() => teachersQuery(groupType()));
  });

  createEffect(() => {
    setTeacherCheck(() => teacherStore.teachers.map((teacher) => [teacher, true]));
  });

  createEffect(() => {
    setGroupCheck(() => groupStore.groups.map(({ name }) => [name, true]));
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

  const onGroupTypeChange = (value: string) => {
    setGroupType(value as GroupType);
  };

  return (
    <div class="flex flex-col items-center m-auto w-3/4 my-5">
      <Selector
        title=""
        values={['online', 'msk', 'spb']}
        currentValue={groupType()}
        onChange={onGroupTypeChange}
      />
      <CheckboxBlock
        title="Преподаватели"
        values={teacherCheck()}
        onChange={onChangeTeacher}
        editWindow={TeacherWindow}
      />
      <CheckboxBlock title="Группы студентов" values={groupCheck()} onChange={onChangeGroup} />
      <Generator
        groups={groupCheck()
          .filter(([, checked]) => checked)
          .map(([name]) => name)
          .map((name) => groupStore.groups.find((group) => group.name === name)!)}
        teachers={teacherCheck()
          .filter(([, checked]) => checked)
          .map(([name]) => name)}
      />
    </div>
  );
};

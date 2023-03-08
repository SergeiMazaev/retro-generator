import { createEffect, createResource, createSignal } from 'solid-js';
import { teachersQuery } from './api/teachersQuery';
import { CheckboxBlock } from './components/CheckboxBlock';
import { groupsQuery } from './api/groupsQuery';
import { Generator } from './components/Generator';
import {Selector} from "./components/Selector";
import {GroupType} from "./types";

export const RetroGenerator = () => {
  const [groupType, setGroupType] = createSignal<GroupType>('online');
  const [teachers] = createResource(groupType, teachersQuery,  { initialValue: [] });
  const [groups, {refetch}] = createResource(groupType, groupsQuery, { initialValue: [] });
  const [teacherCheck, setTeacherCheck] = createSignal<[string, boolean][]>([]);
  const [groupCheck, setGroupCheck] = createSignal<[string, boolean][]>([]);

  createEffect(() => {
    setTeacherCheck(() => teachers().map((teacher) => [teacher, true]) ?? []);
  });

  createEffect(() => {
    setGroupCheck(() => groups().map(({ name }) => [name, true]) ?? []);
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
    setGroupType(value as GroupType)
    refetch();
  }

  return (
    <div class="flex flex-col items-center m-auto w-3/4 my-5">
      <Selector
        title=""
        values={['online', 'msk', 'spb']}
        currentValue={groupType()}
        onChange={onGroupTypeChange}
      />
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

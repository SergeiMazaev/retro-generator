import { createEffect, createSignal, For } from 'solid-js';
import { Window } from './Window';
import { useGroupsStore } from '../store/useGroupsStore';
import { Selector } from './Selector';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentsWindow = (props: Props) => {
  const { groups, remove, add } = useGroupsStore();
  const [groupName, setGroupName] = createSignal(groups[0]?.name ?? '');
  const [students, setStudents] = createSignal(groups[0]?.students ?? []);
  const [newStudent, setNewStudent] = createSignal('');

  createEffect(() => {
    setStudents(groups.find((group) => group.name === groupName())?.students ?? []);
  });

  const onGroupNameChange = (value: string) => {
    setGroupName(value);
    setStudents(groups.find((group) => group.name === value)?.students ?? []);
  };
  return (
    <Window header="Students" onClose={props.onClose} isOpen={props.isOpen}>
      <Selector
        title=""
        values={groups.map(({ name }) => name)}
        currentValue={groupName()}
        onChange={onGroupNameChange}
      />
      <For each={students()}>
        {(student) => (
          <div>
            {student.name}
            <button
              type="button"
              class="ml-2 hover:scale-125"
              onClick={() => remove(groupName(), student.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="red"
              >
                <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
              </svg>
            </button>
          </div>
        )}
      </For>
      <input value={newStudent()} onChange={(e) => setNewStudent(e.currentTarget.value)} />
      <button
        type="button"
        class="ml-2 hover:scale-125"
        onClick={() => add(groupName(), newStudent())}
      >
        <svg
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fill-rule="nonzero"
          />
        </svg>
      </button>
    </Window>
  );
};

import { For } from 'solid-js';

interface Props {
  teachers: string[];
  groups: {
    phase: number;
    students: string[][];
  }[];
}

const colors = ['bg-blue-200', 'bg-yellow-200', 'bg-green-200'];
const width = ['w-0', 'w-100', 'w-1/2', 'w-1/3', 'w-1/4', 'w-1/5', 'w-1/6'];

export const DisplayRetro = (props: Props) => {
  return (
    <div class="text-sm m-5">
      <div class="flex gap-4 mb-4">
        <div class="w-1/12" />
        <For each={props.teachers}>
          {(teacher, index) => (
            <div class={width[props.teachers.length]}>
              {teacher}
              <br />
              Комната {index() + 1}
            </div>
          )}
        </For>
      </div>
      <For each={props.groups}>
        {(group, index) => (
          <div class={`flex gap-4 mb-2 ${colors[index()]}`}>
            <div class="w-1/12">Фаза {group.phase}</div>
            <For each={group.students}>
              {(studentsSlice) => (
                <div class={width[props.teachers.length]}>
                  <For each={studentsSlice}>{(student) => <div class="m-2">{student}</div>}</For>
                </div>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};

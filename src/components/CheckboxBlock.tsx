import { For } from 'solid-js';
import { Checkbox } from './Checkbox';

interface Props {
  title: string;
  values: [string, boolean][];
  onChange: (label: string) => void;
}

export const CheckboxBlock = (props: Props) => {
  return (
    <div class="w-100 mb-5">
      <h2 class="text-center text-2xl">{props.title}</h2>
      <div class="flex gap-2 flex-wrap">
        <For each={props.values}>
          {([label, checked]) => (
            <Checkbox label={label} checked={checked} onChange={() => props.onChange(label)} />
          )}
        </For>
      </div>
    </div>
  );
};

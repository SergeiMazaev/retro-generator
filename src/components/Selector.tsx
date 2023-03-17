import { For } from 'solid-js';

interface Props {
  title: string;
  values: string[];
  currentValue: string;
  onChange: (newValue: string) => void;
}

export const Selector = (props: Props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <select value={props.currentValue} onChange={(e) => props.onChange(e.currentTarget.value)}>
        <For each={props.values}>{(value) => <option value={value}>{value}</option>}</For>
      </select>
    </div>
  );
};

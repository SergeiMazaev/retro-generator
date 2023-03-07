import { createSignal } from 'solid-js';

interface Props {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

export const Checkbox = (props: Props) => {
  const [storeId] = createSignal(Math.random().toString());

  return (
    <div>
      <input
        type="checkbox"
        id={storeId()}
        checked={props.checked}
        onChange={() => props.onChange?.()}
      />
      <label for={storeId()}>{props.label}</label>
    </div>
  );
};

import { Component, createComponent, createSignal, For } from 'solid-js';
import { Checkbox } from './Checkbox';

interface Props {
  title: string;
  values: [string, boolean][];
  onChange: (label: string) => void;
  editWindow?: Component<{
    isOpen: boolean;
    onClose: () => void;
  }>;
}

export const CheckboxBlock = (props: Props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <div class="w-100 mb-5">
      <h2 class="text-center text-2xl">
        {props.title}
        {props.editWindow && (
          <>
            {createComponent(props.editWindow, {
              isOpen: isOpen(),
              onClose: () => setIsOpen(false),
            })}
            <button
              class="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 font-semibold ml-3 px-2 border border-gray-500 rounded"
              onClick={() => setIsOpen(true)}
            >
              Edit
            </button>
          </>
        )}
      </h2>
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

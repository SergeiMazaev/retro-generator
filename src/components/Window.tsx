import { JSXElement } from 'solid-js';

interface Props {
  header: string;
  onClose: () => void;
  isOpen: boolean;
  children: JSXElement;
}

export const Window = (props: Props) => {
  const { isOpen, children, onClose, header } = props;
  if (!isOpen) return null;
  return (
    <div class="fixed top-0 right-0 w-1/3 h-full bg-gray-200 z-50 overflow-auto	">
      <div class="p-4">
        <div class="mb-4">
          <h3 class="text-lg font-bold">{header}</h3>
        </div>
        <div class="mb-4">{children}</div>
      </div>
      <button
        onClick={onClose}
        class="absolute top-0 right-0 mt-4 mr-4 p-2 rounded-full bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

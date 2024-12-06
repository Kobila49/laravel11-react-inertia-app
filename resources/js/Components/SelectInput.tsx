import { forwardRef, useRef, LegacyRef, ReactNode } from "react";

interface SelectInputProps {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export default forwardRef(function SelectInput(
  { className = "", children, ...props }: SelectInputProps,
  ref: LegacyRef<HTMLSelectElement>
) {
  const input = ref ? ref : useRef<HTMLSelectElement>(null);

  return (
    <select
      {...props}
      className={
        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
        className
      }
      ref={input}
    >
      {children}
    </select>
  );
});

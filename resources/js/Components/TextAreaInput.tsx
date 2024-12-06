import {
  forwardRef,
  useEffect,
  useRef,
  ForwardedRef,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  isFocused?: boolean;
  children?: ReactNode;
}

export default forwardRef(function TextAreaInput(
  { className = "", isFocused = false, children, ...props }: TextAreaInputProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const input = ref ? ref : useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isFocused) {
      // @ts-ignore
      input.current?.focus();
    }
  }, [isFocused]);

  return (
    <textarea
      {...props}
      className={
        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
        className
      }
      ref={input}
    >
      {children}
    </textarea>
  );
});

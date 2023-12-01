import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef(
  ({ label, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <>
        <label className="block text-gray-400 mb-2">{label}</label>
        <input
          className="bg-gray-700 text-white border-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...rest}
          ref={ref}
        />
      </>
    );
  }
);
export default Input;

type FormErrorMessageProps = {
  children: React.ReactNode;
};

const FormErrorMessage = ({ children }: FormErrorMessageProps) => {
  return <p className="text-red-300 text-sm">{children}</p>;
};
export default FormErrorMessage;

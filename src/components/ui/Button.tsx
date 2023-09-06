import { CgSpinner } from "react-icons/cg";
interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  // [x:string]:any
}

export const AppButton = ({
  children,
  isLoading,
  ...props
}: AppButtonProps) => {
  return (
    <button
      disabled={isLoading}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 h-10"
      {...props}
    >
      {!isLoading ? children : <CgSpinner className="animate-spin" />}
    </button>
  );
};

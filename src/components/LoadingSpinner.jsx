import { twMerge } from "tailwind-merge";

const LoadingSpinner = ({ className }) => {
  return (
    <span
      className={twMerge(
        "inline-block h-10 w-10 animate-spin rounded-full border-4 border-primary border-b-transparent",
        className,
      )}
    ></span>
  );
};

export default LoadingSpinner;

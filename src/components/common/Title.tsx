import clsx from "clsx";

export interface ITitleProps {
  text: string;
  className?: string;
  isCenter?: boolean;
}

const Title = ({ text, className, isCenter }: ITitleProps) => {
  return (
    <div>
      <h1 className={clsx("text-2xl font-semibold", className, isCenter && "text-center")}>{text}</h1>
    </div>
  );
};

export default Title;

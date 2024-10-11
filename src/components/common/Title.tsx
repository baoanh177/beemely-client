export interface ITitleProps {
  text: string;
}

const Title = ({ text }: ITitleProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{text}</h1>
    </div>
  );
};

export default Title;

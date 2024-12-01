import { ImSpinner10 } from "react-icons/im";
const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ImSpinner10 className="animate-spin" size={40} />
    </div>
  );
};

export default Loading;

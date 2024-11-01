import { Container } from "@/styles/common-styles";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <Container className="flex items-center justify-center p-20">
      <Loader className="animate-spin" size={40} />
    </Container>
  );
};

export default Loading;

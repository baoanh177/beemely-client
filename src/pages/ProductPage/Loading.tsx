import { Container } from "@/styles/common-styles";
import { Skeleton } from "antd";

const Loading = () => {
  return (
    <Container className="mt-20 grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <div className="space-y-8">
        <Skeleton className="w-full" active />
        <Skeleton className="w-full" active />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-full" active />
        <Skeleton className="w-full" active />
      </div>
    </Container>
  );
};

export default Loading;

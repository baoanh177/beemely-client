import { Container } from "@/styles/common-styles";

const Skeleton: React.FC = () => (
  <div className="flex w-full max-w-md flex-col items-center gap-4">
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-20%" />
  </div>
);

const Loading = () => {
  return (
    <Container className="flex items-center justify-center p-20">
      <Skeleton />
    </Container>
  );
};

export default Loading;

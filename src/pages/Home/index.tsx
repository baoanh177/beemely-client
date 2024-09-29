import { Container } from "@/styles/common-styles";
import tw from "twin.macro";
import Button from "@/components/common/Button";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { logout } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";

const Title = tw.h1`text-3xl font-semibold text-center`;

const Home = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");
  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Bạn đã đăng xuất!",
        navigate: "/auth/login",
      },
      error: {
        message: state.message,
      },
    },
  });
  return (
    <Container tw="pt-[200px]">
      <Title>React + Typescript + Twin.macro + Antd</Title>
      {state.isLogin && (
        <Button
          type="button"
          text="Logout"
          className="mx-auto mt-9"
          onClick={() => {
            dispatch(logout());
          }}
        />
      )}
    </Container>
  );
};

export default Home;

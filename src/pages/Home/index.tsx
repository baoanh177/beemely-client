import Button from "@/components/common/Button";
import { Container } from "@/styles/common-styles";
import tw from "twin.macro";
import secretSound from "@/assets/sounds/secret.mp3";
import { useRef } from "react";

const Title = tw.h1`text-3xl font-semibold text-center`;

const Home = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <Container tw="pt-[200px]">
      <Title>React + Typescript + Twin.macro + Antd</Title>
      <audio src={secretSound} ref={audioRef} />
      <Button
        className="mx-auto mt-9"
        onClick={() => {
          audioRef.current?.play();
        }}
      >
        Make me laugh!
      </Button>
    </Container>
  );
};

export default Home;

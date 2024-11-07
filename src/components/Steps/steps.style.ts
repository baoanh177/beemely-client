import tw, { styled } from "twin.macro";

export const StepWrapper = tw.div`flex justify-between`;

export const IconWrapper = styled.div(({ active }: { active?: boolean }) => [
  tw`flex h-10 w-10 items-center justify-center rounded-lg`,
  active ? tw`bg-primary-600 text-white-90%` : tw`bg-white-5% text-primary-600`,
]);

export const Step = tw.div`relative flex flex-col items-center gap-3 w-10 cursor-pointer select-none`;

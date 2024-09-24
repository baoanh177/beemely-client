import { ButtonText, ButtonWrapper, IconWrapper } from "./button.style";
import { ButtonType } from "./button.type";

const Button = ({ children, icon, ...props }: ButtonType) => {
  return (
    <>
      <ButtonWrapper {...props}>
        <ButtonText children={children} />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </ButtonWrapper>
    </>
  );
};

export default Button;

import { Fragment, useMemo } from "react";
import { IconWrapper, Step, StepWrapper } from "./steps.style";
import { IProps } from "./steps.type";
import clsx from "clsx";

const Steps = ({ items }: IProps) => {
  const mappingItems = useMemo(() => {
    let activeIndex = 0;
    items.forEach((item, index) => {
      if (item.active) activeIndex = index;
    });
    return items.map((item, index) => (index < activeIndex ? { ...item, active: true } : item));
  }, [items]);

  return (
    <>
      <StepWrapper>
        {mappingItems.map((item, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && (
                <div className={clsx("mx-1 mt-5 grow border-t border-dashed", item.active ? "border-primary-600" : "border-white-5%")}></div>
              )}
              <Step onClick={() => item.onClick && item.onClick()}>
                <IconWrapper active={item.active}>{item.icon}</IconWrapper>
                <div className="text-nowrap">{item.title}</div>
              </Step>
            </Fragment>
          );
        })}
      </StepWrapper>
    </>
  );
};

export default Steps;

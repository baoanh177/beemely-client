import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { PiPlus } from "react-icons/pi";
import { RxDividerHorizontal } from "react-icons/rx";

import Button from "./Button";
import tw from "twin.macro";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  disabled?: boolean;
}

const Wrapper = tw.div`flex max-w-[130px] items-center space-x-2 rounded-lg border`;

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange, max = 10, min = 1, disabled }) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedOnChange = useCallback(
    debounce((newValue: number) => {
      onChange(newValue);
    }, 300),
    [onChange],
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setLocalValue(newValue);
      debouncedOnChange(newValue);
    }
  };

  const handleDecrease = () => {
    if (localValue > min) {
      handleChange(localValue - 1);
    }
  };

  const handleIncrease = () => {
    if (localValue < max) {
      handleChange(localValue + 1);
    }
  };

  return (
    <Wrapper>
      <Button
        icon={<RxDividerHorizontal size={16} />}
        onClick={handleDecrease}
        isDisabled={localValue <= min || disabled}
        className="shrink bg-transparent p-0"
        variant="secondary"
      />
      <div className="w-8 text-center font-medium">{localValue}</div>
      <Button
        icon={<PiPlus size={16} />}
        onClick={handleIncrease}
        isDisabled={localValue >= max || disabled}
        className="shrink bg-transparent p-0"
        variant="secondary"
      />
    </Wrapper>
  );
};

export default QuantityInput;

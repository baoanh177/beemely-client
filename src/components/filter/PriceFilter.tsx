import React from "react";
import tw from "twin.macro";
import { Slider } from "antd";

const Container = tw.div`flex flex-col`;

const PriceFilter: React.FC = () => {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 25000]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <Container>
      <p tw="mt-2">
        Price: ${priceRange[0]} - ${priceRange[1]}
      </p>
      <Slider range min={0} max={25000} defaultValue={priceRange} onChange={handlePriceChange} />
    </Container>
  );
};

export default PriceFilter;

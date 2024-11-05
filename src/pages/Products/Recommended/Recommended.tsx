import React, { useEffect } from "react";
import { Typography } from "antd";
import { IGenderInitialState } from "@/services/store/gender/gender.slice";
import { useArchive } from "@/hooks/useArchive";
import { getAllGender } from "@/services/store/gender/gender.thunk";
import { Lightbulb } from "lucide-react";

const { Title } = Typography;

interface RecommendedProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Recommended: React.FC<RecommendedProps> = ({ handleClick }) => {
  const { state, dispatch } = useArchive<IGenderInitialState>("genders");
  const { genders } = state;

  useEffect(() => {
    dispatch(getAllGender());
  }, [dispatch]);

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="text-lg text-blue-500" />
        <Title level={5} className="text-gray-800 m-0">
          Gợi ý cho bạn
        </Title>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleClick}
          value=""
          className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Tất cả sản phẩm
        </button>
        {genders.map((gender) => (
          <button
            key={gender.id}
            onClick={handleClick}
            value={gender.name.trim()}
            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {gender.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Recommended;

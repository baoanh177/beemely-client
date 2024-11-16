import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { IGenderInitialState } from "@/services/store/gender/gender.slice";
import { useArchive } from "@/hooks/useArchive";
import { getAllGender } from "@/services/store/gender/gender.thunk";
import { Lightbulb } from "lucide-react";
import clsx from "clsx";

const { Title } = Typography;

interface RecommendedProps {
  onSelectGender: (gender: string) => void;
}

const Recommended: React.FC<RecommendedProps> = ({ onSelectGender }) => {
  const { state, dispatch } = useArchive<IGenderInitialState>("genders");
  const { genders } = state;
  const [selectedGender, setSelectedGender] = useState<string>("");

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
          value=""
          className={clsx(
            "rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
            {
              "bg-dark-500 text-white-500": selectedGender.length === 0,
              "bg-white-500 text-primary-90% hover:bg-gray-10%": selectedGender.length > 0,
            },
          )}
        >
          Tất cả sản phẩm
        </button>
        {genders.map((gender) => (
          <button
            key={gender.id}
            value={gender.name.trim()}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
              {
                "bg-dark-500 text-white-500": selectedGender.includes(gender.name.trim()),
                "bg-white-500 text-primary-90% hover:bg-gray-20%": !selectedGender.includes(gender.name.trim()),
              },
            )}
          >
            {gender.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Recommended;

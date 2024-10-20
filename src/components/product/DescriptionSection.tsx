import { useState } from "react";

interface DescriptionSectionProps {
  content: string;
}

const DescriptionSection = ({ content }: DescriptionSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-muted-foreground relative text-sm">
      <div className={`${isExpanded ? "" : "line-clamp-3"} transition-all duration-300 ease-in-out`}>{content}</div>
      {content.length > 150 && (
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-primary mt-2 hover:underline focus:outline-none">
          {isExpanded ? "Ẩn bớt" : "Xem thêm"}
        </button>
      )}
    </div>
  );
};

export default DescriptionSection;

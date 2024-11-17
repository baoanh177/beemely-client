import Title from "antd/es/typography/Title";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SidebarSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="filter-section mb-4">
      <div className="flex cursor-pointer items-center justify-between gap-2 py-4" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2">
          {icon}
          <Title level={5} className="text-gray-800 m-0">
            {title}
          </Title>
        </div>
        <span>{isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
      </div>
      {isExpanded && children}
    </div>
  );
};

export default SidebarSection;

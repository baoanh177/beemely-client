import React from "react";
import { Pagination as AntPagination } from "antd";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ current, pageSize, total, onChange, className = "" }) => {
  const itemRender = (
    _: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode,
  ): React.ReactNode => {
    if (type === "prev") {
      return (
        <button className="flex items-center justify-center px-3 py-1.5 text-sm hover:text-blue-600">
          <ChevronLeft size={18} className="mr-1" />
          Trước
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="flex items-center justify-center px-3 py-1.5 text-sm hover:text-blue-600">
          Tiếp
          <ChevronRight size={18} className="ml-1" />
        </button>
      );
    }
    if (type === "jump-prev" || type === "jump-next") {
      return (
        <button className="flex items-center justify-center px-2 py-1.5 text-gray-500 hover:text-blue-600">
          {type === "jump-prev" ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
        </button>
      );
    }
    return originalElement;
  };

  return (
    <div className={`flex justify-end ${className}`}>
      <div className="inline-flex items-center rounded-lg bg-white-500 p-2 shadow-md">
        <AntPagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
          itemRender={itemRender}
          showSizeChanger={false}
          className="custom-pagination"
        />
      </div>
      <style>{`
        .custom-pagination.ant-pagination {
          display: flex;
          align-items: center;
        }

        .custom-pagination .ant-pagination-item {
          border: none;
          background: transparent;
          margin: 0 2px;
        }

        .custom-pagination .ant-pagination-item a {
          color: #4b5563;
          font-size: 0.875rem;
          padding: 4px 12px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .custom-pagination .ant-pagination-item:hover a {
          color: #2563eb;
          background: #eff6ff;
        }

        .custom-pagination .ant-pagination-item-active a {
          color: #ffffff;
          background: #000000;
        }

        .custom-pagination .ant-pagination-item-active:hover a {
          color: #ffffff;
          background: #131118;
        }

        .custom-pagination .ant-pagination-prev,
        .custom-pagination .ant-pagination-next {
          border: none;
          background: transparent;
        }

        .custom-pagination .ant-pagination-prev:hover button,
        .custom-pagination .ant-pagination-next:hover button {
          color: #2563eb;
          background: transparent;
        }

        .custom-pagination .ant-pagination-disabled button {
          color: #d1d5db;
        }

        .custom-pagination .ant-pagination-disabled:hover button {
          color: #d1d5db;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default Pagination;

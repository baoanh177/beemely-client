import { useState, useCallback } from "react";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState, updateFilters } from "@/services/store/product/product.slice";
import { Filter, FilterChangeHandler } from "@/services/store/product/product.model";

export const useFilters = () => {
  const initialFilters: Filter = {
    gender: [],
    productType: [],
    color: [],
    size: [],
    brand: [],
    orderBy: "createdAt",
    sort: "desc",
    minPrice: "0",
    maxPrice: "10000000",
    label: "",
    tag: "",
  };

  const [filters, setFilters] = useState<Filter>(initialFilters);
  const { dispatch } = useArchive<IProductInitialState>("products");

  const handleFilterChange = useCallback(
    ({ type, value }: FilterChangeHandler) => {
      setFilters((prev) => ({
        ...prev,
        [type]: value,
      }));
      dispatch(updateFilters({ [type]: value }));
    },
    [dispatch],
  );

  const cleanQueryParams = useCallback((query: Record<string, any>) => {
    const defaultValues = ["", "0", "10000000", undefined];
    return Object.fromEntries(Object.entries(query).filter(([_, value]) => !defaultValues.includes(value)));
  }, []);

  const getQueryParams = useCallback(() => {
    return cleanQueryParams({
      ...filters,
      gender: filters.gender.length ? filters.gender.join(",") : undefined,
      productType: filters.productType.length ? filters.productType.join(",") : undefined,
      color: filters.color.length ? filters.color.join(",") : undefined,
      brand: filters.brand.length ? filters.brand.join(",") : undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      label: filters.label,
      tag: filters.tag,
    });
  }, [filters, cleanQueryParams]);

  return {
    filters,
    handleFilterChange,
    getQueryParams,
  };
};

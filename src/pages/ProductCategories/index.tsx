import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import SortControls from "./components/SortControls";
import ProductList from "./Products/ProductList";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState, updateFilters } from "@/services/store/product/product.slice";
import { Container } from "@/styles/common-styles";
import { getAllProducts } from "@/services/store/product/product.thunk";
import { useMediaQuery } from "react-responsive";
import { X } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { IProductTypeInitialState } from "@/services/store/product-type/product-type.slice";
import { getAllProductTypes } from "@/services/store/product-type/product-type.thunk";

function ProductCategories() {
  const { slug } = useParams<{ slug: string }>();
  const { state, dispatch } = useArchive<IProductInitialState>("products");
  const { state: stateProductTypes, dispatch: dispatchProductTypes } = useArchive<IProductTypeInitialState>("productTypes");
  const { productTypes } = stateProductTypes;
  const { products, totalRecords } = state;

  const [productTypeId, setProductTypeId] = useState<string | null>(null);

  useEffect(() => {
    dispatchProductTypes(getAllProductTypes({}));
  }, [dispatchProductTypes]);

  useEffect(() => {
    if (productTypes.length > 0 && slug) {
      const matchedProductType = productTypes.find((type) => type.slug === slug);
      if (matchedProductType) {
        setProductTypeId(matchedProductType.id);
      }
    }
  }, [productTypes, slug]);

  const [showFilters, setShowFilters] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [, setSearchParams] = useSearchParams();

  const initialFilters = {
    _page: 1,
    _limit: 9,
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

  const [filters, setFilters] = useState(initialFilters);

  const cleanQueryParams = useCallback((query: { [key: string]: any }) => {
    return Object.fromEntries(Object.entries(query).filter(([_, v]) => v !== undefined && v !== "" && v !== "0" && v !== "10000000"));
  }, []);

  useEffect(() => {
    if (productTypeId) {
      const query = cleanQueryParams({
        _page: filters._page,
        _limit: filters._limit,
        gender: filters.gender.length ? filters.gender.join(",") : undefined,
        color: filters.color.length ? filters.color.join(",") : undefined,
        brand: filters.brand.length ? filters.brand.join(",") : undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        label: filters.label || undefined,
        tag: filters.tag || undefined,
        orderBy: filters.orderBy,
        sort: filters.sort,
        productType: productTypeId,
      });

      dispatch(getAllProducts({ query }));
    }
  }, [filters, productTypeId, dispatch, cleanQueryParams]);

  useEffect(() => {
    if (productTypeId) {
      setSearchParams({});
    }
  }, [productTypeId, setSearchParams]);

  const handleFilterChange = useCallback(
    (type: string, value: string | string[]) => {
      setFilters((prev) => ({
        ...prev,
        [type]: value,
      }));
      dispatch(updateFilters({ [type]: value }));
    },
    [dispatch],
  );

  const handleGenderSelect = useCallback(
    (selectedGenders: string[]) => {
      handleFilterChange("gender", selectedGenders);
    },
    [handleFilterChange],
  );

  const handleSortChange = useCallback(
    (orderBy: string, sort: string) => {
      handleFilterChange("orderBy", orderBy);
      handleFilterChange("sort", sort);
    },
    [handleFilterChange],
  );

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      _page: page,
    }));
  };

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  const closeMobileSidebar = () => {
    setShowMobileSidebar(false);
  };

  return (
    <div className="products-page">
      <Container>
        <div className="mb-8 flex flex-col md:flex-row">
          {!isMobile && (
            <div className={`transition-all duration-300 ease-in-out ${showFilters ? "w-3/12 opacity-100" : "w-0 overflow-hidden opacity-0"}`}>
              <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                showMobileSidebar={showMobileSidebar}
                onCloseMobileSidebar={closeMobileSidebar}
                showWidthFull={showFilters}
              />
            </div>
          )}
          <div className={`${showFilters && !isMobile ? "w-9/12" : "w-full"}`}>
            <div className="flex items-center justify-between">
              <Recommended onSelectGender={handleGenderSelect} />
              <SortControls
                onSortChange={handleSortChange}
                currentSort={filters.sort}
                currentOrderBy={filters.orderBy}
                showFilters={showFilters}
                onToggleFiltersDesktop={toggleFilters}
                onToggleFilters={toggleMobileSidebar}
              />
            </div>

            {products.length > 0 ? (
              <>
                <ProductList products={products} />
                <div className="mt-4 flex justify-end">
                  <Pagination
                    current={filters._page}
                    pageSize={filters._limit}
                    total={totalRecords || 0}
                    onChange={handlePageChange}
                    className="mt-6"
                  />
                </div>
              </>
            ) : (
              <div className="flex h-full justify-center">
                <p className="text-gray-500">Không có sản phẩm nào được tìm thấy.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
      {isMobile && (
        <>
          <div
            className={`fixed inset-0 z-50 bg-dark-90%/50 transition-opacity duration-300 ${showMobileSidebar ? "opacity-100" : "pointer-events-none opacity-0"}`}
            onClick={closeMobileSidebar}
          />
          <div
            className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-white-500 shadow-lg transition-transform duration-500 ease-in-out ${showMobileSidebar ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={closeMobileSidebar} className="hover:bg-gray-100 rounded-full p-2" aria-label="Close filters">
                <X size={24} />
              </button>
            </div>

            <div className="h-[calc(100vh-64px)] overflow-y-auto p-4">
              <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                showMobileSidebar={showMobileSidebar}
                onCloseMobileSidebar={closeMobileSidebar}
                showWidthFull={true}
              />
            </div>

            <div className="border-t p-4">
              <button onClick={closeMobileSidebar} className="bg-black text-white hover:bg-gray-800 w-full rounded-md py-2">
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductCategories;

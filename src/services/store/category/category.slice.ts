import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "./category.model";
import { getAllCategories } from "./category.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";

export interface ICategoryInitialState extends IInitialState {
  categories: ICategory[];
  activeCategory: ICategory | undefined;
}

const initialState: ICategoryInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  categories: [],
  activeCategory: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    ...commonStaticReducers<ICategoryInitialState>(),
  },
  extraReducers(builder) {
    // Get all categories
    builder.addCase(getAllCategories.fulfilled, (state, { payload }: PayloadAction<IResponse<ICategory[]>>) => {
      state.categories = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
  },
});

export const { resetStatus, setFilter } = categorySlice.actions;
export { categorySlice };

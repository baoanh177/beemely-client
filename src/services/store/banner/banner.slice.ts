import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBanner } from "./banner.model";
import { getAllBanners } from "./banner.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";

export interface IBannerInitialState extends IInitialState {
  banners: IBanner[];
  activeBanner: IBanner | undefined;
}

const initialState: IBannerInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  banners: [],
  activeBanner: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    ...commonStaticReducers<IBannerInitialState>(),
  },
  extraReducers(builder) {
    // Get all banners
    builder.addCase(getAllBanners.fulfilled, (state, { payload }: PayloadAction<IResponse<IBanner[]>>) => {
      state.banners = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
  },
});

export const { resetStatus, setFilter } = bannerSlice.actions;
export { bannerSlice };

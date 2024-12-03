import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IGHNApiRegsponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllProvinces, getDistrictsByProvinceId, getWardsByDistrictId } from "./location.thunk";

export interface ILocationInitialState extends IInitialState {
  provinces: IProvince[] | null;
  districts: IDistrict[] | null;
  wards: IWard[] | null;
  location: {
    province: IProvince | null;
    district: IDistrict | null;
    ward: IWard | null;
  };
}
interface ErrorPayload {
  message: string;
}

const initialState: ILocationInitialState = {
  status: EFetchStatus.IDLE,
  provinces: null,
  districts: null,
  wards: null,
  message: "",
  location: {
    province: null,
    district: null,
    ward: null,
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    resetLocationState: (state) => {
      state.location = initialState.location;
    },
    setProvince: (state, action: PayloadAction<IProvince>) => {
      state.location.province = action.payload;
      state.location.district = null;
      state.location.ward = null;
      state.districts = null;
      state.wards = null;
    },
    setDistrict: (state, action: PayloadAction<IDistrict>) => {
      state.location.district = action.payload;
      state.location.ward = null;
      state.wards = null;
    },
    setWard: (state, action: PayloadAction<IWard>) => {
      state.location.ward = action.payload;
    },
  },
  extraReducers(builder) {
    // Lấy tất cả tỉnh
    builder
      .addCase(getAllProvinces.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getAllProvinces.fulfilled, (state, { payload }: PayloadAction<IGHNApiRegsponse<IProvince[]>>) => {
        state.provinces = payload.data;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getAllProvinces.rejected, (state, { payload }) => {
        state.status = EFetchStatus.REJECTED;
        const errorPayload = payload as ErrorPayload;
        state.message = errorPayload.message || "Something went wrong!";
      })
      // Lấy quận theo province_id
      .addCase(getDistrictsByProvinceId.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getDistrictsByProvinceId.fulfilled, (state, { payload }: PayloadAction<IGHNApiRegsponse<IDistrict[]>>) => {
        state.districts = payload.data;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getDistrictsByProvinceId.rejected, (state, { payload }) => {
        state.status = EFetchStatus.REJECTED;
        console.log(payload);
        const errorPayload = payload as ErrorPayload;
        state.message = errorPayload.message || "Something went wrong!";
      })
      // Lấy phường theo district_id
      .addCase(getWardsByDistrictId.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getWardsByDistrictId.fulfilled, (state, { payload }: PayloadAction<IGHNApiRegsponse<IWard[]>>) => {
        state.wards = payload.data;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getWardsByDistrictId.rejected, (state, { payload }) => {
        state.status = EFetchStatus.REJECTED;
        const errorPayload = payload as ErrorPayload;
        state.message = errorPayload.message || "Something went wrong!";
      });
  },
});

export const { resetLocationState, setDistrict, setWard, setProvince } = locationSlice.actions;
export { locationSlice };

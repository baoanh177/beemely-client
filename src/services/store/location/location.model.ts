interface IWard {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  NameExtension: string[];
  IsEnable: number;
  CanUpdateCOD: boolean;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  SupportType: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: any;
  WhiteListWard: any;
  Status: number;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: null;
  UpdatedEmployee: number;
  UpdatedDate: string;
}

interface IDistrict {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  CanUpdateCOD: boolean;
  Status: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: any;
  WhiteListDistrict: any;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: null;
  CreatedIP: string;
  CreatedEmployee: number;
  CreatedSource: string;
  CreatedDate: string;
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}

interface IProvince {
  ProvinceID: number;
  ProvinceName: string;
  CountryID: number;
  Code: string;
  NameExtension: string[];
  IsEnable: number;
  RegionID: number;
  RegionCPN: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  AreaID: number;
  CanUpdateCOD: boolean;
  Status: number;
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}

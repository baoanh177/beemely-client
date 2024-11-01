import { provinces } from "@/data/provinces";

export const getProvinceOptions = () => {
  return provinces.map((province) => ({ value: province.idProvince, label: province.name }));
};

export const getDistrictOptions = (idProvince: string) => {
  const activeProvince = provinces.find((province) => province.idProvince === idProvince);
  return activeProvince ? activeProvince?.districts?.map((district) => ({ value: district.idDistrict, label: district.name })) : [];
};

export const getCommuneOptions = (idProvince: string, idDistrict: string) => {
  const activeProvince = provinces.find((province) => province.idProvince === idProvince);
  const activeDistrict = activeProvince?.districts.find((district) => district.idDistrict === idDistrict);
  return activeDistrict ? activeDistrict.communes.map((commune) => ({ value: commune.idCommune, label: commune.name })) : [];
};

export const getAddress = (provinceId: string, districtId: string, communeId: string) => {
  const activeProvince = provinces.find((province) => province.idProvince === provinceId);
  const activeDistrict = activeProvince?.districts.find((district) => district.idDistrict === districtId);
  const activeComune = activeDistrict?.communes.find((commune) => commune.idCommune === communeId);
  return `${activeComune?.name}, ${activeDistrict?.name}, ${activeProvince?.name}`;
};

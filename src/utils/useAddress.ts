import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import http from 'services/http';

interface OptionsType {
  value: any;
  label: string;
}

interface AddressField {
  tinh: string;
  huyen: string;
  xa: string;
  diaChi: string;
  latitude: number | null;
  longitute: number | null;
  loaiCuTruId?: number;
  tuNgay?: string | null;
  denNgay?: string | null;
}

interface UseAddressSelectorProps {
  prefix: string; // Tiền tố trường (ví dụ: "noiThuongTru", "noiTamTru")
  tinhOptions: { value: string; label: string }[]; // Danh sách tỉnh
  watch: UseFormWatch<any>; // Hàm watch từ react-hook-form
  setValue: UseFormSetValue<any>; // Hàm setValue từ react-hook-form
}

interface AddressSelectorReturn {
  huyenOptions: { value: string; label: string }[];
  xaOptions: { value: string; label: string }[];
  watchedTinh: string;
  watchedHuyen: string;
}

export const useAddressSelector = ({
  prefix,
  tinhOptions,
  watch,
  setValue,
}: UseAddressSelectorProps): AddressSelectorReturn => {
  const [huyenOptions, setHuyenOptions] = useState<{ value: string; label: string }[]>([]);
  const [xaOptions, setXaOptions] = useState<{ value: string; label: string }[]>([]);

  const watchedTinh = watch(`${prefix}.tinh`);
  const watchedHuyen = watch(`${prefix}.huyen`);

  // Gọi API lấy danh sách huyện khi tỉnh thay đổi
  useEffect(() => {
    const fetchDistricts = async () => {
      if (watchedTinh) {
        try {
          const response = await http.get<any>(`/huyen/tinh/${watchedTinh}`);
          const districts = response.data.map((item: any) => ({
            value: item.maHuyen,
            label: item.tenHuyen,
          }));
          setHuyenOptions(districts);
          setValue(`${prefix}.huyen`, '');
          setValue(`${prefix}.xa`, '');
          setXaOptions([]);
        } catch (error) {
          console.error(`Lỗi khi lấy danh sách huyện (${prefix}):`, error);
        }
      }
    };
    fetchDistricts();
  }, [watchedTinh, setValue, prefix]);

  // Gọi API lấy danh sách xã khi huyện thay đổi
  useEffect(() => {
    const fetchWards = async () => {
      if (watchedHuyen) {
        try {
          const response = await http.get<any>(`/xa/huyen/${watchedHuyen}`);
          const wards = response.data.map((item: any) => ({
            value: item.maXa,
            label: item.tenXa,
          }));
          setXaOptions(wards);
          setValue(`${prefix}.xa`, '');
        } catch (error) {
          console.error(`Lỗi khi lấy danh sách xã (${prefix}):`, error);
        }
      }
    };
    fetchWards();
  }, [watchedHuyen, setValue, prefix]);

  return {
    huyenOptions,
    xaOptions,
    watchedTinh,
    watchedHuyen,
  };
};

interface AddressSelectorWithoutPrefixReturn {
  huyenOptions: { value: string; label: string }[];
  xaOptions: { value: string; label: string }[];
  watchedTinh: string;
  watchedHuyen: string;
}

interface UseAddressSelectorWithoutPrefixProps {
  tinhOptions: { value: string; label: string }[];
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export const useAddressSelectorWithoutPrefix = ({
  tinhOptions,
  watch,
  setValue,
}: UseAddressSelectorWithoutPrefixProps): AddressSelectorWithoutPrefixReturn => {
  const [huyenOptions, setHuyenOptions] = useState<{ value: string; label: string }[]>([]);
  const [xaOptions, setXaOptions] = useState<{ value: string; label: string }[]>([]);

  const watchedTinh = watch('maTinh');
  const watchedHuyen = watch('maHuyen');

  // Gọi API lấy danh sách huyện khi tỉnh thay đổi
  useEffect(() => {
    const fetchDistricts = async () => {
      if (watchedTinh) {
        try {
          const response = await http.get<any>(`/huyen/tinh/${watchedTinh}`);
          const districts = response.data.map((item: any) => ({
            value: item.maHuyen,
            label: item.tenHuyen,
          }));
          setHuyenOptions(districts);
          setValue('maHuyen', ''); // Reset huyện khi tỉnh thay đổi
          setValue('maXa', ''); // Reset xã khi tỉnh thay đổi
          setXaOptions([]); // Reset danh sách xã
        } catch (error) {
          console.error('Lỗi khi lấy danh sách huyện:', error);
        }
      }
    };
    fetchDistricts();
  }, [watchedTinh, setValue]);

  // Gọi API lấy danh sách xã khi huyện thay đổi
  useEffect(() => {
    const fetchWards = async () => {
      if (watchedHuyen) {
        try {
          const response = await http.get<any>(`/xa/huyen/${watchedHuyen}`);
          const wards = response.data.map((item: any) => ({
            value: item.maXa,
            label: item.tenXa,
          }));
          setXaOptions(wards);
          setValue('maXa', ''); // Reset xã khi huyện thay đổi
        } catch (error) {
          console.error('Lỗi khi lấy danh sách xã:', error);
        }
      }
    };
    fetchWards();
  }, [watchedHuyen, setValue]);

  return {
    huyenOptions,
    xaOptions,
    watchedTinh,
    watchedHuyen,
  };
};

export const useResidentAddress = (prefix: string, tinhs: OptionsType[], watch: any, setValue: any) => {
  const { huyenOptions, xaOptions, watchedTinh, watchedHuyen } = useAddressSelector({
    prefix,
    tinhOptions: tinhs,
    watch,
    setValue,
  });

  return {
    huyenOptions,
    xaOptions,
    watchedTinh,
    watchedHuyen,
  };
};

export const formatAddress = (data?: any) => {
  if (!data) return '';
  return [data.diaChi, data.tenAp, data.tenXa, data.tenHuyen, data.tenTinh].filter(Boolean).join(', ');
};

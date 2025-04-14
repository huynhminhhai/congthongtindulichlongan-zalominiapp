import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import http from 'services/http';
import { useNavigate, useSnackbar } from 'zmp-ui';

const endpointAPI1022Petition = 'https://api1022.longan.gov.vn/pe/petition';
const endpointAPI1022 = 'https://api1022.longan.gov.vn';
const endpointSSO122 = 'https://sso1022.longan.gov.vn';
const endpointLongAnSo = 'https://longanso.com';

var auth = {
  access_token: '',
  expires_in: 0,
  refresh_expires_in: 0,
  token_type: 'Bearer',
  'not-before-policy': 1652317578,
  scope: 'email profile',
  configreq: {},
};

export async function getToken() {
  if (auth?.expires_in > 0) {
    return;
  }
  const formData = new FormData();
  formData.append('Authorization', '$WpKz#lH3d7E%uN81');
  const response = await axios.post(`/AppLAS/Miniapps/TokenPetition`, formData);
  auth = {
    ...response?.data?.result,
    configreq: { headers: { Authorization: 'Bearer ' + response?.data?.result?.access_token } },
  };
  console.log(auth);

  return auth;
}

export async function getTokenPetition() {
  const data = {
    client_id: 'svc-chatbot-ic',
    client_secret: '7370dbba-a62b-40a9-9fce-84ff45097679',
    grant_type: 'client_credentials',
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const response = await axios.post(
    `/auth/realms/digo/protocol/openid-connect/token`,
    new URLSearchParams(data).toString(),
    config
  );
  auth = response?.data;
  console.log(auth);
}

export function convertPetitionBody(petition: any, listFile: any, ccDiaChiUser: any) {
  let diaChiUser: any = null;

  if (ccDiaChiUser) {
    diaChiUser = {
      address: petition?.reporter_address_fullAddress?.trim(),
      place: [petition?.reporter_address_village, petition?.reporter_address_town, petition?.reporter_address_province],
    };
  }

  return {
    typeRequestName: '',
    reporterLocation: {},
    tag: {
      id: petition?.tag?.value,
      integratedCode: null,
      primaryColor: null,
      parentId: petition?.tag_parent,
      name: petition?.tag?.label,
    },
    reporter: {
      fullname: petition?.reporter_fullname?.trim(),
      phone: petition?.reporter_phone?.trim(),
      identityId: petition?.reporter_identityId?.trim(),
      type: 1,
      address: diaChiUser,
      username: '+84' + petition?.reporter_phone?.trim()?.substring(1),
    },
    takePlaceOn: petition?.takePlaceOn,
    description: petition?.description?.trim(),
    takePlaceAt: {
      latitude: '',
      longitude: '',
      fullAddress: petition?.fullAddress?.trim(),
      place: [
        petition?.takePlaceVillage,
        petition?.takePlaceTown,
        {
          id: '5def47c5f47614018c000080',
          typeId: '5ee304423167922ac55bea01',
          name: 'Tỉnh Long An',
        },
      ],
    },
    sendSms: false,
    isPublic: petition?.isPublic,
    file: listFile ? listFile : [],
    thumbnailId: getThumbnailId(listFile),
    isAnonymous: petition?.isAnonymous,
    requiredSecret: false,
    receptionMethod: '0004891c4e1bd312a6f00005',
    openAddress: false,
    takePlaceVillage: petition?.takePlaceVillage?.id,
    takePlaceTown: petition?.takePlaceTown?.id,
    takePlaceProvince: '5def47c5f47614018c000080',
    acceptByAgencyAndPlaceEnable: false,
    acceptAgencyId: '',
    captcha: '',
    title: petition?.title?.trim(),
  };
}

function getThumbnailId(listFile: any) {
  let rs = '';
  const imgRegex = /(\.jpg|\.jpeg|\.png)$/i;
  listFile?.forEach(file => {
    if (imgRegex?.test(file?.filename) && !rs) {
      rs = file?.id;
    }
  });
  if (!rs) {
    return '5df0aa1579279af9f7ba1234';
  } else return rs;
}

export const feedbackApiRequest = {
  getFeedbackList: async (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return await http.get<any>(
      `/phananh?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}`
    );
  },
  createFeedback: async (formData: any) => {
    return await axios.post(endpointAPI1022 + '/pe/petition', formData, auth?.configreq);
  },
  getListLinhVuc: async () => {
    return await axios.get(
      endpointAPI1022 + '/bt/tag/--by-parent-id?category-id=5f3a491c4e1bd312a6f00003&page=0&keyword=&sort=order',
      auth?.configreq
    );
  },
  getListChuyenMuc: async (parentId: string) => {
    return await axios.get(
      endpointAPI1022 +
        `/bt/tag/--by-category-id?category-id=5f3a491c4e1bd312a6f00003&parent-id=${parentId}&page=0&keyword=&sort=order`,
      auth?.configreq
    );
  },
  getListTinh: async () => {
    return await axios.get(
      endpointAPI1022 + '/ba/place/--search?nation-id=5f39f4a95224cf235e134c5c&parent-type-id=5ee304423167922ac55bea01',
      auth?.configreq
    );
  },
  uploadFile: async (formData: any) => {
    return await axios.post(endpointAPI1022 + '/fi/file/--multiple', formData, auth?.configreq);
  },
  deleteFile: async (fileID: any) => {
    return await axios.delete(endpointAPI1022 + '/fi/file/' + fileID, auth?.configreq);
  },
  sendOTP: async (phoneNumber: string) => {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);

    return await axios.post(endpointAPI1022 + '/sy/otp', formData, {
      ...auth?.configreq,
      headers: {
        ...(auth?.configreq['headers'] || {}),
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  confirmOTP: async (phoneNumber: string, otp: string) => {
    return await axios.get(
      endpointAPI1022 + '/sy/otp/--confirm?phone-number=' + phoneNumber + '&otp=' + otp,
      auth?.configreq
    );
  },
};

/**
 * GET FEEDBACK LIST
 **/
export const useGetFeedbackListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
  return useQuery({
    queryKey: ['feedbackList', param.page, param.pageSize, param.ApId, param.keyword],
    queryFn: async () => {
      const res = await feedbackApiRequest.getFeedbackList(param);
      return res;
    },
    staleTime: 0,
    retry: 1,
  });
};

/**
 * GET FEEDBACK LIST (INFINITE)
 **/
export const useGetFeedbackList = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
  return useInfiniteQuery({
    queryKey: ['feedbackList', param.pageSize, param.ApId, param.keyword],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const res = await feedbackApiRequest.getFeedbackList({ ...param, page: pageParam });

        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages) => {
      return lastPage.length === param.pageSize ? allPages.length + 1 : undefined;
    },
    staleTime: 0,
    retry: 1,
  });
};

/**
 * POST FEEDBACK
 **/
export const useCreateFeeback = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: any) => {
      return await feedbackApiRequest.createFeedback(formData);
    },
    onSuccess: () => {
      // openSnackbar({
      //   icon: true,
      //   text: 'Gửi phản ánh thành công',
      //   type: 'success',
      //   action: { text: 'Đóng', close: true },
      //   duration: 3000,
      // });

      queryClient.invalidateQueries({ queryKey: ['feedbackList'] });

      // navigate('/feedback');
    },
    onError: (error: string) => {
      openSnackbar({
        icon: true,
        text: `Lỗi: ${error}`,
        type: 'error',
        action: { text: 'Đóng', close: true },
        duration: 3000,
      });
    },
  });
};

/**
 * GET FEEDBACK LINH VUC
 **/
export const useGetFeedbackLinhVuc = (enabled: boolean) => {
  return useQuery({
    queryKey: ['feedbackLinhVuc'],
    queryFn: async () => {
      try {
        const res = await feedbackApiRequest.getListLinhVuc();
        return res;
      } catch (error) {
        console.error('Lỗi khi lấy lĩnh vực phản ánh:', error);
        throw error;
      }
    },
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });
};

/**
 * GET FEEDBACK CHUYEN MUC
 **/
export const useGetFeedbackChuyenMuc = (parentId: string) => {
  return useQuery({
    queryKey: ['feedbackChuyenMuc', parentId],
    queryFn: async () => {
      try {
        const res = await feedbackApiRequest.getListChuyenMuc(parentId);
        return res;
      } catch (error) {
        console.error('Lỗi khi lấy chuyên mục phản ánh:', error);
        throw error;
      }
    },
    enabled: !!parentId,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });
};

/**
 * GET TINH
 **/
export const useGetListTinh = (enabled: boolean) => {
  return useQuery({
    queryKey: ['listTinh'],
    queryFn: async () => {
      try {
        const res = await feedbackApiRequest.getListTinh();
        return res;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tỉnh:', error);
        throw error;
      }
    },
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });
};

/**
 * USE HOOK ADDRESS
 **/
interface UseAddressProps {
  watchedTinh?: string;
  watchedHuyen?: string;
  setValue: (name: string, value: any) => void;
  nameHuyen: string;
  nameXa: string;
}

interface AddressReturn {
  huyenOptions: { value: string; label: string }[];
  xaOptions: { value: string; label: string }[];
  watchedTinh?: string;
  watchedHuyen?: string;
}

export const useAddress = ({
  watchedTinh,
  watchedHuyen,
  setValue,
  nameHuyen,
  nameXa,
}: UseAddressProps): AddressReturn => {
  const [huyenOptions, setHuyenOptions] = useState<{ value: string; label: string }[]>([]);
  const [xaOptions, setXaOptions] = useState<{ value: string; label: string }[]>([]);

  // Gọi API lấy danh sách huyện khi watchedTinh thay đổi
  useEffect(() => {
    const fetchDistricts = async () => {
      if (watchedTinh) {
        try {
          const response = await axios.get(
            endpointAPI1022 +
              '/ba/place/--search?nation-id=5f39f4a95224cf235e134c5c&parent-type-id=5ee304423167922ac55bea02&parent-id=' +
              watchedTinh,
            auth?.configreq
          );
          const districts = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setHuyenOptions(districts);
          setValue(nameHuyen, '');
          setValue(nameXa, '');
          setXaOptions([]);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách huyện:', error);
        }
      } else {
        // Nếu watchedTinh rỗng, reset huyện và xã
        setHuyenOptions([]);
        setXaOptions([]);
        setValue(nameHuyen, '');
        setValue(nameXa, '');
      }
    };
    fetchDistricts();
  }, [watchedTinh, setValue]);

  // Gọi API lấy danh sách xã khi watchedHuyen thay đổi
  useEffect(() => {
    const fetchWards = async () => {
      if (watchedHuyen) {
        try {
          const response = await axios.get(
            endpointAPI1022 +
              '/ba/place/--search?nation-id=5f39f4a95224cf235e134c5c&parent-type-id=5ee304423167922ac55bea03&parent-id=' +
              watchedHuyen,
            auth?.configreq
          );
          const wards = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setXaOptions(wards);
          setValue(nameXa, ''); // Reset xã khi huyện thay đổi
        } catch (error) {
          console.error('Lỗi khi lấy danh sách xã:', error);
        }
      } else {
        // Nếu watchedHuyen rỗng, reset xã
        setXaOptions([]);
        setValue(nameXa, '');
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

import {
  getAccessToken,
  getPhoneNumber,
  getUserInfo,
  nativeStorage,
  openChat,
  openMediaPicker,
  openPermissionSetting,
  openWebview,
} from 'zmp-sdk/apis';

export const openUrlInWebview = async (link: string, style?: 'normal' | 'bottomSheet'): Promise<void> => {
  try {
    await openWebview({
      url: link,
      config: {
        style: style || 'normal',
        leftButton: 'back',
      },
    });
    return Promise.resolve();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const pickMedia = async () => {
  try {
    const { data } = await openMediaPicker({
      type: 'photo',
      serverUploadUrl: 'https://<your-domain-api>/upload/media',
    });
    const result = JSON.parse(data);
    console.log(result);
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export type openChatScreenProps = {
  type?: 'user' | 'oa';
  idUser: any;
  message: string;
};

export const openChatScreen = async ({ type = 'user', idUser, message }: openChatScreenProps): Promise<void> => {
  try {
    await openChat({
      type: type,
      id: idUser,
      message: message,
    });

    return Promise.resolve();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (): Promise<any> => {
  try {
    const { userInfo } = await getUserInfo({});

    return userInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPhoneNumberAccount = async (): Promise<any> => {
  try {
    const { token } = await getPhoneNumber({});

    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAccessTokenAccount = async (): Promise<any> => {
  try {
    const accessToken = await getAccessToken({});

    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const openPermissionSettingApp = async () => {
  try {
    await openPermissionSetting({});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setDataToStorage = async (key: string, value: string) => {
  try {
    await nativeStorage.setItem(key, value);

    // Kiểm tra nếu có lỗi trong quá trình lưu trữ
  } catch (error) {
    console.error(error);
  }
};

export const getDataFromStorage = async (key: string) => {
  try {
    const data = await nativeStorage.getItem(key);

    return data;
  } catch (error) {
    // console.error('Lỗi khi lấy dữ liệu từ storage:', error);
    return null;
  }
};

export const removeDataFromStorage = async (key: string) => {
  try {
    await nativeStorage.removeItem(key);
  } catch (error) {
    // console.error('Lỗi khi xóa dữ liệu khỏi storage:', error);
  }
};

export type AuthResponseType = {
  token: string;
  expiration: string; // ISO string format of date-time
  userId: string;
  username: string;
  email: string;
  roles: string[];
};

export type UserInfoType = {
  userId: number;
  userName: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
};

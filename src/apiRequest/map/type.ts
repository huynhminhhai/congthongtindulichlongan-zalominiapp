export interface MapType {
  id: number;
  name: string;
  address: string;
  lng: string;
  lat: string;
  icon: string | null;
  image: string;
  isShow: boolean | null;
  user: any; // hoặc bạn có thể tạo interface riêng nếu có cấu trúc rõ
  post: any; // tương tự như trên
  displayOrder: number | null;
  dateCreated: string; // ISO 8601 date string
  dateModified: string;
  dateDeleted: string | null;
}

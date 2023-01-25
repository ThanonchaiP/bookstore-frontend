export interface BannerResponse {
  statusCode: number;
  message: string;
  data: Banner[];
}

export interface Banner {
  id: number;
  name: string;
  start: string;
  end: string;
  link: string;
  active: boolean;
  image: string;
}


type RegisterType = {
  email: string;
  name: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

type ResponseDataType = {
  success: boolean;
  data: any;
  message: string;
}
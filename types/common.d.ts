
type RegisterType = {
  email: string;
  name: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

type LoginType = {
  email: string;
  password: string;
}

type ResponseDataType = {
  success: boolean;
  data: any;
  message: string;
}

type TabButtonProp = {
  focused: boolean;
  color: string;
  size: number;
}

type UserData = {
  bio: string | null;
  channel: null;
  date_created: string;
  email: string;
  id: string;
  image: string | null;
  is_active: number;
  name: string;
  role: "user" | "admin";
}
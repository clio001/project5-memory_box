export interface RegisterUser {
  email: string;
  password: string;
}

export interface GetUsers {
  [key: string]: UserAttributes;
}

export interface UserAttributes {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar_url: string;
  banner_url: string;
  location: string;
  role: string;
}

export interface GetUserToken {
  token: string;
}

export type ErrorSeverity = "error" | "success" | "info" | "warning" | undefined;
export type ErrorMessage = "Changes have been saved successfully.";

export interface FormErrors {
  [key: string]: FormErrorsAttributes;
}

export interface FormErrorsAttributes {
  value: string;
  error: boolean;
  errorMessage: string;
}

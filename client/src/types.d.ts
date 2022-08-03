export interface RegisterUser {
email: string
password: string
}

export interface GetUsers {
  [key: string]: UserAttributes;
}
export interface UserAttributes {
	3: any;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar_url: string;
  banner_url: string;
}

export type ErrorSeverity = "error" | "success" | "info" | "warning" | undefined;
export type ErrorMessage = "Changes have been saved successfully."


export interface FormErrors {
	 [key : string] : FormErrorsAttributes
}

export interface FormErrorsAttributes {
    value : string;
    error : boolean;
    errorMessage : string;
}















// export interface IForm{
// 	firstName : firstName,
// 	lastName : lastName,
// 	avatar_url : avatar_url,
// 	banner_url : banner_url,
// }
// export interface FormErrors {
// 	firstName: firstName
// 	lastName: lastName
// 	avatar_url: avatar_url
// 	banner_url: banner_url
// }

// export interface firstName {
//     value: string;
// 	 error: boolean;
// 	 errorMessage: string;
// }
// export interface lastName {
//     value: string;
// 	 error: boolean;
// 	 errorMessage: string;
// }
// export interface avatar_url {
//     value: string;
// 	 error: boolean;
// 	 errorMessage: string;
// }
// export interface banner_url {
//     value: string;
// 	 error: boolean;
// 	 errorMessage: string;
// }

export interface RegisterUser {
email: string
password: string
}

export type Severity = "error" | "success" | "info" | "warning" | undefined;
export type FormState<T> =
  | {
      error?: T;
      message?: string;
    }
  | undefined;

export type Role = "buyer" | "seller";

export type FormState<T> =
  | {
      error?: T;
      message?: string;
    }
  | undefined;

"use client";

import { PropsWithChildren } from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-2" aria-disabled={pending}>
      {pending ? "Submitting..." : children}
    </Button>
  );
};

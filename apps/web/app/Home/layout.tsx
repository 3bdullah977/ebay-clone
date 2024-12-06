import React, { PropsWithChildren } from "react";
import Nav from "./components/nav";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="px-8 py-4 pt-0">
        <Nav />
        {children}
      </div>
    </>
  );
}

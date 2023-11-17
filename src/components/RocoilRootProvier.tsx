"use client";
// recoilRootProvider.tsx

import { RecoilRoot } from "recoil";
export default function RecoilRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

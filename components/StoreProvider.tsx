"use client";

import * as React from "react";
import { AppStore, makeStore } from "@/store/store";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = React.useRef<AppStore>();
  if (!storeRef.current) storeRef.current = makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}

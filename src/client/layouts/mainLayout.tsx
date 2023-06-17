import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return <div>{children}</div>;
}

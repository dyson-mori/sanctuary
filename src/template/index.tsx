"use client"

import Global from "@global/styles";

import { UserProps } from "@global/interface";
import { ThemeProvider } from "@context/themeContext";
// import { PlayProvider } from "@context/autoPlayContext";

import Header from "./header";

type TemplateProps = {
  children: React.ReactNode;
  // user: UserProps;
  // data: {
  //   title: string;
  //   param: string;
  // }[];
};

export default function Template({ children }: TemplateProps) {
  return (
    <ThemeProvider>
      {/* <PlayProvider> */}
      {/* <Header data={data} user={user} /> */}
      {children}
      <Global />
      {/* </PlayProvider> */}
    </ThemeProvider>
  )
}
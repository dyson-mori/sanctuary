"use client"

import Global from "@global/styles";

import { ThemeProvider } from "@context/themeContext";
import { PlayProvider } from "@context/autoPlayContext";
import { HeaderProps } from "@global/interface";

import Header from "./header";

type TemplateProps = {
  children: React.ReactNode;
  header: HeaderProps[];
};

export default function Template({ header, children }: TemplateProps) {
  return (
    <ThemeProvider>
      <PlayProvider>
        <Header header={header} />
        {children}
        <Global />
      </PlayProvider>
    </ThemeProvider>
  )
}
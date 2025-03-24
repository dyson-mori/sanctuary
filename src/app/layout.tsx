"use client";

import { Montserrat, Montserrat_Alternates, My_Soul } from "next/font/google";
import { ThemeProvider } from "styled-components";

import themes from "@global/theme";
import Global from "@global/styles";
import { useStorage } from "@hooks";

import Notification from "../context/notification";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [storage] = useStorage('@dark-mode', false);

  return (
    <ThemeProvider theme={themes[storage ? 'dark' : 'light']}>
      <Notification>
        <html lang="en">
          <body className={`${montserrat.variable} ${montserrat_alternates.variable} ${my_soul.variable}`}>
            {children}
          </body>
        </html>

        <Global />
      </Notification>
    </ThemeProvider>
  );
};

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: "--font-montserrat",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const montserrat_alternates = Montserrat_Alternates({
  subsets: ['latin'],
  variable: "--font-montserrat-alternates",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const my_soul = My_Soul({
  subsets: ['latin'],
  variable: "--font-my-soul",
  weight: ['400'],
});
import { Montserrat, Montserrat_Alternates, My_Soul } from "next/font/google";

import api from "@services/api";

import Template from "../template";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data } = await api.header.list();
  // const user = await api.user.find();

  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${montserrat_alternates.variable} ${my_soul.variable}`}>
        <Template header={data}>
          {children}
        </Template>
      </body>
    </html>
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
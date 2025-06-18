import { usePathname } from "next/navigation";

// import { UserProps } from '@global/interface';

import { Container, LogoSvg, Navigations, Li } from "./styles";
import { HeaderProps } from "@global/interface";

// import Authentication from "./auth";
import Settings from "./settings";

type Props = {
  // user: UserProps;
  header: HeaderProps[];
};

export default function Header({ header }: Props) {
  const param = usePathname();

  return (
    <Container style={{ display: param === '/feed' ? 'none' : 'flex' }}>
      <LogoSvg />
      <Navigations>
        {
          header.map(row => (
            <Li key={row.param} href={{ pathname: row.param }} $selected={param === row.param}>
              {row.title}
            </Li>
          ))
        }
      </Navigations>
      <Settings />
      {/* <Authentication user={user} /> */}
    </Container>
  )
}
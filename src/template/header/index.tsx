import { usePathname } from "next/navigation";

import { UserProps } from '@global/interface';

import { Container, LogoSvg, Navigations, Li } from "./styles";

import Authentication from "./auth";
import Settings from "./settings";

type Props = {
  user: UserProps;
  data: {
    title: string;
    param: string;
  }[];
};

export default function Header({ data, user }: Props) {
  const param = usePathname();

  return (
    <Container style={{ display: param === '/feed' ? 'none' : 'flex' }}>
      <LogoSvg />
      <Navigations>
        {
          data.map(row => (
            <Li key={row.param} href={{ pathname: row.param }} $selected={param === row.param}>
              {row.title}
            </Li>
          ))
        }
      </Navigations>
      <Settings />
      <Authentication user={user} />
    </Container>
  )
}
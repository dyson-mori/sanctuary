import { FC } from "react";
import { Container } from "./styles";

type Props = {
  value?: boolean;
  setCheck: (a: boolean) => void;
};

export const Switch: FC<Props> = ({ value = false, setCheck }) => {
  return (
    <Container>
      <div className="checkbox-wrapper-6">
        <input className="tgl tgl-light" id="cb1-6" type="checkbox" checked={value} onChange={evt => setCheck(evt.target.checked)} />
        <label className="tgl-btn" htmlFor="cb1-6" />
      </div>
    </Container>
  )
};
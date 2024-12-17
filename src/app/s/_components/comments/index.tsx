import { FC } from "react";

import Image from "next/image";

import { CategoryProps } from "@global/interface";

import { Container, Title, Content, User, Input } from "./styles";
import { Description } from "@svg";

type TagsProps = {
  comments: CategoryProps[];
};

export const Comments: FC<TagsProps> = ({ comments }) => {
  return (
    <Container>
      <Title>
        <span />
        <p>Comments</p>
        <span />
      </Title>

      <Content>

        {
          comments.map((row, index) => (
            <User key={index}>
              <Image
                src='https://res.cloudinary.com/dyrtdrnky/image/upload/v1734292565/community/creator/fh3wlzleycufzikkl5t4.png'
                width={50}
                height={50}
                alt="sa"
              />

              <div className="info">
                <h3>Alvin</h3>

                <div className="row">
                  <p>Alvin donated 25 coins</p>
                  <p>15 min</p>
                </div>
              </div>
            </User>
          ))
        }

        <div style={{ height: 5 }} />

        <Input>
          <Description width={25} height={25} stroke="#000" />
          <input placeholder="Be careful what you write" />
        </Input>
      </Content>
    </Container>
  )
}
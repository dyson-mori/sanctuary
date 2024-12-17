import { FC } from "react";

import { CategoryProps } from "@global/interface";

import { Container, Title, Content, User } from "./styles";
import Image from "next/image";

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
          [0, 1, 2].map((row, index) => (
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

      </Content>
    </Container>
  )
}
import { CategoryProps } from "@global/interface";
import { Container } from "./styles";

type TagsProps = {
  tags: CategoryProps[]
};

export const SectionTag = ({ tags }: TagsProps) => {
  return (
    <Container>
      {
        tags.map((row, index) => (
          <div className="box" key={index}>
            <p>#{row.name}</p>
          </div>
        ))
      }
    </Container>
  )
}
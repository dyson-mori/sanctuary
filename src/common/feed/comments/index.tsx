import { CSSProperties, Fragment, useState } from "react";
import Image from "next/image";

import { ArrowRightUp, ChatSquare, CloseCircle } from "@svg";
import { PostProps } from "@global/interface";

import { Input } from "../../input";

import { Container, Header, Content, ButtonComment } from "./styles";

type Props = {
  post: PostProps;
  handleOpenChatMessage: (e: boolean) => void;
};

export default function Comment({ post, handleOpenChatMessage }: Props) {
  const test = {
    ...post,
    categories: [],
    comments: [],
    _count: {
      comments: 0
    }
  };

  const [open, setOpen] = useState(false);

  const container: CSSProperties = {
    right: open ? 50 : 40,
    opacity: open ? 1 : 0,
    visibility: open ? 'visible' : 'hidden',
    transition: '0.5s'
  };

  const button: CSSProperties = {
    right: !open ? 50 : 40,
    opacity: !open ? 1 : 0,
    visibility: !open ? 'visible' : 'hidden',
    transition: '0.5s'
  };

  function handleChatMessage() {
    handleOpenChatMessage(!open)
    setOpen(!open);
  };

  return (
    <>
      <ButtonComment style={button} onClick={handleChatMessage}>
        <ChatSquare width={20} height={20} strokeWidth={2} />
        <p>{test._count.comments}</p>
      </ButtonComment>

      <Container style={container}>
        <Header>
          <h3>Comments</h3>
          <button onClick={handleChatMessage}>
            <CloseCircle width={20} height={20} strokeWidth={2} />
          </button>
        </Header>

        <div className="comment">
          {/* <Image className="avatar" src='/1744641565465.png' width={35} height={35} alt='user' /> */}
          <div className="content">
            <div className="name-time"><strong>Dyson</strong> 3h ago</div>
            <p>message</p>
          </div>
        </div>

        <div className="tags">
          {test.categories.map(e => (
            <span key={e.title}>#{e.title}</span>
          ))}
        </div>

        <Content>
          {test.comments.map((el, index) => (
            <Fragment key={index}>
              <div className="comment">
                <Image className="avatar" src={el.user.photo ?? ''} width={35} height={35} alt={el.content} />
                <div className="content">
                  <div className="name-time"><strong>{el.user.nickname}</strong> 3h ago</div>
                  <p>{el.content}</p>
                </div>
              </div>
              {/* {el.replies?.map((sub, index) => (
                <div key={index.toString()} className="comment reply">
                  <Image className="avatar" src={sub.user.photo} width={35} height={35} alt={el.content} />
                  <div className="content">
                    <div className="name-time"><strong>{sub.user.nickname}</strong> 3h ago</div>
                    <p>{sub.content}</p>
                  </div>
                </div>
              ))} */}
            </Fragment>
          ))}
        </Content>

        <Input icon={ChatSquare} placeholder="Send a message..." buttonIcon={ArrowRightUp} />
      </Container>
    </>
  )
};
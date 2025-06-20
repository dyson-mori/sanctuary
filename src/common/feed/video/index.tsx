import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import { Container } from './styles';
import { PostProps } from '@global/interface';

interface Props {
  post: PostProps;
  setTargetPost: (target: PostProps) => void;
}

export default function Video({ post, setTargetPost }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls | null = null;

    // ⚠️ Se o vídeo for HLS
    if (video && post.url.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(`http://localhost:3030/cdn${post.url}`);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = `http://localhost:3030/cdn${post.url}`;
      }
    } else {
      // Caso não seja .m3u8, aplica normalmente
      videoRef.current!.src = `http://localhost:3030/cdn${post.url}`;
    }

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!video) return;

      if (entry.isIntersecting) {
        await video.play();
        setTargetPost(post);
      } else {
        video.pause();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: .5
    });

    if (video) observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
      if (hls) hls.destroy(); // ⚠️ Destroi instância do HLS
    };
  }, [post.url]);

  return (
    <Container>
      <video
        ref={videoRef}
        preload="auto"
        muted
        loop
        playsInline
        onContextMenu={e => e.preventDefault()}
        controlsList="nodownload"
        // controls
      >
        Your browser does not support the video tag.
      </video>
    </Container>
  );
}

import React, { useEffect, useRef } from 'react';

import { Container, Controller, Timeline } from './styles';
import { PostProps } from '@global/interface';
// import { useWindowSize } from '@hooks';

interface Props {
  posts: PostProps;
};

export const TargetVideo = ({ posts }: Props) => {
  let isScrubbing = false;
  let wasPaused = false;

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // const size = useWindowSize();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (videoRef.current && entry.isIntersecting) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      };

      if (videoRef.current && !entry.isIntersecting) {
        videoRef.current.pause();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: .5
    })

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    }
  }, []);

  // console.log(videoRef.current?.clientHeight);

  const handleTimelineUpdate = (e: MouseEvent) => {
    const rect = timelineRef.current!.getBoundingClientRect()
    const percent = Math.min(
      Math.max(0, e.x - rect.x),
      rect.width
    ) / rect.width;

    timelineRef.current!.style.setProperty("--preview-position", String(percent))

    if (isScrubbing) {
      e.preventDefault()
      timelineRef.current!.style.setProperty("--progress-position", String(percent))
    }
  };

  const timeUpdate = (event: React.SyntheticEvent) => {
    const videoElement = event.target as HTMLVideoElement;
    const total = (videoElement.currentTime / videoElement.duration);
    return timelineRef.current?.style.setProperty("--progress-position", String(total))
  };

  function toggleScrubbing(e: MouseEvent) {
    const rect = timelineRef.current!.getBoundingClientRect();

    const max = Math.max(0, e.x - rect.x);
    const percent = Math.min(max, rect.width) / rect.width;

    isScrubbing = (e.buttons & 1) === 1
    timelineRef.current!.classList.toggle("scrubbing", isScrubbing)
    videoRef.current!.currentTime = percent * videoRef.current!.duration

    if (isScrubbing) {
      wasPaused = videoRef.current!.paused;
      videoRef.current!.pause()
    } else {
      videoRef.current!.currentTime = percent * videoRef.current!.duration
      if (!wasPaused) videoRef.current!.play()
    };

    handleTimelineUpdate(e)
  };

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.addEventListener("mousedown", handleTimelineUpdate);
      timelineRef.current.addEventListener("mousedown", toggleScrubbing);
      document.addEventListener("mouseup", e => {
        if (isScrubbing) toggleScrubbing(e)
      })
      document.addEventListener("mousemove", e => {
        if (isScrubbing) handleTimelineUpdate(e)
      })
    };
  }, []);

  return (
    <Container
      style={{
        // height: videoRef.current?.clientHeight
        // height: post.height / post.width * (size.width <= 600 ? size.width / 2.1 : size.width / 6.2)
      }}
    >
      <video ref={videoRef} width="100%" height="100%" muted loop playsInline onTimeUpdate={timeUpdate}>
        <source src={'https://res.cloudinary.com/dyrtdrnky/video/upload/' + posts.url_video} type='video/webm' />
      </video>
      <Controller
      // style={{
      //   bottom: size.height - videoRef.current?.clientHeight
      // }}
      >
        <Timeline ref={timelineRef}>
          <div className='timeline'>
            <div className="thumb-indicator" />
          </div>
        </Timeline>
      </Controller>
    </Container>
  )
};
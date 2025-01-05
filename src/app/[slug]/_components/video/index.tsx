import React, { forwardRef, useEffect, useRef } from 'react';

import { PostProps } from '@global/interface';

import { Container, Controller, Timeline } from './styles';
// import { convertUrlToBlob } from '@utils';

interface Props {
  posts: PostProps;
};

const TargetVideo = forwardRef(({ posts }: Props, ref: React.ForwardedRef<HTMLElement>) => {
  let isScrubbing = false;
  let wasPaused = false;

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  function handleTimelineUpdate(e: MouseEvent) {
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

  function timeUpdate(event: React.SyntheticEvent) {
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

    const observer = new IntersectionObserver(async ([entry]) => {
      if (videoRef.current && entry.isIntersecting && posts.url_video) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      };

      if (videoRef.current?.muted) {
        videoRef.current.muted = false
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

  return (
    <Container ref={ref}>
      <video
        ref={videoRef}
        width={posts.width >= posts.height ? '99%' : 'auto'}
        height='auto'
        muted
        loop
        playsInline
        onTimeUpdate={timeUpdate}
        controlsList='nodownload'
        onContextMenu={e => e.preventDefault()}
      >
        <source src={'https://res.cloudinary.com/dyrtdrnky/video/upload/' + posts.url_video} type='video/webm' />
      </video>

      <Controller>
        <Timeline ref={timelineRef}>
          <div className='timeline'>
            <div className="thumb-indicator" />
          </div>
        </Timeline>
      </Controller>

      {/* <Image
        style={{
          position: 'absolute',
          objectFit: 'cover',
          filter: 'blur(5px)',
          zIndex: 0,
          transition: '.1s',
          width: '100%',
          height: '100%'
        }}
        src={`https://res.cloudinary.com/dyrtdrnky/video/upload/${posts.pre_image}`}
        width={50}
        height={50}
        alt={'item.creator.name'}
      /> */}
    </Container>
  )
})

TargetVideo.displayName = 'TargetVideo';

export default TargetVideo;
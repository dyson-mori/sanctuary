import { useEffect, useRef } from "react";

import { useWindowSize, useResponsiveColumns } from "@hooks";

import { PostProps } from "@global/interface";

import Video from "./video";
import Locked, { Clickable } from "./locked";

import { Column } from "./styles";

interface MasonryProps {
  posts: PostProps[];
  update?: string;
  autoPlay: boolean;
  onClick?: (post: PostProps) => void;
}

export function Masonry({ posts, autoPlay, onClick }: MasonryProps) {
  const videoRef = useRef<HTMLVideoElement[]>([]);

  const size = useWindowSize();
  const columns = useResponsiveColumns();

  // const videos = distributeVideos(posts);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        const video = entry.target as HTMLVideoElement;

        if (!autoPlay) return video.pause();

        if (entry.isIntersecting) {
          return await video.play();
        };

        if (!entry.isIntersecting) {
          return await video.pause();
        };
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    });

    videoRef.current.forEach((video) => observer.observe(video));

    return () => {
      videoRef.current.forEach((video) => observer.unobserve(video));
      observer.disconnect();
    };
  }, [autoPlay]);

  return Array.from({ length: columns }).map((_, columnIndex) => (
    <Column key={columnIndex}>
      {posts.map((post, i) =>
        i % columns === columnIndex && (
          <Video
            ref={(ref) => {
              if (ref) videoRef.current[i] = ref;
            }}
            key={i.toString()}
            post={post}
            size={size}
            quantity={columns}
            clickable={<Clickable data={post} onClick={onClick} />}
            locked={<Locked data={post} />}
          />
        )
      )}
    </Column>
  ));
}


// function distributeVideos(videos, maxColumns = 5, maxHeight = 5000) {
//   // Inicializa colunas
//   const columns = Array.from({ length: maxColumns }, () => ({
//     items: [],
//     totalHeight: 0,
//   }));

//   for (const video of videos) {
//     // Encontra a coluna com menor altura acumulada
//     let targetColumn = columns.reduce((minCol, col) =>
//       col.totalHeight < minCol.totalHeight ? col : minCol
//     );

//     // Adiciona o vídeo na coluna selecionada
//     targetColumn.items.push(video);
//     targetColumn.totalHeight += video.height;

//     // Se a coluna ficar com mais de 5000px, tenta redistribuir o último item
//     if (targetColumn.totalHeight > maxHeight && targetColumn.items.length > 1) {
//       const removed = targetColumn.items.pop(); // remove o último
//       targetColumn.totalHeight -= removed.height;

//       // Busca uma nova coluna que não seja a atual
//       const newColumn = columns
//         .filter(col => col !== targetColumn)
//         .reduce((minCol, col) =>
//           col.totalHeight < minCol.totalHeight ? col : minCol
//         );

//       newColumn.items.push(removed);
//       newColumn.totalHeight += removed.height;
//     }
//   }

//   return columns.map(col => col.items);
// }


/*

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      entries.forEach((entry, index) => {
        if (videoRef.current && entry.isIntersecting && entry.target.id === index.toString()) {
          console.log(`${index} => `, entry);
          videoRef.current[index].play();
        };

        if (videoRef.current && !entry.isIntersecting && entry.target.id !== index.toString()) {
          videoRef.current[index].pause();
        };
      });
    }, {
      threshold: 0.5
    });

    videoRef.current.forEach(el => observer.observe(el));

    return () => {
      if (videoRef.current) {
        videoRef.current.forEach(el => observer.unobserve(el));
      }
    };
  }, [update]);

*/
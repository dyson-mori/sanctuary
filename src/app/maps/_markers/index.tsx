import { useRef, useState, useEffect } from "react";

import Image from "next/image";

import { MarkerClusterer, Marker } from "@googlemaps/markerclusterer";
import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";

import { Container } from "./styles";

type Props = {
  points: {
    url: string;
    key: string;
    name: string;
    lat: number;
    lng: number;
  }[];
};

const Markers = ({ points }: Props) => {
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker ref={marker => setMarkerRef(marker, point.key)} position={point} key={point.key}>
          <Container>
            <Image
              src={point.url}
              width={100}
              height={150}
              alt={point.name}
              style={{ objectFit: 'cover', borderRadius: 6, zIndex: 1 }}
            />
            <span />
          </Container>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default Markers;
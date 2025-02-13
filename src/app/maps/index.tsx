"use client"

import { useEffect, useState } from 'react';
import { Map } from '@vis.gl/react-google-maps';

import { Header, Modal } from '@common';

import Markers from './_markers';

import { Container } from "./styles";

type Tree = {
  urls: string[];
  key: string;
  name: string;
  lat: number;
  lng: number;
};

export default function Maps({ user, maps }) {
  const [loc, setLoc] = useState<{ lat: number, lng: number } | null>(null);

  const formatted: Tree[] = maps.map((row, key) => ({ ...row, key: key.toString() }));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) =>
      setLoc({ lat: loc.coords.latitude, lng: loc.coords.longitude })
    );
  }, []);

  return (
    <>
      <Container>
        <Header user={user} />
        {loc && <Map
          fullscreenControl={false}
          defaultZoom={17}
          defaultCenter={{ lat: loc.lat, lng: loc.lng }}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          <Markers points={formatted} />
        </Map>}
      </Container>

      <Modal open={!loc}>
        Ative sua localização
      </Modal>
    </>
  )
};

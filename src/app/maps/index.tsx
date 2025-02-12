"use client"

import { APIProvider, Map } from '@vis.gl/react-google-maps';

import { Header } from '@common';

import Markers from './_markers';

import { Container } from "./styles";

type Tree = {
  url: string;
  key: string;
  name: string;
  lat: number;
  lng: number;
};

const trees = [
  {
    url: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1739384715/sanctuary/c84a47c6e8e529b388d2f791d94fd883_irc5tu.jpg',
    name: "sofi",
    lat: -19.942699,
    lng: -44.031464,
  },
  {
    url: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1739385566/sanctuary/011b7baf375ff3c1b3dde39f08ba7c7f_kyfeyq.jpg',
    name: "gabi",
    lat: -19.9431461,
    lng: -44.0337437,
  },
];

const formatted: Tree[] = trees.map((row, key) => ({ ...row, key: key.toString() }));

export default function Maps({ user }) {
  return (
    <>
      <Header user={user} />
      <Container>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            center={{ lat: -19.942699, lng: -44.031464 }}
            zoom={17}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
          >
            <Markers points={formatted} />
          </Map>
        </APIProvider>
      </Container>
    </>
  )
};

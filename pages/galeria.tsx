import type { NextPage } from 'next';
import Head from 'next/head';

import ImageGallery from 'react-image-gallery';
import {useEffect, useState} from "react";
import directusApi from "../libs/api";

const Galeria: NextPage = () => {
    const [dogImage, setDogImage] = useState(null)
    useEffect(() => {
        directusApi.get('galleries?populate=*').then((res) => {
            // console.log(res.data[0].attributes.image.data.attributes.url)
            setDogImage(res.data.map((o) => {
                return {
                    original: "http://localhost:1337"+o.attributes.image.data.attributes.url,
                    description: o.attributes.title
                }
            }))
        });
    },[])
  return (
    <>
      <Head>
        <title>Galeria - Błękitna Armia Foxhole </title>
      </Head>
      <div
        style={{
          height: '100vh',
          width: '100%',
          backgroundColor: '#1a1a1a',
          overflowX: 'hidden',
        }}
        className="marginFullScreen"
      >
          balls
        {/*<ImageGallery items={dogImage} />*/}
          {dogImage &&<ImageGallery items={dogImage} />}
      </div>
    </>
  );
};

export default Galeria;

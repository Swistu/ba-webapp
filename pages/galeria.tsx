import type { NextPage } from 'next';
import Head from 'next/head';

import ImageGallery from 'react-image-gallery';

const Galeria: NextPage = () => {
  const images = [
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830030065704/967492546311901264/unknown.png',
      description:
        'Wesoła kompania przed wyjazdem do lasu na zbieranie głów goblinów',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830030065704/959151714546622464/20220326182240_1.jpg',
      description:
        'Jednostka opancerzona przed odparciem ataku na miasto przez kolonialne czołgi wroga',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830030065704/1004087701722648740/bog_wojny.png',
      description: 'Ofiara Błękitnej Armii dla wielkiego Boga wojny',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830030065704/952622428876578906/20220313182536_1.jpg',
      description: 'Zespół wsparcia piechoty gotowy na kolejną akcje',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830030065704/1017487108971184208/20220826005405_1.jpg',
      description: 'Zołnierze Błekitnej Armii po udanym ostrzale artyleryjskim',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830030065704/986310476877164564/unknown.png',
      description: 'Załoga marynarki gotowa do ataku na wrogich wodach',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/850846130903711764/1017533005776048178/505460_screenshots_20220813160251_1.jpg',
      description:
        'Strażnik tyłowy rozgrzewający zmarznięte dłonie po ciężkiej warcie w nocy',
    },
  ];
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
        <ImageGallery items={images} />
      </div>
    </>
  );
};

export default Galeria;

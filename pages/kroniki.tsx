import type { NextPage } from 'next';
import Head from 'next/head';

import ImageGallery from 'react-image-gallery';

const Kroniki: NextPage = () => {
  const images = [
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830311870479/975832057706074172/01.05.png',
      description: '01.05.2022',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830311870479/975831808623120465/18.04.png',
      description: '18.04.2022',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830311870479/975831535322288249/11.04.png',
      description: '11.04.2022',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830311870479/964215173332209704/unknown_2.png',
      description: '09.04.2022',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830311870479/964214142556844072/WOLA_HALLERANA_04.png',
      description: '04.04.2022',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830311870479/964213937967099914/WOLA_HALLERANA_03_2.png',
      description: '01.04.2022',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830311870479/960607916539383848/WOLA_HALLERANA_02.png',
      description: '30.03.2022',
    },
    {
      original:
        'https://cdn.discordapp.com/attachments/815381830030065704/958676354281386035/WOLA_HALLERANA.png',
      description: '20.03.2022',
    },
  ];
  return (
    <>
      <Head>
        <title>Kroniki - Błękitna Armia Foxhole </title>
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

export default Kroniki;

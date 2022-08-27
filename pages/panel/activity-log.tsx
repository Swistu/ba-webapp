/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react';
import Card from '../../components/card/card';
import PanelLayout from '../../components/panelLayout/panelLayout';
import Tesseract from 'tesseract.js';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { useRouter } from 'next/router';

const ActivityLog = () => {
  const router = useRouter();

  const [image, setImage] = useState('');
  const [imageText, setImageText] = useState(null);
  const [checkingImageData, setCheckingImageData] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [activityLogObj, setActivityLogObj] = useState({} as any);
  const [reponseStatus, setResponseStatus] = useState(0);

  const getImageData = () => {
    setCheckingImageData(true);
    let im = new Image();
    im.onload = imageLoaded;
    im.src = image;

    function imageLoaded(ev: any) {
      const element1 = document.getElementById('canvas1') as any;
      const element2 = document.getElementById('canvas2') as any;
      const ctx1 = element1.getContext('2d');
      const ctx2 = element2.getContext('2d');

      im = ev.target;

      const width = element1.width;
      const height = element1.height;

      ctx1.drawImage(im, 0, 0);

      const imageData = ctx1.getImageData(0, 0, width, height);
      const imageData2 = ctx2.createImageData(width, height);

      let inpos = 0;
      let outpos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const r = imageData.data[inpos++];
          const g = imageData.data[inpos++];
          const b = imageData.data[inpos++];
          const a = imageData.data[inpos++];
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          if (gray < 110) {
            imageData2.data[outpos++] = 255;
            imageData2.data[outpos++] = 255;
            imageData2.data[outpos++] = 255;
            imageData2.data[outpos++] = a;
          } else {
            imageData2.data[outpos++] = 0;
            imageData2.data[outpos++] = 0;
            imageData2.data[outpos++] = 0;
            imageData2.data[outpos++] = a;
          }
        }
      }
      ctx2.putImageData(imageData2, 0, 0);

      Tesseract.recognize(element2.toDataURL(), 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text')
            setProgressValue(m.progress * 100);
        },
      }).then((res: any) => {
        setImageText(res.data.text);
        setCheckingImageData(false);
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (imageText) {
        const orgText: string = imageText;
        const textArray: Array<string> = orgText.split('\n');
        const activityLogArray: Array<string> = [];
        const regExp = /[|\s]*(.*): (.*)/;
        const expectedText: Array<string> = [
          'Enemy Player Damage',
          'Friendly Player Damage',
          'Enemy Structure/Vehicle Damage',
          'Friendly Structure/Vehicle Damage',
          'Friendly Construction',
          'Friendly Repairing',
          'Friendly Healing',
          'Friendly Revivals',
          'Vehicles Captured By Enemy',
          'Vehicle Self Damage',
          'Materials Submitted',
          'Materials Gathered',
          'Supply Value Delivered',
        ];
        const activityLogObj: any = {};

        textArray.forEach((element) => {
          if (
            element != '' &&
            expectedText.some((expectedElement) => {
              const regExpData = element.match(regExp);
              if (regExpData) return regExpData[1] === expectedElement;
            })
          )
            activityLogArray.push(element);
        });

        activityLogArray.forEach((element, i) => {
          const regExpData = element.match(regExp);
          if (regExpData !== null && regExpData[1] === expectedText[i]) {
            const objKey = regExpData[1].replace('/', '').replaceAll(' ', '');
            const objValue = parseInt(
              regExpData[2].replace(',', '').replace('O', '0')
            );
            activityLogObj[objKey] = objValue;
          }
        });

        if (Object.keys(activityLogObj).length !== 13) return alert('error');

        setActivityLogObj(activityLogObj);
        const element1 = document.getElementById('canvas1') as any;
        const element3 = document.getElementById('canvas3') as any;
        const ctx1 = element1.getContext('2d');
        const ctx3 = element3.getContext('2d');

        const width = element1.width;
        const height = element1.height;

        const imageData = ctx1.getImageData(0, 0, width, height);

        ctx3.putImageData(imageData, 0, 0);
      }
    })();
  }, [imageText]);

  const saveData = async () => {
    const apiResponse = await fetch('/api/activitylog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityLogObj),
    });
    setResponseStatus(apiResponse.status);
  };
  const reloadPage = async () => {
    router.reload();
  };
  return (
    <>
      <Card className="war_number">
        <h2 className="text-center">Activity log</h2>
      </Card>
      <Card className="war_number">
        {reponseStatus === 200 ? (
          <h2>Poprawnie dodano dane</h2>
        ) : reponseStatus !== 0 ? (
          <>
            <h2>Niestety wystąpil błąd podczas próby dodania danych</h2>
            <Button onClick={reloadPage}>Spróboj ponownie</Button>
          </>
        ) : (
          <>
            {checkingImageData ? (
              <>
                {progressValue != 0 ? (
                  <>
                    <h4>Trwa odczytywanie danych</h4>
                    <progress id="file" value={progressValue} max="100">
                      {progressValue}
                    </progress>
                  </>
                ) : (
                  <h4>Trwa sprawdzanie zdjęcia</h4>
                )}
              </>
            ) : (
              <>
                {imageText ? (
                  <>
                    <h3>Prównaj dane ze zdjęcia oraz w tabeli:</h3>
                    <div>
                      <canvas
                        className="canvas"
                        id="canvas3"
                        width={512}
                        height={512}
                        style={{ display: activityLogObj ? 'block' : 'none' }}
                      >
                        Canvas
                      </canvas>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table">
                          <tr className="table-row">
                            {Object.keys(activityLogObj).map((element, key) => {
                              return <td key={key}>{element}</td>;
                            })}
                          </tr>
                          <tbody>
                            <tr className="table-row">
                              {Object.keys(activityLogObj).map(
                                (element, key) => {
                                  return (
                                    <td key={key}>{activityLogObj[element]}</td>
                                  );
                                }
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <h3>Jeżeli dane są prawdiłowe kliknij zapisz.</h3>
                    <h3>Jeżeli dane są błędne kliknij ponów.</h3>
                    <Button className="button-success" onClick={saveData}>
                      Zapisz
                    </Button>
                    <Button className="button-danger" onClick={reloadPage}>
                      Ponów
                    </Button>
                  </>
                ) : (
                  <>
                    {' '}
                    <h3>Dodaj swój activity log</h3>
                    <Input
                      type="file"
                      onChange={(e: any) =>
                        setImage(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                    <Button type="button" value="Wyślij" onClick={getImageData}>
                      Sprawdź zdjęcie
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}

        <canvas
          className="canvas canvas-ActivityLog"
          id="canvas1"
          width={512}
          height={512}
        >
          Canvas
        </canvas>
        <canvas
          className="canvas canvas-ActivityLog"
          id="canvas2"
          width={512}
          height={512}
        ></canvas>
      </Card>
    </>
  );
};
export default ActivityLog;

ActivityLog.getLayout = function getLayout(page: ReactNode) {
  return <PanelLayout>{page}</PanelLayout>;
};

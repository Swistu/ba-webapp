/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useCallback, useEffect, useState } from 'react';
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
  const [threadshold, setThreadshold] = useState(90);

  const getImageData = useCallback(
    (threshold = 120) => {
      setCheckingImageData(true);
      const im = new Image();
      im.onload = imageLoaded;
      im.src = image;

      function imageLoaded(this: any) {
        const imageHeight = this.height;
        const imageWidth = this.width;

        const element1 = document.getElementById('canvas1') as any;
        const element2 = document.getElementById('canvas2') as any;

        element1.width = imageWidth;
        element1.height = imageHeight;
        element2.width = imageWidth;
        element2.height = imageHeight;

        const ctx1 = element1.getContext('2d');
        const ctx2 = element2.getContext('2d');

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
            if (gray < threshold) {
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
    },
    [image]
  );

  useEffect(() => {
    (async () => {
      if (imageText && !checkingImageData) {
        const orgText: string = imageText;
        const textArray: Array<string> = orgText
          .replace('§', '5')
          .replace(/Caplured/g, 'Captured')
          .replace(
            /Consiruction|Consiructon|Consrucion|Cansiructon/g,
            'Construction'
          )
          .replace(/Darmages|Damge|Damega/g, 'Damage')
          .replace(/Delvered|Deliversd/g, 'Delivered')
          .replace(/Enerny|Enamy/g, 'Enemy')
          .replace(/Frindly|Friandly|Frendly/g, 'Friendly')
          .replace(/Gatharad/g, 'Gathered')
          .replace(/Materils|Malariels/g, 'Materials')
          .replace(/Playar/g, 'Player')
          .replace(/Repairng|Reparing|Rapairing/g, 'Repairing')
          .replace(/Sof|Seff|Salf/g, 'Self')
          .replace(
            /Sircture|Shucture|Siructure|Situcture|Siruciure|Siucture/g,
            'Structure'
          )
          .replace(/Submitied|Subited|Submited/g, 'Submitted')
          .replace(/Valus|Valua/g, 'Values')
          .replace(/Vehicla|Vahicla/g, 'Vehicle')
          .replace(/[^\w\n:]/gi, '')
          .split('\n');
        const activityLogArray: Array<string> = [];
        const regExp = /(.*):(.*)/;
        const expectedText: Array<string> = [
          'EnemyPlayerDamage',
          'FriendlyPlayerDamage',
          'EnemyStructureVehicleDamage',
          'FriendlyStructureVehicleDamage',
          'FriendlyConstruction',
          'FriendlyRepairing',
          'FriendlyHealing',
          'FriendlyRevivals',
          'VehiclesCapturedByEnemy',
          'VehicleSelfDamage',
          'MaterialsSubmitted',
          'MaterialsGathered',
          'SupplyValueDelivered',
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

        if (Object.keys(activityLogObj).length !== 13) {
          if (threadshold < 170) {
            getImageData(threadshold);
            setThreadshold(threadshold + 5);
            return;
          } else {
            return;
          }
        }

        setActivityLogObj(activityLogObj);
        const element1 = document.getElementById('canvas1') as any;
        const element3 = document.getElementById('canvas3') as any;

        element3.width = element1.width;
        element3.height = element1.height;

        const ctx1 = element1.getContext('2d');
        const ctx3 = element3.getContext('2d');

        const width = element1.width;
        const height = element1.height;

        const imageData = ctx1.getImageData(0, 0, width, height);

        ctx3.putImageData(imageData, 0, 0);
      }
    })();
  }, [imageText, threadshold, getImageData, checkingImageData]);

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
          <h2>Poprawnie zapisano activity log</h2>
        ) : reponseStatus !== 0 ? (
          <>
            <h2>Niestety wystąpil błąd podczas próby zapisania informacji.</h2>
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
                  <h4>Trwa binaryzacja zdjęcia z progiem - {threadshold}</h4>
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
                          <thead>
                            <tr className="table-row">
                              {Object.keys(activityLogObj).map(
                                (element, key) => {
                                  return <td key={key}>{element}</td>;
                                }
                              )}
                            </tr>
                          </thead>
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

                    <Button className="button-success" onClick={saveData}>
                      Zapisz
                    </Button>
                    <Button className="button-danger" onClick={reloadPage}>
                      Ponów
                    </Button>
                  </>
                ) : (
                  <>
                    {imageText ? (
                      <h3>
                        Niestety nie udało się rozpoznać danych ze zdjęcia.
                        <br />
                        Wrzuć zdjęcie w wyższej rozdzielczości.
                      </h3>
                    ) : null}
                    <h3>Dodaj swój activity log</h3>
                    <Input
                      type="file"
                      onChange={(e: any) =>
                        setImage(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                    <Button
                      type="button"
                      value="Wyślij"
                      onClick={() => {
                        getImageData();
                      }}
                    >
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
          width={0}
          height={0}
        >
          Canvas
        </canvas>
        <canvas
          className="canvas canvas-ActivityLog"
          id="canvas2"
          width={0}
          height={0}
        ></canvas>
      </Card>
    </>
  );
};
export default ActivityLog;

ActivityLog.getLayout = function getLayout(page: ReactNode) {
  return <PanelLayout>{page}</PanelLayout>;
};

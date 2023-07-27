/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import clientPromise from '../../utility/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token: any = await getToken({ req });
  if (!token) return res.status(401).send({ message: 'Unathorized' });
  if (req.method === 'GET') {
    try {
      const foxholeResponse = await fetch(
        'https://war-service-live.foxholeservices.com/api/worldconquest/war',
        {
          method: 'GET',
        }
      );
      const foxholeData = await foxholeResponse.json();

      if (!foxholeData)
        return res.status(500).send({
          valid: false,
          message: `Wystąpił błąd, nie można pobrać nr wojny.`,
        });

      const mongoConnection = await clientPromise;
      const result = await mongoConnection
        .db(process.env.DB_NAME)
        .collection('activitylog')
        .find({ warNumber: foxholeData.warNumber })
        .toArray();

      if (!result)
        return res.status(502).send({
          valid: false,
          message: `Wystąpił podczas pobierania w bazie.`,
        });

      return res.status(200).send(JSON.stringify(result));
    } catch (e) {
      return res.status(500).send({
        valid: false,
        message: `Wystąpił podczas edytowania w bazie.`,
      });
    } finally {
      res.end();
    }
  }
  if (req.method !== 'POST')
    return res
      .status(405)
      .send({ message: 'Only POST or GET request allowed' });

  const objKeys = Object.keys(req.body);

  if (objKeys.length !== 15)
    return res.status(400).send({ message: 'Bad body data' });

  try {
    const foxholeResponse = await fetch(
      'https://war-service-live.foxholeservices.com/api/worldconquest/war',
      {
        method: 'GET',
      }
    );
    const foxholeData = await foxholeResponse.json();

    if (!foxholeData)
      return res.status(500).send({
        valid: false,
        message: `Wystąpił błąd, nie można pobrać nr wojny.`,
      });
    const mongoConnection = await clientPromise;
    const result = await mongoConnection
      .db(process.env.DB_NAME)
      .collection('activitylog')
      .updateOne(
        { userID: token.user.id, warNumber: foxholeData.warNumber },
        {
          $setOnInsert: {
            userID: token.user.id,
            warNumber: foxholeData.warNumber,
          },
          $set: { ...req.body },
        },
        { upsert: true }
      );

    if (result.matchedCount === 0 && result.upsertedCount === 0)
      return res.status(404).send({
        valid: false,
        message: `Nie znaleziono ${token.user.id} w bazie.`,
      });
    if (result.modifiedCount === 0 && result.upsertedCount === 0)
      return res.status(304).end();
    if (!result)
      return res.status(502).send({
        valid: false,
        message: `Wystąpił podczas edytowania w bazie.`,
      });

    return res.status(200).send({ message: 'Poprawnie zaktualizowano' });
  } catch (e) {
    return res.status(500).send({
      valid: false,
      message: `Wystąpił podczas edytowania w bazie.`,
    });
  } finally {
    res.end();
  }
};

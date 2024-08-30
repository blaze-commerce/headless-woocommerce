import { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ message: 'Hello World' });
};

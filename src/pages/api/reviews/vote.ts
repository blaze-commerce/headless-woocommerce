import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vote = req.body;
  try {
    switch (vote.type) {
      case 'up':
        await axios.post(`https://api.yotpo.com/reviews/${vote.id}/vote/up/true`);
        break;
      case 'down':
        await axios.post(`https://api.yotpo.com/reviews/${vote.id}/vote/down/true`);
    }

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(500).json({ message: 'failed' });
  }
}

  import { NextApiRequest, NextApiResponse } from 'next';
  import { createZoomMeeting } from './createZoomMeeting';

  export default function handlePost(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      return createZoomMeeting(req, res);
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }

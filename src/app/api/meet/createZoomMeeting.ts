import axios from 'axios';
import { NextApiHandler } from 'next';

export const createZoomMeeting: NextApiHandler = async (req, res) => {
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Zoom client ID or client secret is missing.' });
  }

  try {
    const tokenResponse = await axios.post<{
      access_token: string;
    }>(
      'https://zoom.us/oauth/token',
      {
        grant_type: 'client_credentials',
      },
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    
    const createMeetingResponse = await axios.post<{
      join_url: string;
    }>(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'My Zoom Meeting', 
        type: 1, 
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { join_url } = createMeetingResponse.data;
    return res.status(200).json({ join_url });
  } catch (error) {
    console.log('[createZoomMeeting]', error);
    return res.status(500).json({ error: 'Unable to create Zoom meeting link' });
  }
};

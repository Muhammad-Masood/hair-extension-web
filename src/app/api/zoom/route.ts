import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req:any, res:any) {
    if (req.method === 'GET') {
        const { code, state } = req.query;

        // Retrieve Zoom app credentials from environment variables


        const clientId = "2x1dvpZ0Rqi7gcyxQjA8g"
        const clientSecret = "37iPCMI7aM5AxhIRxdQqMCirqr8r4HqU"
        const redirectUri = "https://047b-182-190-104-71.ngrok-free.app/"

        try {
            // Exchange the authorization code for an access token
            const response = await axios.post(
                'https://zoom.us/oauth/token',
                querystring.stringify({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                }),
                {
                    auth: {
                        username: clientId,
                        password: clientSecret,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const { access_token } = response.data;

            // At this point, you have the 'access_token' that you can use to make requests to Zoom APIs on behalf of the user
            // You can store this token in a session, database, or use it immediately for Zoom API calls

            res.status(200).json({ access_token });
        } catch (error) {
            console.error('Error exchanging authorization code for access token:', error);
            res.status(500).json({ error: 'Failed to retrieve access token' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

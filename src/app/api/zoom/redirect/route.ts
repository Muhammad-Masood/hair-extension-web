import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req:any, res:any) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

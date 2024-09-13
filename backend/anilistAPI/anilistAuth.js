const axios = require('axios');
require('dotenv').config();

const ANI_LIST_AUTH_URL = 'https://anilist.co/api/v2/oauth/authorize';
const CLIENT_ID = process.env.CLIENT_ID;  
const REDIRECT_URI = process.env.REDIRECT_URI;

function getAuthUrl() {
    return `${ANI_LIST_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
}

async function exchangeCodeForToken(code) {
    try {
        const response = await axios.post('https://anilist.co/api/v2/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            code: code,  
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return response.data.access_token;
    } catch (error) {
        throw new Error('Error exchanging authorization code for access token.');
    }
}

module.exports = { getAuthUrl, exchangeCodeForToken };
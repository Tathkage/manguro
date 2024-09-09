const express = require('express');
const axios = require('axios');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

app.use('/graphql', createHandler({ schema }));

const ANI_LIST_AUTH_URL = 'https://anilist.co/api/v2/oauth/authorize';
const CLIENT_ID = process.env.CLIENT_ID;  
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/login', (req, res) => {
    const authUrl = `${ANI_LIST_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    res.redirect(authUrl);  
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;  
  
    try {
      const response = await axios.post('https://anilist.co/api/v2/oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code: code,  
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  
      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);
      res.send(`Access Token: ${accessToken}`);  
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
      res.status(500).send('Error exchanging authorization code for access token.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

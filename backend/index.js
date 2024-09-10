const express = require('express');
const axios = require('axios');
const { createHandler } = require('graphql-http/lib/use/express');
const { getAnimeByTitle } = require('./anilistService');
const schema = require('./schema/schema');
const { graphql } = require('graphql');
require('dotenv').config();

const app = express();

const ANI_LIST_AUTH_URL = 'https://anilist.co/api/v2/oauth/authorize';
const CLIENT_ID = process.env.CLIENT_ID;  
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use('/graphql', createHandler({ schema }));

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
        }, 
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        });
  
        const accessToken = response.data.access_token;
        const animeTitle = 'Attack on Titan';  // Example title
        const animeData = await getAnimeByTitle(animeTitle, accessToken);

        const mutation = `
            mutation {
                addAnime(
                    anime_id: ${animeData.id},
                    name: "${animeData.title.english || animeData.title.romaji}",
                    cover_image: "${animeData.coverImage.extraLarge}",
                    episode_duration: ${animeData.duration || 0},
                    episode_count: ${animeData.episodes || 0},
                    start_date: "${animeData.startDate ? `${animeData.startDate.year}-${animeData.startDate.month}-${animeData.startDate.day}` : null}",
                    end_date: "${animeData.endDate ? `${animeData.endDate.year}-${animeData.endDate.month}-${animeData.endDate.day}` : null}",
                    year: ${animeData.seasonYear || 0},
                    season: "${animeData.season || ''}",
                    animation_studio: "${animeData.studios.nodes.length > 0 ? animeData.studios.nodes[0].name : ''}",
                    format: "TV Show"
                ) {
                    anime_id
                    name
                }
            }
        `;

        const result = await graphql({schema, source: mutation});

        if (result.errors) {
            console.error('Error inserting anime via GraphQL:', result.errors);
            res.status(500).send('Error inserting anime into database.');
        }
        else {
            res.json({ success: true, data: result.data });
        }
    } 
    catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        res.status(500).send('Error exchanging authorization code for access token.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

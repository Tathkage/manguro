const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { getAuthUrl, exchangeCodeForToken } = require('./anilistAPI/anilistAuth');
const { getAllAnimeByPage } = require('./anilistAPI/anilistService');
const schema = require('./schema/schema');
const { graphql } = require('graphql');
require('dotenv').config();

const app = express();

app.use('/graphql', createHandler({ schema }));

app.get('/login', (req, res) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);  
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;  
  
    try {
        const accessToken = await exchangeCodeForToken(code);
        await getAllAnimeByPage(accessToken);
        res.json({ success: true, message: 'All anime inserted successfully!' });
    } 
    catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        res.status(500).send('Error exchanging authorization code for access token.');
    }
});

app.get('/animes', async (req, res) => {
    const query = `
        query {
            anime {
                anime_id
                romaji_name
                english_name
                native_name
                description
                cover_image
                trailer_url
                episode_duration
                episode_count
                start_date
                end_date
                year
                season
                animation_studio
                producers
                format
                source
            }
        }
    `;

    try {
        const result = await graphql({ schema, source: query });

        if (result.errors) {
            console.error('Error fetching anime data via GraphQL:', result.errors);
            res.status(500).send('Error fetching anime data.');
        } 
        else {
            res.json(result.data.anime);  
        }
    } catch (error) {
        console.error('Error executing GraphQL query:', error);
        res.status(500).send('Error executing GraphQL query.');
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

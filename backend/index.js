const express = require('express');
const session = require('express-session');
const { createHandler } = require('graphql-http/lib/use/express');
const { getAuthUrl, exchangeCodeForToken } = require('./anilistAPI/anilistAuth');
const { getAllAnimeByPage, getAllGenres, getAllTags } = require('./anilistAPI/anilistService');
const schema = require('./schema/schema');
const { graphql } = require('graphql');
require('dotenv').config();

const app = express();

app.use(session({
    secret: 'tempSecretKey',
    resave: false,
    saveUninitialized: true
}));

app.use('/graphql', createHandler({ schema }));

app.get('/login', (req, res) => { //example login request: localhost:5000/login?type=anime
    const authUrl = getAuthUrl();
    const type = req.query.type || null;
    req.session.type = type;
    res.redirect(authUrl);  
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;  
    const type = req.session.type;
  
    try {
        const accessToken = await exchangeCodeForToken(code);

        if (type === 'anime') {
            // await getAllAnimeByPage(accessToken); //commented out to prevent accidently performing request
            res.json({ success: true, message: 'All anime inserted successfully!' });
        }
        else if (type === 'genres') {
            await getAllGenres(accessToken);
            res.json({ success: true, message: 'All genres inserted successfully!' });
        }
        else if (type === 'tags') {
            await getAllTags(accessToken);
            res.json({ success: true, message: 'All tags inserted successfully!' });
        }
        else if (type === null) {
            res.json({ success: false, message: 'No type provided.' });
        }
        else {
            res.json({ success: false, message: 'Invalid type provided.' });
        }
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

const express = require('express');
const session = require('express-session');
const { createHandler } = require('graphql-http/lib/use/express');
const { getAuthUrl, exchangeCodeForToken } = require('./anilistAPI/anilistAuth');
const schema = require('./schema/schema');
const { graphql } = require('graphql');
require('dotenv').config();

const { 
    getAllAnimeByPage, 
    getAllMangaByPage, 
    getAllGenres, 
    getAllTags, 
    getAllAnimeGenres, 
    getAllMangaGenres,
    getAllAnimeTags,
    getAllMangaTags
} = require('./anilistAPI/anilistService');

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
            await getAllAnimeByPage(accessToken); 
            res.json({ success: true, message: 'All anime inserted successfully!' });
        }
        else if (type === 'manga') {
            await getAllMangaByPage(accessToken);
            res.json({ success: true, message: 'All manga inserted successfully!'});
        }
        else if (type === 'genres') {
            await getAllGenres(accessToken);
            res.json({ success: true, message: 'All genres inserted successfully!' });
        }
        else if (type === 'tags') {
            await getAllTags(accessToken);
            res.json({ success: true, message: 'All tags inserted successfully!' });
        }
        else if (type === 'animegenres') {
            let result;
            const query = `
                query {
                    genre {
                        genre_id
                        name
                    }
                }
            `;

            try {
                result = await graphql({ schema, source: query });
                if (result.errors) {
                    console.error('Error fetching genre data via GraphQL:', result.errors);
                    res.status(500).send('Error fetching genre data.');
                }
            }
            catch (error) {
                console.error('Error executing GraphQl query:', error);
                res.status(500).send('Error executing GraphQl query.');
            }

            const genreMap = result.data.genre.reduce((map, genre) => {
                map[genre.name] = genre.genre_id;
                return map;
            }, {})

            await getAllAnimeGenres(accessToken, genreMap);
            res.json({ success: true, message: 'All anime_genres inserted successfully!' });
        }
        else if (type === 'mangagenres') {
            let result;
            const query = `
                query {
                    genre {
                        genre_id
                        name
                    }
                }
            `;

            try {
                result = await graphql({ schema, source: query });
                if (result.errors) {
                    console.error('Error fetching genre data via GraphQL:', result.errors);
                    res.status(500).send('Error fetching genre data.');
                }
            }
            catch (error) {
                console.error('Error executing GraphQl query:', error);
                res.status(500).send('Error executing GraphQl query.');
            }

            const genreMap = result.data.genre.reduce((map, genre) => {
                map[genre.name] = genre.genre_id;
                return map;
            }, {})

            await getAllMangaGenres(accessToken, genreMap);
            res.json({ success: true, message: 'All manga_genres inserted successfully!' });
        }
        else if (type === 'animetags') {
            let result;
            const query = `
                query {
                    tag {
                        tag_id
                        name
                    }
                }
            `;

            try {
                result = await graphql({ schema, source: query });
                if (result.errors) {
                    console.error('Error fetching tag data via GraphQL:', result.errors);
                    res.status(500).send('Error fetching tag data.');
                }
            }
            catch (error) {
                console.error('Error executing GraphQl query:', error);
                res.status(500).send('Error executing GraphQl query.');
            }

            const tagMap = result.data.tag.reduce((map, tag) => {
                map[tag.name] = tag.tag_id;
                return map;
            }, {})

            await getAllAnimeTags(accessToken, tagMap);
            res.json({ success: true, message: 'All anime_tags inserted successfully!' });
        }
        else if (type === 'mangatags') {
            let result;
            const query = `
                query {
                    tag {
                        tag_id
                        name
                    }
                }
            `;

            try {
                result = await graphql({ schema, source: query });
                if (result.errors) {
                    console.error('Error fetching tag data via GraphQL:', result.errors);
                    res.status(500).send('Error fetching tag data.');
                }
            }
            catch (error) {
                console.error('Error executing GraphQl query:', error);
                res.status(500).send('Error executing GraphQl query.');
            }

            const tagMap = result.data.tag.reduce((map, tag) => {
                map[tag.name] = tag.tag_id;
                return map;
            }, {})

            await getAllMangaTags(accessToken, tagMap);
            res.json({ success: true, message: 'All manga_tags inserted successfully!' });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

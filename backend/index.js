const express = require('express');
const session = require('express-session');
const { createHandler } = require('graphql-http/lib/use/express');
const { getAuthUrl, exchangeCodeForToken } = require('./anilistAPI/anilistAuth');
const schema = require('./schema/schema');
const { graphql } = require('graphql');
require('dotenv').config();

const { fetchAndInsertData } = require('./anilistAPI/anilistService');

const app = express();

app.use(session({
    secret: 'tempSecretKey',
    resave: false,
    saveUninitialized: true
}));

app.use('/graphql', createHandler({ schema }));

async function executeGraphQLQuery(query, res) {
    try {
        const result = await graphql({ schema, source: query });
        if (result.error) {
            console.error('GraphQL error:', result.errors);
            res.status(500).send('Error executing GraphQL query');
            return null;
        }
        return result.data;
    }
    catch (error) {
        console.error('GraphQL execution error:', error);
        res.status(500).send('Error executing GraphQL query.');
        return null;
    }
}

app.get('/login', (req, res) => { //example login request: localhost:5000/login?type=anime
    const authUrl = getAuthUrl();
    req.session.type = req.query.type || null;
    res.redirect(authUrl);  
});

app.get('/callback', async (req, res) => {
    const { code } = req.query;
    const { type } = req.session;

    if (!type) {
        return res.json({ success: false, message: 'No type provided' });
    }

    try {
        const accessToken = await exchangeCodeForToken(code);

        let query = '';
        let mapField = '';

        if (['animegenres', 'mangagenres'].includes(type)) {
            query = `query { genre { genre_id name } }`;
            mapField = 'genre';
        }
        else if (['animetags', 'mangatags'].includes(type)) {
            query = `query { tag { tag_id name } }`;
            mapField = 'tag';
        }

        const data = query ? await executeGraphQLQuery(query, res) : null;
        const dataMap = data ? data[mapField].reduce((map, item) => {
            map[item.name] = item[`${mapField}_id`];
            return map;
        }, {}) : null;

        await fetchAndInsertData(type, accessToken, dataMap);
        res.json({ success: true, message: `${type} inserted successfully!` });
    }
    catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        res.status(500).send('Error exchanging authorization code for access token.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

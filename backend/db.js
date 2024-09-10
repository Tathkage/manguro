const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
});

async function insertAnime(anime) {
    const query = `
        INSERT INTO public.anime (anime_id, name, cover_image, episode_duration, episode_count, start_date, end_date, year, season, animation_studio, format)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (anime_id) DO NOTHING;
    `;

    const values = [
        anime.id,
        anime.title.english,
        anime.coverImage.extraLarge,
        anime.duration,
        anime.episodes,
        anime.startDate ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : null,
        anime.endDate ? `${anime.endDate.year}-${anime.endDate.month}-${anime.endDate.day}` : null,
        anime.seasonYear,
        anime.season,
        anime.studios.nodes.length > 0 ? anime.studios.nodes[0].name : null,
        'TV Show',
    ];

    console.log(values);

    try {
        await pool.query(query, values);
        console.log(`Anime ${anime.title.romaji || anime.title.english} inserted into the database.`);
    } 
    catch (err) {
        console.error('Error inserting anime into the database:', err);
    }
}

module.exports = { pool, insertAnime };

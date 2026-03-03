const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3002;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/api/count', async (req, res) => {
    const result = await pool.query('SELECT val FROM counter LIMIT 1');
    res.json({ count: result.rows[0]?.val || 0 });
});

app.post('/api/increment', async (req, res) => {
    await pool.query('UPDATE counter SET val = val + 1');
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Backend on ${port}`));
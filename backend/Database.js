const { Pool } = require('pg');

class Database {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }

    async query(text, params) {
        return this.pool.query(text, params);
    }

    async init() {
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await this.query(createTableQuery);
        console.log("✅ Database Table Ready");
    }
}

module.exports = new Database();
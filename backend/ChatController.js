const db = require('./Database');

class ChatController {
    async getMessages(req, res) {
        try {
            const { rows } = await db.query('SELECT * FROM messages ORDER BY created_at ASC');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async saveMessage(req, res) {
        try {
            const { content } = req.body;
            if (!content) return res.status(400).json({ error: "Content is required" });

            await db.query('INSERT INTO messages (content) VALUES ($1)', [content]);
            res.status(201).json({ message: "Message saved" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ChatController();
const express = require('express');
const cors = require('cors');
const db = require('./Database');
const chatController = require('./ChatController');

const app = express();

// 1. CORS is first
app.use(cors());

// 2. Body Parser is second
app.use(express.json());

// 3. Routes
app.get('/api/messages', (req, res) => chatController.getMessages(req, res));
app.post('/api/messages', (req, res) => chatController.saveMessage(req, res));

const PORT = 5000;

// Start server after DB init
const start = async () => {
    let authenticated = false;
    const maxRetries = 10;
    let delay = 2000; // 2 seconds

    console.log("⏳ Waiting for database to be ready...");

    for (let i = 0; i < maxRetries; i++) {
        try {
            await db.init();
            authenticated = true;
            console.log("✅ Database connected!");
            break;
        } catch (err) {
            console.log(`⚠️ Connection attempt ${i + 1} failed. Retrying in ${delay / 1000}s...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }

    if (!authenticated) {
        console.error("❌ Could not connect to database after multiple attempts.");
        process.exit(1);
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Backend listening on port ${PORT}`);
    });
};

start();

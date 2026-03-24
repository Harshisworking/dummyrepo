class ChatService {
    constructor() {
        // 1. Get the base URL and strip any accidental trailing slashes
        const base = process.env.NEXT_PUBLIC_API_URL;
        const normalizedBase = base ? base.replace(/\/$/, "") : "";

        /**
         * 2. Construct the API endpoint. 
         * Note: If your backend routes are already prefixed with /api, 
         * this results in .../projectName-api/api/messages.
         */
        this.apiUrl = `${normalizedBase}/api/messages`;

        // Logging for your debugging (check the browser console!)
        console.log(`[Olivia] ChatService initialized. Target: ${this.apiUrl}`);
    }

    /**
     * Fetches all messages from the database via the API-Server
     */
    async fetchMessages() {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("❌ [ChatService] Failed to fetch messages:", error.message);
            // Return empty array so the UI doesn't break
            return [];
        }
    }

    /**
     * Sends a new message to the API-Server
     * @param {string} content - The text message to save
     */
    async sendMessage(content) {
        if (!content || content.trim() === "") return;

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ content: content.trim() }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Post failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("❌ [ChatService] Failed to send message:", error.message);
            throw error; // Re-throw so the UI can show an error toast/message
        }
    }
}

// Singleton instance to ensure consistent state across the app
const chatServiceInstance = new ChatService();
export default chatServiceInstance;

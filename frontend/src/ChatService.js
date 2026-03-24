class ChatService {
    constructor() {
        this.apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/messages`;
    }

    async fetchMessages() {
        const response = await fetch(this.apiUrl);
        return response.json();
    }

    async sendMessage(content) {
        await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
    }
}

const chatServiceInstance = new ChatService();
export default chatServiceInstance;

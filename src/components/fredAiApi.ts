import { type Conversation } from './fredAiApi.models';

const api_endpoint = process.env.NEXT_PUBLIC_FREDAI_ENDPOINT || '';

export const postMessage = async (message: string): Promise<string> => {
    try {
        const response = await fetch(`${api_endpoint}/get`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''}`,
                'Content-Type': 'application/json'
            },
            body: `(fred "${message}")`
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
        return data as string;
    } catch (err) {
        return `Error contacting FredAI`
    }
}

export const getConversation = async (): Promise<Conversation> => {
    try {
        const response = await fetch(`${api_endpoint}/conversation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json() as Conversation;
        return data;
    } catch (err) {
        return [];
    }
}
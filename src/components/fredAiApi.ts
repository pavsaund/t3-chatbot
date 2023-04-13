import { type Conversation } from './fredAiApi.models';

export const API_ENDPOINT = process.env.NEXT_PUBLIC_FREDAI_ENDPOINT || '';
export const WEBSOCKET_ENDPOINT = process.env.NEXT_PUBLIC_FREDAI_WEBSOCKET_ENDPOINT || '';

export const getConversation = async (): Promise<Conversation> => {
    try {
        const response = await fetch(`${API_ENDPOINT}/conversation`, {
            method: 'GET',
            mode: 'no-cors',
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
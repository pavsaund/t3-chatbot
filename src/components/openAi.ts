export const postOpenAIMessage = async (prompt: string): Promise<string> => {
    try {

        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50,
                n: 1,
                stop: '\n',
            })
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (data && data.error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const err = data as ErrorMessage;
            return `Error: ${err.error.message || ""}`
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const message = data.choices[0].text.trim();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return message;
    } catch (err) {
        return `Error contacting OpenAI`
    }
}
export type ErrorMessage = {
    error: {
        message?: string;
        code?: string;
        param?: string;
        type?: string;
    }
};
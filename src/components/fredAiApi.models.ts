export type Message = {
    role: "user" | "assistant";
    content: string;
};

export type SessionMessage = [string, Message];
export type InitialMessage = [string, Message[]];

export type Conversation = SessionMessage[];
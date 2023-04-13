import React, { useCallback, useState, useEffect } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, type MessageModel } from '@chatscope/chat-ui-kit-react';
import { type Conversation, type Message as FredMessage } from '~/components/fredAiApi.models';
import { WEBSOCKET_ENDPOINT, getConversation } from '~/components/fredAiApi';
import useWebSocket from 'react-use-websocket';


export default function Chat() {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messageHistory, setMessageHistory] = useState<Conversation>([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_ENDPOINT);

    const fetchData = useCallback(async () => {
        const conversation = await getConversation();
        setMessageHistory(conversation);

        const messages: MessageModel[] = conversation.map((message) => ({
            message: message.content,
            sender: message.role == 'assistant' ? "Fred" : "You",
            direction: message.role == 'assistant' ? "incoming" : "outgoing",
            position: "single"
        }));
        setMessages(messages);
    }, []);

    useEffect(() => {
        fetchData()
            .catch((err) => console.error(err));
    }, [fetchData]);

    useEffect(() => {
        if (lastMessage !== null) {
            const message = lastMessage as unknown as FredMessage;
            setMessageHistory((prev) => prev.concat(message));
            setMessages((messages) => [
                ...messages,
                {
                    message: message.content,
                    sender: "Fred",
                    direction: "incoming",
                    position: "single"
                }
            ]);
        }
    }, [lastMessage, setMessageHistory]);

    const postMessage = useCallback((message: string) => {
        setMessages((messages) => [
            ...messages,
            {
                message: message,
                sentTime: "just now",
                sender: "You",
                direction: "outgoing",
                position: "single"
            }
        ]);
        sendMessage(message);
    }, [sendMessage]);

    return (
        <div style={{ position: "relative", height: "500px" }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                model={message}
                            />
                        ))}
                    </MessageList>
                    <MessageInput
                        attachButton={false}
                        placeholder="Type message here"
                        onSend={(innerHtml, textContent, innerText, nodes) => {
                            console.log(innerHtml, textContent, innerText, nodes);
                            void postMessage(innerText);
                        }} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}
import React, { useCallback, useState, useEffect } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, type MessageModel } from '@chatscope/chat-ui-kit-react';
import { InitialMessage, type Conversation, type SessionMessage, type Message as FredMessage } from '~/components/fredAiApi.models';
import { WEBSOCKET_ENDPOINT, getConversation } from '~/components/fredAiApi';
import useWebSocket, { ReadyState } from 'react-use-websocket';




export default function Chat() {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    const [sessionId] = useState<string>('e0b61253-0d04-402a-90c3-baf134857f41');
    // const [messageHistory, setMessageHistory] = useState<Conversation>([]);

    const { sendMessage, lastJsonMessage, readyState } = useWebSocket(WEBSOCKET_ENDPOINT);

    const setMessagesFromInitialData = (conversationMessages: FredMessage[]) => {
        const messages: MessageModel[] = conversationMessages.map((message) => ({
            message: message.content,
            sender: message.role == 'assistant' ? "Fred" : "You",
            direction: message.role == 'assistant' ? "incoming" : "outgoing",
            position: "single"
        }));
        setMessages(messages);
    }

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendMessage(`("${sessionId}" (conversation))`);
        }
    }, [readyState, sessionId, sendMessage]);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            const [, message] = lastJsonMessage as SessionMessage | InitialMessage;
            if (Array.isArray(message)) {
                const [, initialMessage] = lastJsonMessage as InitialMessage;
                setMessagesFromInitialData(initialMessage);
            } else {
                const [, message] = lastJsonMessage as SessionMessage;
                // setMessageHistory((prev) => prev.concat(message));
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
        }
    }, [lastJsonMessage]);

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
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-call
        sendMessage(`("${sessionId}" (fred "${message}"))`);
    }, [sendMessage, sessionId]);

    return (
        <div style={{ position: "relative", height: "500px" }}>
            <div className='p-4'>
                <h1 className='text-xl'>Wilma</h1>
                <p>The domain learning system, where an expert can share their knowledge about a domain!</p>
            </div>
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
                            void postMessage(innerText);
                        }} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}



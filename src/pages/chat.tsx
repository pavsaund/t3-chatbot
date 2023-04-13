import React, { useState } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, type MessageModel } from '@chatscope/chat-ui-kit-react';
import { postCompletion, postOpenAIMessage } from '~/components/openAi';


export default function Chat() {
    const [messages, setMessages] = useState<MessageModel[]>([
        {
            message: "Hello my friend",
            sentTime: "just now",
            sender: "Joe",
            direction: "incoming",
            position: "single"
        },
        {
            message: "Hello my friend",
            sentTime: "just now",
            sender: "Joe",
            direction: "outgoing",
            position: "single",
        }
    ]);

    const sendMessage = async (message: string) => {
        setMessages((messages)=>[
            ...messages,
            {
                message: message,
                sentTime: "just now",
                sender: "Joe",
                direction: "outgoing",
                position: "single"
            }
        ]);
        // const result = await postOpenAIMessage(message);
        const result = await postCompletion(message);
        setMessages((messages)=>[
            ...messages,
            {
                message: result,
                sentTime: "just now",
                sender: "DomainGPT",
                direction: "incoming",
                position: "single",
            }
        ]);
    };

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
                            void sendMessage(innerText);
                        }} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}
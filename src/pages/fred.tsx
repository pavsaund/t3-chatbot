import React, { useState } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, type MessageModel } from '@chatscope/chat-ui-kit-react';
import { postCompletion, postOpenAIMessage } from '~/components/openAi';
import { type Conversation } from '~/components/fredAiApi.models';


export default function Chat() {
    const [conversation, setConversation] = useState<Conversation>();
    const [messages, setMessages] = useState<MessageModel[]>([]);



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
import React, { useState } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, type MessageModel } from '@chatscope/chat-ui-kit-react';
import { postCompletion, postCompletionWithPrompt, postOpenAIMessage } from '~/components/openAi';


export default function Chat() {
    const [messages, setMessages] = useState<MessageModel[]>([]);

    const sendMessage = async (message: string) => {
        setMessages((messages)=>[
            ...messages,
            {
                message: message,
                sentTime: "just now",
                sender: "You",
                direction: "outgoing",
                position: "single"
            }
        ]);
        // const result = await postOpenAIMessage(message);
        const result = await postCompletionWithPrompt(message);
        setMessages((messages)=>[
            ...messages,
            {
                message: result,
                sentTime: "just now",
                sender: "Betty",
                direction: "incoming",
                position: "single",
            }
        ]);
    };

    return (
        <div style={{ position: "relative", height: "500px" }}>
            <div className='p-4'>
                <h1 className='text-xl'>Betty</h1>
                <p>
                    The domain assistant where anyone can learn more about the domain from an expert trained AI!
                    Right now I only know about very specific table information in M3, but Im waiting to be trained by the expert system, Wilma.
                </p>
                <p className='mt-2'>Here you can ask specific questions about table information like MSUBTF or MUPSTR.</p>
            </div>
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                model={message}
                            >
                                <Message.Footer sender={message.sender}></Message.Footer>
                            </Message>
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
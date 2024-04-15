// components/MessageList.js
import {useEffect, useRef, useState} from 'react';

function MessageList({lastMsg, lastMsgEnd}) {
    const endRef = useRef(null);
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    useEffect(() => {
        if (!lastMsgEnd) {
            setMessages(messages + lastMsg)
        }
    }, [lastMsgEnd]);

    return (
        <div className="max-h-[400px] overflow-y-auto">
            {messages.map((msg, index) => (
                <div key={index} className={`p-2 ${index % 2 ? 'bg-gray-100' : 'bg-white'}`}>
                    {index % 2 ? "[you]: " : "[ai]: "}: {msg}
                </div>
            ))}
            <div key={messages.length + 1} className={`p-2 ${(messages.length + 1) % 2 ? 'bg-gray-100' : 'bg-white'}`}>
                {(messages.length + 1) % 2 ? "[you]: " : "[ai]: "}: {lastMsg}
            </div>
            <div ref={endRef}/>
        </div>
    );
}

export default MessageList;

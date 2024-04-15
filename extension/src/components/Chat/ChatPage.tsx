import MessageList from '~components/Chat/MessageList';
import { useState } from 'react';

function ChatPage({ lastRole, lastMsg, lastMsgEnd}) {
    const [messages, setMessages] = useState<string[]>([]);

    // 添加一些逻辑来处理消息的接收和发送

    return (
        <div className="p-4">
        <MessageList lastMsg={lastMsg} lastMsgEnd={lastMsgEnd} />
    </div>
);
}

export default ChatPage;

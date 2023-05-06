import ChatBox from "./components/chatbox/chatbox";
import Conversations from "./components/conversations/conversations";

const Chat = () => {
  return <div className="w-full bg-zinc-950 h-full grid grid-cols-12">
    <Conversations />
    <ChatBox />
  </div>;
};

export default Chat;

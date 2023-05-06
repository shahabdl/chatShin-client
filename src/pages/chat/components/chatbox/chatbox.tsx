import ChatInputBox from "./chat-input-box";
import ChatView from "./chat-view";

const ChatBox = () => {
  return (
    <div className="w-full h-full bg-zinc-900 col-span-9">
      <div className="h-[60px] bg-zinc-800 w-full text-sm font-light grid items-center px-4 py-2 border-l-[1px] border-l-zinc-700">
        <h2>Shirin</h2>
        <p>last seen: Recently</p>
      </div>
      <ChatView />
      <ChatInputBox />
    </div>
  );
};
export default ChatBox;

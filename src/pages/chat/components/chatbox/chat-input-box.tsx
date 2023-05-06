const ChatInputBox = () => {
    return <div className="h-[50px] bg-zinc-800 bottom-0 relative px-3 grid items-center">
        <input type="text" placeholder="Message" className="bg-transparent h-[35px] w-full focus-visible:outline-none focus-visible:bg-zinc-900 px-2 rounded-lg text-sm font-light"/>
    </div>
}

export default ChatInputBox
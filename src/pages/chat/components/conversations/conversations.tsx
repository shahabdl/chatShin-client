import { useState } from "react";
import ConversationListItem from "./coversation-list-item"

const Conversations = ()=>{
    const [lastSelectedItem,setLastSelectedItem ]= useState("");
    const conversationClickHandler = (id:string)=>{
        console.log(id);
        setLastSelectedItem(id);
    }

    return <div className="bg-zinc-800 h-full col-span-3">
        <div className="h-[60px] bg-zinc-800 flex gap-3 p-3 items-center justify-center border-b-[1px] border-b-zinc-600">
            <button className="text-zinc-400 hover:text-white transition-colors">...</button>
            <input type="text" placeholder="Search" className="bg-transparent w-full border-[1px] border-zinc-700 rounded-lg h-[32px] text-sm font-light focus-visible:outline-none focus-visible:bg-zinc-950 px-2 transition-colors" />
        </div>
        <div>
            <ConversationListItem name="Shirin" lastDate="11:03 AM" lastMessage="سلام عمو" readStatus={true} conversationId="id1" onClick={conversationClickHandler} selected={true}/>
            <ConversationListItem name="Amoo" lastDate="12:44 AM" lastMessage="سلام سلام" readStatus={true} conversationId="id2" onClick={conversationClickHandler} selected={false}/>
        </div>
    </div>
}

export default Conversations
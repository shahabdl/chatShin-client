interface ConversationListItemProps {
  name: string;
  lastDate: string;
  readStatus: boolean;
  lastMessage: string;
  conversationId: string;
  selected: boolean;
  onClick: (id: string) => void;
}

const ConversationListItem = ({
  name,
  lastDate,
  readStatus,
  lastMessage,
  conversationId,
  selected,
  onClick,
}: ConversationListItemProps) => {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(conversationId);
  };
  return (
    <div
      className={`h-[60px] ${
        selected ? "bg-zinc-700" : "bg-transparent"
      } hover:bg-zinc-700 p-[5px] flex justify-center items-center`}
      onClick={clickHandler}
    >
      <div className="rounded-full bg-red-500 w-[50px] h-[50px]"></div>
      <div className="w-[calc(100%-50px)] h-full grid">
        <div className="flex px-2 relative">
          <h3 className="text-sm font-light">{name}</h3>
          <div className="flex gap-2 text-sm font-light ml-auto">
            <p>{readStatus ? "r" : "n"}</p>
            <p>{lastDate}</p>
          </div>
        </div>
        <div className="text-sm font-light px-2 bottom-0 relative">
          {lastMessage}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;

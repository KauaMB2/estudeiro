import Chat from "@/app/_components/dashboard/chat/Chat";

const ChatPage = ({ params }: { params: { id: string } }) => {
  return (
    <Chat id={params.id} />
  )
}

export default ChatPage
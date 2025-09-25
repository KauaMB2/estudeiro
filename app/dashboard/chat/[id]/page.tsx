import Chat from "@/app/_components/dashboard/chat/Chat";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <Chat id={id} />
  )
}

export default ChatPage
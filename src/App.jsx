import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

function App() {
  const [chats, setChats] = useState([
    { id: 1, name: "Default Chat", messages: [] },
  ]); // Danh sách các cuộc trò chuyện
  const [activeChatId, setActiveChatId] = useState(1); // Cuộc trò chuyện hiện tại

  const handleNewChat = () => {

    const currentChat = chats.find((chat) => chat.id === activeChatId);

    const newChat = {
      id: Date.now(), // Tạo ID duy nhất
      name: `New Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats((prevChats) => {
      // Nếu cuộc trò chuyện hiện tại chưa lưu thì thêm vào danh sách
      const updatedChats = currentChat
        ? [...prevChats.filter((chat) => chat.id !== activeChatId), currentChat]
        : [...prevChats];

      // Đẩy chat mới lên đầu
      return [...updatedChats, newChat];
    });
    setActiveChatId(newChat.id); // Đặt cuộc trò chuyện vừa tạo là cuộc trò chuyện hiện tại
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  return (
    <>
        {/* Truyền danh sách các cuộc trò chuyện và sự kiện */}
        <Sidebar
            chats={chats}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            activeChatId={activeChatId}
        />
        {/* Hiển thị cuộc trò chuyện đang active */}
        <Main
            activeChat={chats.find((chat) => chat.id === activeChatId)}
            onUpdateMessages={(messages) => {
                setChats((prevChats) =>
                    prevChats.map((chat) =>
                        chat.id === activeChatId ? { ...chat, messages } : chat
                    )
                );
            }}
        />
    </>
);
}

export default App;

import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "/src/context/UserDataContext"; 
import { db } from "/src/services/Firebase/firebase-config"; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, limit,} from "firebase/firestore";
import { Message } from "../Components/Message";
import { MessageInput } from "../Components/MessageInput";
import "./ChatMaya.css";
import { Navbar } from "../../../components/Layouts/NavBar/Navbar";

const defaultPicture = "/src/assets/images/avatar.png";

export const ChatMaya = () => {
  const { data: currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "chats");
    const q = query(messagesRef, orderBy("timestamp", "asc"), limit(100));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAutoScroll) {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    const container = endOfMessagesRef.current?.parentNode;
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
      setIsAutoScroll(isNearBottom);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "" && currentUser) {
      try {
        const username = currentUser?.displayName || "Usuario Anónimo";
        const profilePicture = currentUser.profilePicture || defaultPicture;
        await addDoc(collection(db, "chats"), {
          text: newMessage,
          uid: currentUser.uid,
          username: username,
          displayName: username,
          profilePicture: profilePicture,
          timestamp: serverTimestamp(),
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };


  return (
    <div className="chat-container">
       <Navbar />
      <h1 className="fixed-title p-2 mt-2">
        <i className="bi bi-chat-fill me-2"></i>Live Chat
      </h1>

      <div className="chat-box">
        <div className="messages-container overflow-auto" onScroll={handleScroll}>
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} currentUser={currentUser} />
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="message-input-container">
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "/src/context/UserDataContext"; 
import { db } from "/src/services/Firebase/firebase-config"; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp,} from "firebase/firestore";
import { Message } from "../Components/Message";
import { MessageInput } from "../Components/MessageInput";
import "./ChatTitanic1.css";
import { Navbar } from "../../../components/Layouts/NavBar/Navbar";

export const ChatTitanic1 = () => {
  const { data: currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");



  useEffect(() => {
    const messagesRef = collection(db, "chat-titanic1");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "" && currentUser) {
      try {
        const username = currentUser?.displayName || "Usuario Anónimo";
        const profilePicture =
          currentUser.profilePicture || "/src/assets/images/avatar.png";
        await addDoc(collection(db, "chat-titanic1"), {
          text: newMessage,
          uid: currentUser.uid,
          username: username,
          profilePicture: profilePicture,
          timestamp: serverTimestamp(),
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <Navbar />
      <h1 className="fixed-title p-2 mt-2">
        <i className="bi bi-chat-fill me-2"></i>Live Chat
      </h1>
      <div className="chat-box">
        <div className="messages-container overflow-auto">
          {messages.map((msg, index) => (
            <Message key={index} msg={msg} currentUser={currentUser} />
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

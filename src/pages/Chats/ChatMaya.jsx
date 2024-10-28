import { useState, useContext, useEffect } from 'react';
import { UserContext } from '/src/context/UserDataContext'; // Asegúrate de tener el UserContext
import { db } from '/src/services/Firebase/firebase-config'; // Importa tu configuración de Firebase
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Message } from './Components/Message';
import { MessageInput } from './Components/MessageInput';
import './ChatMaya.css'
import { Navbar } from '../../components/Layouts/NavBar/Navbar';

export const ChatMaya = () => {
  const { data: currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Escuchar cambios en la colección de mensajes en Firestore
  useEffect(() => {
    const messagesRef = collection(db, 'chats');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  // Función para manejar el envío de mensajes
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== '' && currentUser) {
      try {
        const username = currentUser.displayName || 'Usuario Anónimo';
        await addDoc(collection(db, 'chats'), {
          text: newMessage,
          uid: currentUser.uid,
          username: username,
          timestamp: new Date(),
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  return (


<div className="chat-container">
  <h1 className="fixed-title p-2">
  <Navbar/>
    <i className="bi bi-chat-fill me-2"></i>Live Chat
  </h1>
  <div className="chat-box">
    <div className="messages-container">
      {messages.map((msg, index) => (
        <Message key={index} msg={msg} currentUser={currentUser} />
      ))}
    </div>
    
    <div className='message-input-container'>
    <MessageInput newMessage={newMessage} setNewMessage={setNewMessage} handleSubmit={handleSubmit} />
    </div>
    
  
</div>
</div>


  );
};

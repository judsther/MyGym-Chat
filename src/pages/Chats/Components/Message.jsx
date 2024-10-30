/* eslint-disable react/prop-types */


export const Message = ({ msg, currentUser }) => {
  return (
    <div className={`d-flex ${msg.uid === currentUser?.uid ?  'justify-content-end' : 'justify-content-start'} mb-3 animate__animated animate__fadeIn`}>
      <div className={`p-3 rounded ${msg.uid === currentUser?.uid ? 'bg-success text-white' : 'bg-dark text-light'}`} style={{ maxWidth: '75%' }}>

         <img 
          src={msg.profilePicture || 'url-de-avatar-por-defecto'}
          alt="Avatar"
          className="rounded-circle me-2"
          style={{ width: '30px', height: '30px' }}
        />
        <strong>{msg.username}</strong>: {msg.text}
      </div>


    </div>
  );
};


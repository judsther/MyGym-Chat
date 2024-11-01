/* eslint-disable react/prop-types */

export const MessageInput = ({ newMessage, setNewMessage, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2 animate__animated animate__slideInUp"
        placeholder="Escribe tu mensaje..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{
          backgroundColor: "rgb(235, 231, 150)",
          color: "rgb(44, 44, 44)",
        }}
      />
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-send-fill"></i> Enviar
      </button>
    </form>
  );
};



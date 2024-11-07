/* eslint-disable react/prop-types */


export const Message = ({ msg, currentUser }) => {

  const formattedTime = msg.timestamp
  ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "";

  return (
    <div>
    <div
      className={`d-flex ${
        msg.uid === currentUser?.uid
          ? "justify-content-end"
          : "justify-content-start"
      } mb-3 animate__animated animate__fadeIn`}
    >
      <div
        className={`pb-1 pt-2 ps-2 pe-2 rounded ${
          msg.uid === currentUser?.uid
            ? "bg-success text-white"
            : "bg-dark text-light"
        }`}
        style={{ maxWidth: "75%" }}
      >
        
        <img
          src={msg.profilePicture || "/src/assets/images/avatar.png"}
          alt="Avatar"
          className="rounded-circle me-2"
          style={{ width: "30px", height: "30px" }}
        />

        <strong>{msg.username}</strong>: {msg.text}
   
    <div
      className={`d-flex ${
        msg.uid === currentUser?.uid
          ? "justify-content-end"
          : "justify-content-end"
      }  animate__animated animate__fadeIn`}
    >
      <div
        className={` ${
          msg.uid === currentUser?.uid
            ? "text-dark"
            : "text-light"
        }`} style={{ fontSize: "0.70rem" }}
      >

{formattedTime}

        </div>
        </div>
        </div>
        </div>

    </div>
  );
};


/* eslint-disable react/prop-types */
import { useState } from 'react';
import './ProfilePicture.css'
export const ProfilePicture = ({ user }) => {

const [image, setImage] = useState(user.profilePicture || '/src/assets/images/avatar.png'); // URL de la imagen predeterminada

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Actualiza el estado con la nueva imagen
      };
      reader.readAsDataURL(file); // Lee la imagen como URL
    }
  };

  return (
    <div className="avatar-container">
      <img src={image} alt="Avatar" className="avatar" />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} // Ocultar el input
        id="avatar-upload"
      />
      <label htmlFor="avatar-upload" className="edit-icon">
        <i className='bi bi-pencil-fill'></i>
      </label>
    </div>
  );
};



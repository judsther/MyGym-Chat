
import { useContext, useEffect, useState } from 'react';
import './ProfilePicture.css'
import { doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../../../context/UserDataContext';
import { db, storage } from '../../../services/Firebase/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


export const ProfilePicture = () => {

const { data , setData } = useContext(UserContext);
const [image, setImage] = useState(data?.profilePicture || '/src/assets/images/avatar.png'); // URL de la imagen predeterminada
const userId = data?.uid;

useEffect(() => {
  if (data) {
    setImage(data.profilePicture || '/src/assets/images/avatar.png');
  }
}, [data]);

  const handleImageChange = async (event) => {

    const file = event.target.files[0];
    if (!file) return;

      try{
        const storageRef = ref(storage, `profilePicture/${userId}`)
        const snapshot = await uploadBytes(storageRef, file);
        const pictureURL = await getDownloadURL(snapshot.ref);

        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef,{
          profilePicture: pictureURL,
        });
        setImage(pictureURL);
        setData((prevData) => ({ ...prevData, profilePicture:pictureURL}));

      alert("Imagen de perfil actualizada correctamente")

      } catch (error){
        console.error("error al subir:", error);
        
      }
  
    
  }
 


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



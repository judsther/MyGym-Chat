import { useContext, useEffect } from "react"
import { Navbar } from "../../components/Layouts/NavBar/Navbar"
import { UserContext } from "../../context/UserDataContext";
import { Home } from "../Home/Home";
import  maya from '/src/assets/images/maya.jpg'
import { auth } from "../../services/Firebase/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "../../hooks/LogOut/LogOut";
import './Welcome.css'
import { ProfilePicture } from "./components/ProfilePicture";



export const Welcome = () => {

  const {data,setData} = useContext(UserContext);
  const navigate = useNavigate();
 
    const user = {
      profilePicture: data?.profilePicture, 
    
    }


  useEffect(() => {
    auth.onAuthStateChanged((data) => {
      if (!data) {
        navigate('/'); 
        return <p>Loading...</p>;
      }
    });
  }, [navigate, setData]);

  


  return (
    <div>
      { data ?
      <>
      <Navbar />
      <div className="container mt-5 pt-5 text-center">
      <h1>¡Hola, {data?.username}!</h1> 
      <h4>¿A qué gimnasio perteneces?</h4>

 <ProfilePicture user={user?.profilePicture} />

      {/*Cards para dirigir a los chats de los difrentes gimnasios inscritos */}
      <br />
      <hr />
      <br />
      <div className="d-flex text-center align-items-center justify-content-center">
      <div className="card d-flex align-items-center" style={{width: '18rem'}}>
      <img src={maya} alt="Logo" width="200" className="d-inline-block m-3 mayaimg" />
      <div className="card-body">
      <h5 className="card-title">Gym Maya</h5>
      <p className="card-text">8a calle pte. # 23 Barrio San Juan de Dios. 1701 San Vicente, El Salvador</p>
      <Link to={'/ChatMaya'} className="btn btnchat">Unirme al chat</Link>
      </div>
      </div>
      </div>


    
      <div className="d-flex align-items-end flex-column mb-3" style={{ height: '100px' }}  >
      <LogOut/>
      </div>
      </div>
      </>
      
      :
      <Home />
      }

    </div>
  )
}




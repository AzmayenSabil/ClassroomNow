import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  
  return (
    <div className='top'>
        {/* <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-twitter-square"></i>
        <i className="topIcon fa-brands fa-pinterest-square"></i>
        <i className="topIcon fa-brands fa-instagram-square"></i>
        </div> */}
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
                <li className="topListItem"><Link className="link" to="/notice">NOTICE</Link></li>
                <li className="topListItem"><Link className="link" to="/chat">{user && (user.role==="CR" || user.role==="Student")&& "CHAT"}</Link></li>
                <li className="topListItem"><Link className="link" to="/routine">{user && (user.role==="CR" || user.role==="Student")&& "ROUTINE"}</Link></li>
                <li className="topListItem"><Link className="link" to="/write"> {user && (user.role==="CR" || user.role==="Faculty")&& "WRITE"}</Link></li>
                <li className="topListItem"><Link className="link" to="/settings">SETTINGS</Link></li>
                <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
            </ul>
        </div>
        <div className="topRight">
          {
            // console.log(user.name)
            //user?(<img className="topImg" src={user.profilePic} alt="profile pic " />)
            user?(<h2 className="username">{user.username}</h2>)
            :(
              <ul className="topList">
                <li className="topListItem"> <Link className="link" to="/login">LOGIN</Link></li>
                <li className="topListItem"><Link className="link" to="/register">REGISTER</Link> </li>
              </ul>
            )
            
          }   
            
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
      
    </div>
  )
}
 
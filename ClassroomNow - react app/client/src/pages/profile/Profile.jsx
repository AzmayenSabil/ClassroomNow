import { useEffect, useState } from "react";


import "./profile.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Profile() {

 
  return (
    <>
      
      <div className="profile">
         
      <div className="headerTitles">

        <div className="test">
          <div>
            <span className="headerTitleSm"><h1 className="sabil">Welcome to ClassroomNow</h1></span>
          </div>
          
          <img src="https://i.ibb.co/jknx048/landing-img.png" alt="" />
        
          {/* https://ibb.co/v40ryzc"><img src="https://i.ibb.co/jknx048/landing-img.png */}
        
        </div>



          
          
          {/* <span className="headerTitleLg">CLASS_ROOM_NOW</span> */}
      </div>
        
      </div>
    </>
  );
}
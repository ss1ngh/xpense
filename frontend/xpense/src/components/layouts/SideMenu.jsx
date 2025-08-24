import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activemenu }) => {
  const {user, clearuser} = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleClick = (route) => {
    if(route == "logout") {
      handleLogout(); 
      return;
    }
    navigate(route);
  }

  const handleLogout = () => {
    localStorage.clear();
    clearuser();
    navigate("/login");
  };

  return <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'> 
    <div className=''>
      {user?.profileImage ? (
        <img
        src={user?.profileImageUrl || ""}
        alt= "Profile Image"
        className='w-20 h-20 bg-slate-400 rounded-full'
        />): <></>}

      <h5 className='text-gray-950 font-medium leading-6'>
        {user?.fullName || ""}
      </h5>
    </div>

    {SIDE_MENU_DATA.map((item, index) => (
      <button 
      key={`menu_${index}`}
      className={`w-full flex items-center gap-4 text-[15px] ${
        activemenu == item.label ? "text-white bg-purple-500" : ""
      } py-3 px-6 rounded-lg mb-3`}
      onClick={() => handleClick(item.path)}
      >
        <item.icon className='text-xl' />
        {item.label}
      </button>
    ))}
  </div>
};

export default SideMenu
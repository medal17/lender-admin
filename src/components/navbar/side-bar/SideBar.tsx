import React, { useState } from "react";

import { RxDashboard } from 'react-icons/rx'
import { IoSettingsOutline } from "react-icons/io5";
import { SideNavButton } from "../../buttons/SideNavButton";
import './side-menu.css'
import WhiteLogo from '../../../assets/images/white-logo.png'
import { Wallet } from "../../../assets/icons/Wallet";
import { useRequest } from "../../../shared/hooks/useRequest";
import { ENDPOINTS } from "../../../shared/constants";
import { TbLogout2 } from "react-icons/tb";
import { CustomModal } from "../../modal";
import { Logout } from "../../cards/Logout";
import { login, logout } from "../../../shared/services/authentication";
import { useNavigate } from "react-router-dom";


interface sideBarModel {
  isOpen: boolean,
  toggle: Function,
  userDetails:any
}

const SideBar = (props: sideBarModel) => {
  const navigate = useNavigate()
  const [logOut, setLogout] = useState(false)
  const {userDetails} = props
  // const userDetails = useRequest(ENDPOINTS.GET_PROFILE,
  //   'get',
  //   'get-user-profile')?.data
  

  return <div className='w-[17.1%] bg-[#124630] bg-blend-multiply menu'>
    <div className="side-menu h-screen">
      <nav className="list-unstyled h-4/5 space-y-4 px-3">
        <img src={WhiteLogo} width={'60%'} className="mx-auto py-5" />
        <br />
        {menus.map(item =>
          <div>
            <SideNavButton
              key={item.title}
              otherTargets={item?.otherTargets}
              icon={item.icon}
              activeIcon={item.activeIcon}
              label={item.title}
              route={item.target}
            />
          </div>)}
        <br />
        <hr className="opacity-20 mt-auto" />
      </nav>
      
      <div className="border rounded-md border-opacity-30 border-grey mx-4 mt-auto">
        {otherMenus.map(item => item.title === 'Logout' ?
          <div className="" onClick={() => setLogout(true)}>
            <SideNavButton
              key={item.title}
              icon={item.icon}
              label={item.title}
              route={item.target}
              otherTargets={[]}
              // clickAction={}
            />
          </div> :
          <div className="" >
            
            <SideNavButton
              key={props.userDetails?.data?.firstName+' '+userDetails?.data?.lastName}
              icon={item.title==='Profile'?
              <img src={userDetails?.data?.avatar} 
              className="text-lg border h-8 w-8 rounded-full bg-darkGrey font-semibold" />
              :item.icon}
              label={item.title}
              activeIcon={item.title==='Profile'?
              <img src={userDetails?.data?.avatar} className="text-lg border h-8 w-8 rounded-full bg-darkGrey font-semibold" />
              :item.activeIcon}
              route={item.target}
              sub="Edit User Profile"

            />
            {item.title === 'Profile' && 
              <hr className="border-t w-10/12 mx-auto border-white border-opacity-30" />
            }
          </div>
        )}
      </div>
    </div>
    <CustomModal 
      status={logOut} 
      bgColor={""} 
      component={<Logout action={()=>logout(()=>navigate(window&& window.location.origin.includes('stagingapi')?'/login':'/'))} closeAction={()=>setLogout(false)}/>} 
      toggle={()=>setLogout(false)}
    />
  </div>
};


const menus = [
  {
    title: "Dashboard",
    target: "/dashboard",
    icon: <RxDashboard className="text-lg font-semibold" />,
    otherTargets: ['/dashboard/providers', '/dashboard/additional-info'],
    activeIcon: <RxDashboard className="text-lg text-white font-semibold" />
  },
  {
    title: "Wallet",
    target: "/dashboard/wallet",
    icon: <Wallet />,
    otherTargets: ['/dashboard/wallet', '/dashboard/additional-info'],
    activeIcon: <Wallet />
  }
];

const otherMenus = [
  {
    title: "Profile",
    target: "/dashboard/profile",
    icon: <img src={''} className="text-lg h-8 w-8 rounded-full bg-darkGrey font-semibold" />,
    activeIcon: <img src='' className="text-lg h-8 w-8 rounded-full bg-darkGrey font-semibold" />
  },
  {
    title: "Logout",
    target: "#",
    icon: <TbLogout2  className="text-[22px]" />,
    activeIcon: <TbLogout2 className="text-[22px]" />
    // action:()=>alert('')
  }
]


export default SideBar;

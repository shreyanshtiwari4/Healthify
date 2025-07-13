import {useEffect, useRef,useContext} from 'react';
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from 'react-router-dom';
import {BiMenu} from 'react-icons/bi';
import { authContext } from '../../context/AuthContext.jsx';

const navLinks = [
  {
    path:'/home',
    display:'Home',
  },
  {
    path:'/doctors',
    display:'Find a Doctor',
  },
  {
    path:'/services',
    display:'Services',
  },
  {
    path:'/contact',
    display: 'Contact',
  },
]

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user,role,token } = useContext(authContext);
  
  useEffect(() => {
    console.log(user, " current status of user");
  },[user]);

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    })
  }

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener('scroll', handleStickyHeader);
  })

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="w-[130px] h-auto">
            <img src={logo} alt="logo" className="w-full h-auto object-contain" />
          </div>
          {/* Navigation */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {
                navLinks.map((link, index) => 
                  <li key={index}>
                    <NavLink to={link.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 fint-[600'
                      : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>{link.display}
                      </NavLink>
                  </li>
                )
              }
            </ul>
          </div>
          
          {/* User & nav right*/}
          <div className='flex items-center gap-4'>
            { token && user ? (
              <div>
                <Link to={role === 'patient' ? '/users/profile/me' : '/doctors/profile/me'}>
                  <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                    <img src={user?.photo} className='w-full rounded-full' alt="" />
                  </figure>
                </Link>
              </div>
            ) : (
            <Link to='/login'>
              <button className="bg-primaryColor text-white text-[14px] leading-4 font-[600] h-[44px] py-2 px-6 items-center
              justify-center rounded-[50px]">
                Login
              </button>
            </Link>
            )} 
            
            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
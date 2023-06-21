import React, { useEffect } from "react";
import {frontend,backend, fullstack,Logo} from '../../asset/.';
import axios from "axios";
import { Link,useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../Store/CategorySlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const { data: category, loading, error } = useSelector((state) => state.category);
  const [openFrontend, setopenFrontend] = React.useState(false);
  const [openBackend, setopenBackend] = React.useState(false);
  const [openFullstack, setopenFullstack] = React.useState(false);
  const [isFront, setIsFront] = React.useState([]);
  const [isBack, setIsBack] = React.useState([]);
  const [isFull, setIsFull] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const {name} = useParams();

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchTerm === "" ? alert("Please input something") : window.location.href = `/search/${searchTerm}`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  useEffect(() => {
    dispatch(fetchCategory()).then((response) => {
      if (response.payload.success) {
        setIsFront(response.payload.data.filter(category => category.tipe_id === 1));
        setIsBack(response.payload.data.filter(category => category.tipe_id ===2));
        setIsFull(response.payload.data.filter(category => category.tipe_id ===3));
      }
      console.log(response.payload.data);
    }).catch((error) => {
      console.error(error);
    });
  }, [dispatch]);

  
  if (error) {
    return <p>{error}</p>;
  }

  const toggleMenuFrontend = () => {
    setopenFrontend(!openFrontend);
    setopenBackend(false);
    setopenFullstack(false);
  };
  const toggleMenuBackend = () => {
    setopenBackend(!openBackend);
    setopenFrontend(false);
    setopenFullstack(false);
  };

  const toggleMenuFullstack = () => {
    setopenFullstack(!openFullstack);
    setopenFrontend(false);
    setopenBackend(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
    <nav className="font-patrick">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between h-[100px]">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white" aria-controls="mobile-menu" aria-expanded="false" onClick={toggleMenu}>
          {isOpen ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Menu / Close_MD">
            <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg> ):( <svg className="w-6 h-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill="#2e3436">
          <path d="m 1 2 h 14 v 2 h -14 z m 0 0"/>
          <path d="m 1 7 h 14 v 2 h -14 z m 0 0"/>
          <path d="m 1 12 h 14 v 2 h -14 z m 0 0"/>
        </g>
      </svg> )}
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-between">
        
        <div className="flex flex-shrink-0 items-center">
          
          <img className="block h-20 w-auto lg:hidden" src={Logo} alt="Your Company"/>
          <img className="hidden h-20 w-auto lg:block" src={Logo} alt="Your Company"/>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4 text-m">
 <div className="relative">
            <button type="button"
          className="inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-white text-sm font-semibold uppercase"
          id="menu-button"
          aria-expanded={openFrontend}
          aria-haspopup="true"
          onClick={toggleMenuFrontend}>Front End</button>
            </div>
            <div className="relative">
            <button type="button"
          className="inline-flex w-full justify-center gap-x-1.5 text-white px-3 py-2 text-sm font-semibold uppercase"
          id="menu-button"
          aria-expanded={openBackend}
          aria-haspopup="true"
          onClick={toggleMenuBackend}>Back End</button>
            </div>
            <div className="relative">
            <button type="button"
              className="inline-flex w-full text-white justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold uppercase"
              id="menu-button"
              aria-expanded={openFullstack}
              aria-haspopup="true"
              onClick={toggleMenuFullstack}>FullStack</button>
            </div>
          </div>
          
        </div>
        <form onSubmit={handleSubmit} className="hidden sm:ml-6 sm:block items-center relative flex justify-center">
            <button
            type="submit"
            className="absolute inset-y-0 top-0 left-[358px] pl-3 flex items-center stroke-gray">
            <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.5 7.75C9.42893 7.75 7.75 9.42893 7.75 11.5C7.75 13.5711 9.42893 15.25 11.5 15.25C13.5711 15.25 15.25 13.5711 15.25 11.5C15.25 9.42893 13.5711 7.75 11.5 7.75Z" fill="#323232"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#8492a6" stroke-width="2"/>
            <path d="M14 14L16 16" stroke="#8492a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="#8492a6" stroke-width="2"/>
            </svg>
            </button>
           <input type="text" value={searchTerm} onChange={handleChange} className="w-[400px] text-white p-4 focus:outline-none bg-[#1F2937] h-8 rounded-full"  placeholder="Search" />
        </form>
        <div className="flex items-center gap-4 hidden sm:flex  lg:flex">
        <Link to="/login">
      
 <button className={`text-[15px] font-bold text-gray bg-[#1F2937] uppercase justify-center w-[120px] justify-between px-4 h-[35px] outline-3 hover:bg-white hover:text-gray rounded-full p-1 flex items-center hover:outline-none`}
 onMouseEnter={handleMouseEnter}
 onMouseLeave={handleMouseLeave}
>
 <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path
     d="M15 20H18C19.1046 20 20 19.1046 20 18M15 4H18C19.1046 4 20 4.89543 20 6V14M11 16L15 12H3M11 8L12 9"
     stroke={`${isHovered ? 'gray' : 'gray'}`}
     strokeWidth="1.5"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </svg>
 Login
</button>

        </Link>
        </div>
      </div>
     
    </div>
  </div>

{isOpen && (
  <div class="sm:hidden bg-" id="mobile-menu">
  <div class="space-y-1 px-2 pb-3 pt-2 flex flex-col">
    <button className="items-center flex justify-center " onClick={toggleMenuFrontend}>
    <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
    {openFrontend ? (<svg className="transform rotate-180" fill="#000000" width="20px" height="20px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">

<path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
</svg>):(<svg fill="#000000" width="20px" height="20px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">

<path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
</svg>)}
    </button>
    {openFrontend && (
    <div className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">
     {isFront.map((frontend) => (
              <Link to={`/${frontend.id}/${frontend.name}`}
                key={frontend.id}
                className="text-gray-700 block px-4 py-2 text-md font-bold capitalize "
                role="menuitem"
                onClick={() => window.location.reload()}
                tabIndex="-1">
                {frontend.name}
              </Link>
            ))}
      </div>
    )}
    <button className="items-center flex justify-center " onClick={toggleMenuBackend}>
    <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Back End</a>
    {openBackend ? (<svg className="transform rotate-180" fill="#000000" width="20px" height="20px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
    </svg>):(<svg fill="#000000" width="20px" height="20px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
    </svg>)}
    </button>
    {openBackend && (
      <div className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">
      {isBack.map((backend) => (
               <Link to={`/${backend.id}/${backend.name}`}
                 key={backend.id}
                 href="#"
                 className="text-gray-700 block px-4 py-2 text-md font-bold capitalize "
                 role="menuitem"
                 tabIndex="-1">
                 {backend.name}
               </Link>
             ))}
       </div>
    )}
     <button className="items-center flex justify-center " onClick={toggleMenuFullstack}>
    <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Full Stack</a>
    {openFullstack ? (<svg className="transform rotate-180" fill="#000000" width="20px" height="20px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
    </svg>):(<svg fill="#000000" width="20px" height="20px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
    </svg>)}
    </button>

    {openFullstack && (
      <div className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">
      {isFull.map((fullstack) => (
               <Link to={`/${fullstack.id}/${fullstack.name}`}
                 key={fullstack.id}
                 href="#"
                 className="text-gray-700 block px-4 py-2 text-md font-bold capitalize "
                 role="menuitem"
                 tabIndex="-1">
                 {fullstack.name}
               </Link>
             ))}
       </div>
    )}
        <div className=" items-center relative flex justify-center">
            <span className="absolute inset-y-0 buttom-[20px] left-[368px] pl-3 flex items-center stroke-gray">
            <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.5 7.75C9.42893 7.75 7.75 9.42893 7.75 11.5C7.75 13.5711 9.42893 15.25 11.5 15.25C13.5711 15.25 15.25 13.5711 15.25 11.5C15.25 9.42893 13.5711 7.75 11.5 7.75Z" fill="#323232"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#8492a6" stroke-width="2"/>
            <path d="M14 14L16 16" stroke="#8492a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="#8492a6" stroke-width="2"/>
            </svg>
            </span>
           <input type="text" className="w-[350px] p-4 focus:outline-none bg-[#fff] h-8 rounded-full"  placeholder="Search" />
        </div>
  </div>
  
</div>
)}
  
</nav>
{ openFrontend && (
            <div
             className="hidden sm:block active absolute font-patrick overflow-hidden right-0 left-0 bg-[#374151] shadow-lg "
             role="menu"
             aria-orientation="vertical"
             aria-labelledby="menu-button"
             style={{width:'100%'}}
           >
                <div className="mx-auto max-w-7xl px-2 flex justify-start items-start sm:px-6 lg:px-8 mx-auto " style={{height:'180px'}}>
             <div className="py-1 text-white gap-2 flex flex-col" role="none">
              {isFront.map((frontend) => (
                <>
                <div className="flex gap-2 justify-center items-center">

                {frontend.paths.map((path) =>(
                <div className="p-1 bg-white text-blue shadow-lg font-normal h-7 w-7 items-center justify-center align-center rounded-full outline-none focus:outline-none">
                <img src={path} alt="" />
                </div> 
                ))}
             <Link to={`/${frontend.name}/${frontend.id}`}
                key={frontend.id}
                href="#"
                className="text-gray-700 block py-2 text-md Capitalize"
                role="menuitem"
                tabIndex="-1">
                {frontend.name}
              </Link>
                </div>
                </>
            ))}
               
             </div>
            </div>
            
           </div>
            )}
    { openBackend && (
            <div
            
            className="hidden sm:block active absolute font-patrick overflow-hidden right-0 left-0 bg-[#374151] shadow-lg "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            style={{width:'100%'}}
          >
               <div className="mx-auto max-w-7xl px-2 flex justify-start items-start sm:px-6 lg:px-8 mx-auto " style={{height:'180px'}}>
            <div className="py-1 text-white gap-2 flex flex-col" role="none">
             {isBack.map((backend) => (
               <>
               <div className="flex gap-2 justify-center items-center">

               {backend.paths.map((path) =>(
               <div className="p-1 bg-white text-blue shadow-lg font-normal h-7 w-7 items-center justify-center align-center rounded-full outline-none focus:outline-none">
               <img src={path} alt="" />
               </div> 
               ))}
            <Link to={`/${backend.id}/${backend.name}`}
               key={backend.id}
               href="#"
               className="text-gray-700 block py-2 text-md Capitalize"
               role="menuitem"
               tabIndex="-1">
               {backend.name}
             </Link>
               </div>
               </>
           ))}
              
            </div>
           </div>
           
          </div>
            )}
    { openFullstack && (
    <div
            
    className="hidden sm:block active absolute font-patrick overflow-hidden right-0 left-0 bg-[#374151] shadow-lg "
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    style={{width:'100%'}}
  >
       <div className="mx-auto max-w-7xl px-2 flex justify-start items-start sm:px-6 lg:px-8 mx-auto " style={{height:'180px'}}>
    <div className="py-1 text-white gap-2 flex flex-col" role="none">
     {isFront.map((frontend) => (
       <>
       <div className="flex gap-2 justify-center items-center">

       {frontend.paths.map((path) =>(
       <div className="p-1 bg-white text-blue shadow-lg font-normal h-7 w-7 items-center justify-center align-center rounded-full outline-none focus:outline-none">
       <img src={path} alt="" />
       </div> 
       ))}
    <Link to={`/${frontend.id}/${frontend.name}`}
       key={frontend.id}
       href="#"
       className="text-gray-700 block py-2 text-md Capitalize"
       role="menuitem"
       tabIndex="-1">
       {frontend.name}
     </Link>
       </div>
       </>
   ))}
      
    </div>
   </div>
   
  </div>
    )}


    </>
  );
};

export default Navbar;

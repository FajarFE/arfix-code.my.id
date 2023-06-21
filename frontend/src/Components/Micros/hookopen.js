import React from "react";

const Hookopen =()=>{
    const [isOpen, setIsOpen]=React.useState(false)
const toggleMenu=()=>{
   setIsOpen(!isOpen);
}
return{isOpen,toggleMenu}
}


export default Hookopen
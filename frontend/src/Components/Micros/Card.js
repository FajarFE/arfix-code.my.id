import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
  } from "@material-tailwind/react";

  import { Link, useNavigate } from "react-router-dom";

  import DOMPurify from "dompurify";
  import { Tilt } from 'react-tilt'
   
const Wanjay = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const status_id = 3; // Ganti dengan status_id yang diinginkan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts', {
          params: {
            status_id: status_id,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>



    
    </>
   

  
  );
};

export default Wanjay;

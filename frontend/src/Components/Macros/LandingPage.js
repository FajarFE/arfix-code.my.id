import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip } from '@material-tailwind/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import Navbar from '../Micros/Navbar';
import Headline from '../Micros/Headline';
import Footer from '../Micros/Footer';
import { fetchPosts, setCurrentPage, setTotalPage } from '../Store/PostsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Micros/Loading';
import DOMPurify from 'dompurify';
import jwtDecode from 'jwt-decode';



const LandingPage = () => {
  const dispatch = useDispatch();
  const { data,limit, error, currentPage,totalPage,statusId, } = useSelector((state) => state.posts);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        handleTokenExpired();
      }
    } else {
      handleTokenExpired();
    }
  }, []);

  const handleTokenExpired = () => {
    localStorage.removeItem("token"); // Menghapus token dari local storage
 // Redirect ke halaman login
  };
 
  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      dispatch(fetchPosts({ status_id: statusId, page: currentPage,limit:limit }))
        .then((response) => {
          console.log(response.payload);
          dispatch(setTotalPage(response.payload.last_page));
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1200);
  
    return () => clearTimeout(timer);
  }, [dispatch, statusId, currentPage,limit]);
    
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    
  };

   
 
  
  const renderPagination = () => {
    if (totalPage <= 1) {
      return null;
    }
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex items-center justify-center mt-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            currentPage === 1 ? 'hidden' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`ml-2 px-4 py-2 rounded ${
            currentPage === totalPage ? 'hidden' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        
        >
          Next
        </button>
      </div>
    );
  };
  
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div className='bg-dark'>
      <Navbar />

      <Headline />
      <div className="container mx-auto my-10 font-patrick">
        <div className="mb-10 font-bold relative">
          <h1 className="text-white text-[50px]">Artikel Terbaru</h1>
          <hr className="absolute bg-purple bottom-1 -z-[99] h-2 w-[280px]" />
        </div>
        <div className="grid grid-cols-12 mt-5">
        {data && Array.isArray(data.data) && data.data.map((item, index) =>  (
  <div className="col-span-4" key={index}>
    <Link to={`/${item.title}/${item.id}`}>
    
    <Card className="max-w-[24rem] font-patrick text-white border-none shadow-none overflow-hidden bg-transparent">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 rounded-none rounded-[8px] h-[250px] "
      >
        <img
          src={item.paths[0]}
          alt="ui/ux review check"
          className='w-full h-full object-fit'
        />
      </CardHeader>
      <CardBody className='p-0 text-white font-patrick'>
      <Typography
        variant="lead" color="gray" className="font-patrick mt-3 text-sm opacity-[60%] w-full break-words flex gap-2">
          <p className='uppercase'>{item.category_name.replace(/ /g, ' | ')}</p> <span>|</span>  <p> {
                    new Date(item.created_at)
                      .toLocaleString("id-ID", {
                        month: "long",
                      })
                      .replace(",", "") // Menghapus koma setelah tanggal
                  }</p>
                 <p> {
                    new Date(item.created_at)
                      .toLocaleString("id-ID", {
                       
                        day: "numeric",
                       
                      })
                     
                  },</p>
                 <p> {
                    new Date(item.created_at)
                      .toLocaleString("id-ID", {
                       
                        year: "numeric",
                      })
                      .replace(",", "") // Menghapus koma setelah tanggal
                  }</p>
        </Typography>
        <Typography variant="h4" color="blue-gray" className="font-patrick text-white break-words w-full align-baseline inline-block mt-2">
            {item.title.slice(0, 50)}. . .
        </Typography>
        <Typography  style={{ textTransform: "capitalize" }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            (item.content.slice(0, 1).toUpperCase() +
              item.content.slice(1).toLowerCase()).slice(0, 100)
          ),
          AllowedTags: ["p"],
        }}
        variant="lead" color="gray" className="font-patrick mt-3 text-[19px] opacity-[60%] w-full break-words">
          
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center px-0 justify-start gap-5">
       
        <Avatar
              size="md"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10 m-0 p-0"
            />
        <div className="flex flex-col">

        <Typography className="font-patrick text-[18px] p-0 m-0">{item.user_name}</Typography>
        <Typography className="font-patrik opacity-[60%] text-[16px] p-o m-0">{item.tipe_name}</Typography>
        </div>
      </CardFooter>
    </Card>
      
    </Link>
  </div>
))}

        </div>
        {renderPagination()}
      </div>
      <Footer />
      </div>

    </>
  );
};

export default LandingPage;
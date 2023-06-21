import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById,fetchPosts,setCreatedAt } from '../Store/PostsSlice';
import { fetchCategory } from '../Store/CategorySlice';
import Navbar from '../Micros/Navbar';
import Footer from '../Micros/Footer';
import Loading from '../Micros/Loading';
import '../../App.css';
import { Tooltip, Avatar,Typography } from "@material-tailwind/react";
export default function NextPage() {
  const dispatch = useDispatch();
  const {data:posts, currentPost,createdAt, error,statusId } = useSelector((state) => state.posts);
  const [openFrontend, setOpenFrontend] = useState(false);
  const [openBackend, setOpenBackend] = useState(false);
  const [openFullstack, setOpenFullstack] = useState(false);
  const [isFront, setIsFront] = useState([]);
  const [isBack, setIsBack] = useState([]);
  const [isFull, setIsFull] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPostById(id));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
   
  }, 1200);
  
  return () => clearTimeout(timer);
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setCreatedAt('terbaru'));
  },[]);
 
  // Memanggil fetchPosts ketika nilai createdAt berubah
  useEffect(() => {
   
    const params = new URLSearchParams();
    params.append('status_id', statusId);
    params.append('create_at', createdAt);
    params.append('limit', '3')

    dispatch(fetchPosts(params))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.error(error);
      });
   
  }, [dispatch, createdAt, statusId]);


  useEffect(() => {
    dispatch(fetchCategory())
      .then((response) => {
        if (response.payload.success) {
          setIsFront(response.payload.data.filter(category => category.tipe_id === 1));
          setIsBack(response.payload.data.filter(category => category.tipe_id === 2));
          setIsFull(response.payload.data.filter(category => category.tipe_id === 3));
        }
        console.log(response.payload.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (currentPost.paths?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (currentPost.paths?.length || 0) - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPost?.paths) {
        nextSlide();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentPost?.paths]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const toggleMenuFrontend = () => {
    setIsOpen(!isOpen);
    setOpenFrontend(!openFrontend);
    setOpenBackend(false);
    setOpenFullstack(false);
  };

  const toggleMenuBackend = () => {
    setIsOpen(!isOpen);
    setOpenBackend(!openBackend);
    setOpenFrontend(false);
    setOpenFullstack(false);
  };

  const toggleMenuFullstack = () => {
    setIsOpen(!isOpen);
    setOpenFullstack(!openFullstack);
    setOpenFrontend(false);
    setOpenBackend(false);
  };

  return (
    <>
    
    <div className="bg-dark text-white font-patrick">
    <Navbar/>
    {currentPost && (
        <div className="container mx-auto my-8">
      <div className="relative ">
      <div className="flex justify-center items-center flex-col   ">
        <div className="flex justify-center gap-2 items-center">
        <p className='uppercase'>{currentPost.category_name.replace(/ /g, ' | ')}</p> <span>|</span>  <p> {
                    new Date(currentPost.created_at)
                      .toLocaleString("id-ID", {
                        month: "long",
                      })
                      .replace(",", "") // Menghapus koma setelah tanggal
                  }</p>
                 <p> {
                    new Date(currentPost.created_at)
                      .toLocaleString("id-ID", {
                       
                        day: "numeric",
                       
                      })
                     
                  },</p>
                 <p> {
                    new Date(currentPost.created_at)
                      .toLocaleString("id-ID", {
                       
                        year: "numeric",
                      })
                      .replace(",", "") // Menghapus koma setelah tanggal
                  }</p>
        </div>
      <h2 className='capitalize text-[30px] font-bold  break-words text-center w-[800px]'>{currentPost.title}</h2>
      <div className='flex items-center justify-center gap-5'>
      <Avatar
              size="md"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10 m-0 p-0"
            />
        <div className="flex flex-col">

        <Typography className="font-patrick text-[18px] p-0 m-0">{currentPost.user_name}</Typography>
        <Typography className="font-patrik opacity-[60%] text-[16px] p-o m-0">{currentPost.tipe_name}</Typography>
        </div>
      </div>
     </div>
     {currentPost.quote === null ? (
  ''
) : (
  <div className="flex justify-center items-center gap-20 text-sm">
    <p className="text-sm flex font-bold gap-4 uppercase">
      "{currentPost.quote}"
    </p>
  </div>
)}

     
      <div className="grid grid-cols-12 gap-4  h-[400px] my-4  ">
  {currentPost.paths.length > 0 && (
    <>
      <div className=" col-span-8  w-full bg-[#16213E] relative ">
        <div className="w-full h-[400px] flex justify-center items-center ">
          <img
            className="object-fit w-auto h-[400px]"
            src={currentPost.paths[currentImageIndex]}
            alt=""
          />
        </div>
        <div className="flex justify-center mt-4 absolute bottom-0 top-0 left-2">
          <button className='text-white' onClick={prevSlide}>
          <svg fill="#ffffff" width="60px" height="60px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23.010 14.989h-11.264l3.617-3.617c0.39-0.39 0.39-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.195 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.39-0.39 0.39-1.023 0-1.414l-3.68-3.68h11.327c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
          </svg>
          </button>
        </div>
        <div className="flex justify-between mt-4 absolute bottom-0 top-0 right-2">
          <button onClick={nextSlide}>
          <svg fill="#ffffff" width="60px" height="60px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM16.637 9.957c-0.39 0.39-0.39 1.024 0 1.414l3.617 3.617h-11.264c-0.553 0-1 0.448-1 1s0.447 1 1 1h11.327l-3.68 3.68c-0.39 0.39-0.39 1.023 0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l5.907-6.063-5.907-6.063c-0.391-0.39-1.023-0.39-1.415 0z"></path>
          </svg>
          </button>
        </div>
        <div className="absolute bottom-2 right-0 left-0 flex justify-center align-items-center gap-5">
        <button
            onClick={() => setCurrentImageIndex(0)}
            className={`${currentImageIndex === 0 ? 'border-4 border-white w-[60px] h-[15px] rounded-[8px]' : 'bg-white w-[60px] h-[15px] rounded-[8px]'}`}
          ></button>
          <button
            onClick={() => setCurrentImageIndex(1)}
            className={`${currentImageIndex === 1 ? 'border-4 border-white w-[60px] h-[15px] rounded-[8px]' : 'bg-white w-[60px] h-[15px] rounded-[8px]'}`}
          ></button>
          <button
            onClick={() => setCurrentImageIndex(2)}
            className={`${currentImageIndex === 2 ? 'border-4 border-white w-[60px] h-[15px] rounded-[8px]' : 'bg-white w-[60px] h-[15px] rounded-[8px]'}`}
          ></button>
        </div>
      </div>
      <div className="col-span-4 flex-col flex gap-4 w-full">
  {currentPost.paths.length >= 2 && (
    <div className="w-full h-[200px] bg-[#16213E] flex justify-center items-center">
      <img
        className='object-fit w-full h-full  '
        src={currentPost.paths[(currentImageIndex + 1) % currentPost.paths.length]}
        alt=""
      />
    </div>
  )}
  {currentPost.paths.length >= 3 && (
    <div className="w-full h-[200px] bg-[#16213E] flex justify-center items-center">
      <img
        className='object-fit w-full h-full'
        src={currentPost.paths[(currentImageIndex + 2) % currentPost.paths.length]}
        alt=""
      />
    </div>
  )}
</div>


    </>
  )}
</div>

<div className="grid grid-cols-12 gap-4 my-10">
      <div className="col-span-9 flex w-full flex-col gap-4 ">
      <div className="break-words w-full h-full"
     dangerouslySetInnerHTML={{ __html: currentPost.content }}
     >
     </div>

     <div className="flex jutify-start -space-x-5">
      {currentPost.img.map((img,index) => (
         <Avatar
         key={index}
         size="xl"
         variant="circular"
         alt="candice wu"
         src={img}
         className="bg-white border-[#000000] border-4 hover:z-10 drop-shadow-2xl"    
        />
      ))}
     </div>
   
        </div>
        <div className="col-span-3 gap-2 flex-col items-center">
          <div className="flex flex-col justify-start items-center">
            <h2 className='underline decoration-4 decoration-[#F7BA3E]  text-[28px] font-bold underline-4'>Category</h2>
            <div className={`w-full rounded-md mt-5 w-[70%] ${openFrontend ? 'h-auto':'h-10'} flex justify-center items-center relative border-2 border-white`}>
            <div className="absolute left-5 -top-5">
              <h2 className='underline decoration-4 decoration-[#199C9E] bg-[#374151] text-[20px] font-bold underline-4 '>Frontend</h2>
            </div>
            <button className='absolute right-0 top-0 focus:outline-none'
            onClick={toggleMenuFrontend}
            >
              {openFrontend ? (
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow / Chevron_Down">
                <path id="Vector" d="M19 9L12 16L5 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                </svg>
              ):(
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Arrow / Chevron_Up">
<path id="Vector" d="M5 16L12 9L19 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
              )}
            </button>
            {openFrontend && (
              <> 
              <div className="flex flex-col gap-2 justify-center items-center w-full mt-8 p-2">  
              {isFront.map((frontend) => (
              <Link to = {`/category/${frontend.name}`}
                key={frontend.id}
                className="text-[#374151] bg-white block w-full p-2 rounded-[8px] text-md flex justify-center font-bold capitalize "
                role="menuitem"
                tabIndex="-1">
                {frontend.name}
              </Link>
            ))}
              
              </div>   
              </>
            )
            
            }
          </div>
          <div className={`w-full rounded-md mt-5 w-[70%] ${openBackend ? 'h-auto':'h-10'} flex justify-center items-center relative border-2 border-white`}>
            <div className="absolute left-5 -top-5">
              <h2 className='underline decoration-4 decoration-[#BF85BF] bg-[#374151] text-[20px] font-bold underline-4 '>Backend</h2>
            </div>
            <button className='absolute right-0 top 0'
            onClick={toggleMenuBackend}
            >
              {openBackend ? (
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow / Chevron_Down">
                <path id="Vector" d="M19 9L12 16L5 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                </svg>
              ):(
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Arrow / Chevron_Up">
<path id="Vector" d="M5 16L12 9L19 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
              )}
            </button>
            {openBackend && (
              <> 
              <div className="flex flex-col gap-2 justify-center items-center w-full mt-8 p-2">  
              {isBack.map((backend) => (
              <Link to = {`/category/${backend.name}`}
                key={backend.id}
                className="text-[#374151] bg-white block w-full p-2 rounded-[8px] text-md flex justify-center font-bold capitalize "
                role="menuitem"
                tabIndex="-1">
                {backend.name}
              </Link>
            ))}
              
              </div>   
              </>
            )
            
            }
          </div>
          <div className={`w-full rounded-md mt-5 w-[70%] ${openFullstack ? 'h-auto':'h-10'} flex justify-center items-center relative border-2 border-white`}>
            <div className="absolute left-5 -top-5">
              <h2 className='underline decoration-4 bg-[#374151] decoration-[#EA5E5E] text-[20px] font-bold underline-4 '>Full Stack</h2>
            </div>
            <button className='absolute right-0 top-0'
            onClick={toggleMenuFullstack}
            >
              {openFullstack ? (
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow / Chevron_Down">
                <path id="Vector" d="M19 9L12 16L5 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                </svg>
              ):(
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Arrow / Chevron_Up">
<path id="Vector" d="M5 16L12 9L19 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
              )}
            </button>
            {openFullstack && (
              <> 
              <div className="flex flex-col gap-2 justify-center items-center w-full mt-8 p-2">  
              {isFull.map((fullstack) => (
              <Link to = {`/category/${fullstack.name}`}
                key={fullstack.id}
                className="text-[#374151] bg-white block w-full p-2 rounded-[8px] text-md flex justify-center font-bold capitalize "
                role="menuitem"
                tabIndex="-1">
                {fullstack.name}
              </Link>
            ))}
              
              </div>   
              </>
            )
            
            }
          </div>
          </div>
          <h2 className='underline underline-offset-8 decoration-4 decoration-purple text-[28px] flex justify-center items-center font-bold underline-4 mb-5 mt-10'>Artikel Terbaru</h2>
            {posts && Array.isArray(posts.data) && posts.data.map((post,index) => (
             
          <div className="w-full flex justify-start items-center  flex-col p-4">
                <div className=" flex justify-center items-center border-2 border rounded-[8px] relative ">
                  <img src={post.paths[1]} alt={post.title} className="object-fit h-[170px] w-96 rounded-[12px]"  />
                  <div className="absolute flex right-0 left-2 bottom-2 -space-x-5">
                  {post.img.map((category, index) => (
              <Avatar
                key={index}
                size="sm"
                variant="circular"
                alt="category"
                src={category}
                className="border-2 border object-fit hover:z-10"
              />
            ))}
                      </div>
                </div>
                <div className="flex flex-col justify-center items-centert ml-4 my-2">
                  <p className="break-all uppercase font-bold">{post.title}</p>
                </div>
        

</div>
            ))}

          </div>

       

</div>
       
      </div>
  
    </div>
    )

    }
    <Footer/>
   
    </div>
    
    </>
  );
}

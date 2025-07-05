import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeadlines } from '../Store/HeadlineSlice';

import DOMPurify from 'dompurify';

const Headline = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, limit, statusId } = useSelector((state) => state.headline);

  useEffect(() => {
    dispatch(
      fetchHeadlines({
        status_id: statusId,
        limit: limit,
        create_at: 'terbaru',
      }),
    )
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, limit, statusId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.data.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Mengatur interval perpindahan slide setiap 3 detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen di-unmount
    };
  }, [data]);

  return (
    <>
      <div className="font-bold flex mb-4  justify-center items-center w-full">
        <h1 className="text-white text-[50px]">Headline</h1>
      </div>
      <div className="grid grid-cols-12 container px-4 lg:px-0 md:px-0 gap-5 h-auto  justify-center  items-center">
        {data && Array.isArray(data.data) && (
          <>
            <div className="col-span-12 lg:col-span-8 sm:col-span-12 md:col-span-12 rounded-[20px] h-[200px] sm:h-[200px] md:h-[400px] sm:w-[70%] md:w-full lg:w-full w-full flex justify-center items-center">
              <a
                href={`/${data.data[currentIndex].title}/${data.data[currentIndex].id}`}
                className="w-[100%] lg:w-full md:w-full rounded-md h-full justify-conten bg-white relative"
              >
                <img
                  src={data.data[currentIndex].paths[0]}
                  alt=""
                  className="object-fit w-full h-full"
                />
                <div className="absolute block sm:hidden md:block lg:hidden bottom-0 h-[60px] md:h-[90px] w-full bg-[#16213E] uppercase px-2 md:px-4 opacity-[60%]">
                  <div className="line-clamp-2 text-justify break-words py-2 justify-center items-center align-center flex text-white">
                    <p className="line-clamp-2">
                      {data.data[currentIndex].title}
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-span-12 md:col-span-12 hidden sm:hidden lg:block lg:col-span-4 rounded-[20px] pt-3 pb-20 h-[400px] w-full  justify-center items-start">
              <div className="flex  flex-col justify-between items-start lg:justify-between lg:items-start md:justify-center md:items-center gap-2 h-full text-white font-patrick w-full">
                <div className="gap-1 text-[17px] flex justify-center text-white opacity-[60%]">
                  <p className="capitalize -leading-5">
                    {data.data[currentIndex].category_name.replace(' ', ' | ')}
                  </p>
                  <span>|</span>
                  <p>
                    {
                      new Date(data.data[currentIndex].created_at)
                        .toLocaleString('id-ID', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })
                        .replace(',', '') // Menghapus koma setelah tanggal
                    }
                  </p>
                </div>
                <p className="normal-case break-words text-[30px] w-[90%]">
                  {data.data[currentIndex].title.slice(0, 50)}
                </p>
                <div
                  style={{ textTransform: 'capitalize' }}
                  className="text-[17px] break-all text-white opacity-[60%] w-[70%]"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      (
                        data.data[currentIndex].content
                          .slice(0, 1)
                          .toUpperCase() +
                        data.data[currentIndex].content.slice(1).toLowerCase()
                      ).slice(0, 100),
                    ),
                    AllowedTags: ['p'],
                  }}
                ></div>
                <div className="flex items-center gap-5 justify-center">
                  <div className="h-[50px] w-[50px] rounded-full bg-white">
                    <img src={data.data[currentIndex].user_avatar} alt="" />
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="capitalize text-[20px]">
                      {data.data[currentIndex].user_name}
                    </p>
                    <p className="capitalize text-white opacity-[60%] text-[15px]">
                      {data.data[currentIndex].tipe_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Headline;

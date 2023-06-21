import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeadlines, setLimit } from "../Store/HeadlineSlice";
import { Tilt } from "react-tilt";
import { Avatar, Tooltip } from "@material-tailwind/react";
import { current } from "@reduxjs/toolkit";
import DOMPurify from "dompurify";

const Headline = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, limit, statusId, loading, error } = useSelector(
    (state) => state.headline
  );

  useEffect(() => {
    dispatch(
      fetchHeadlines({
        status_id: statusId,
        limit: limit,
        create_at: "terbaru",
      })
    )
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Mengatur interval perpindahan slide setiap 3 detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen di-unmount
    };
  }, [data]);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data),
  });

  return (
    <div className=" my-20 mx-auto max-w-7xl grid grid-cols-12 gap-5 flex justify-center items-center">
      {data && Array.isArray(data.data) && (
        <>
          {" "}
          <div className="col-span-8 rounded-[20px] bg-white h-[400px] w-full flex justify-center items-center">
            <img
              src={data.data[currentIndex].paths[0]}
              alt=""
              className="object-fit w-full h-full"
            />
          </div>
          <div className="col-span-4 rounded-[20px] pt-3 pb-20 h-[400px] w-full flex justify-center items-start">
            <div className="flex gap-5 flex-col justify-between items-start gap-2 h-full text-white font-patrick w-full">
              <div className="gap-1 text-[17px] flex  text-white opacity-[60%]">
                <p className="capitalize -leading-5">
                  {data.data[currentIndex].category_name.replace(" ", " | ")}
                </p>{" "}
                <span>|</span>{" "}
                <p>
                  {
                    new Date(data.data[currentIndex].created_at)
                      .toLocaleString("id-ID", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      .replace(",", "") // Menghapus koma setelah tanggal
                  }
                </p>
              </div>
              <p className="normal-case break-words text-[30px] w-[90%]">
                {data.data[currentIndex].title.slice(0, 50)}
              </p>
              <div
  style={{ textTransform: "capitalize" }}
  className="text-[17px] break-words  text-white opacity-[60%] w-[70%]"
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(
      (data.data[currentIndex].content.slice(0, 1).toUpperCase() +
        data.data[currentIndex].content.slice(1).toLowerCase()).slice(0, 100)
    ),
    AllowedTags: ["p"],
  }}
></div>


              <div className="flex items-center gap-5 justify-center">
                <div className="h-[50px] w-[50px] rounded-full bg-white">
                  <img src={data.data[currentIndex].user_avatar} alt="" />
                </div>
                <div className="flex flex-col justify-start items-start">
                <p className="capitalize text-[20px]">{data.data[currentIndex].user_name}</p>
                <p className="capitalize  text-white opacity-[60%] text-[15px]">{data.data[currentIndex].tipe_name}</p>
                </div>
             
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Headline;

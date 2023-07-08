import DOMPurify from 'dompurify';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-tailwind/react';


export default function Card({id,title,paths,category_name,created_at,index,content,baseURL,user_avatars,user_name,tipe_name}){
  return (
    <div
    className="col-span-12 px-5  md:col-span-12 lg:col-span-4 md:col-span-6 lg:col-span-4 mb-2"
    key={index}
  >
    <Link to={`/${title}/${id}`} className='w-full h-auto '>
      <div className=" font-patrick text-white bg-transparent px-2 md:px-0 lg:px-0">
        <div
          className="m-0  rounded-[8px] h-[200px] md:h-[250px] lg:h-[250px] bg-white"
        >
          <img
            src={paths}
            alt="ui/ux review check"
            className=" object-fit w-full h-full"
          />
        </div>
        <div className="p-0 text-white font-patrick">
          <div
            className="font-patrick  md:mt-1 lg:mt-3 text-sm md:text-[15px] opacity-[60%] w-full break-words flex gap-2"
          >
            <p className="uppercase">
              {category_name.replace(/ /g, " | ")}
            </p>{" "}
            <span>|</span>{" "}
            <p>
              {new Date(created_at).toLocaleString("id-ID", {
                month: "long",
              })}
            </p>
            <p>
              {new Date(created_at).toLocaleString("id-ID", {
                day: "numeric",
              })}
            </p>
            <p>
              {new Date(created_at).toLocaleString("id-ID", {
                year: "numeric",
              })}
            </p>
          </div>
          <div
            variant="h4"
            color="blue-gray"
            className="font-patrick  leading-none line-clamp-2 text-white break-words w-full align-baseline inline-block mt-2 md:mt-0 lg:mt-2 text-[20px] md:text-[18px] lg:text-[24px]"
          >
            {title}
          </div>
          <div
            style={{ textTransform: "capitalize" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                (
                  content
                    .slice(0, 1)
                    .toUpperCase() +
                  content.slice(1).toLowerCase()
                )
              ),
              AllowedTags: ["p"],
            }}
            variant="lead"
            color="gray"
            className=" line-clamp-2 leading-none font-patrick  md:mt-1 lg:mt-3 text-[19px] md:text-[16px] lg:text-[19px] opacity-[60%] w-full break-all"
          ></div>
        </div>
        <div className="flex items-center px-0 justify-start md:justify-center  lg:justify-start md:flex-col lg:flex-row gap-5 lg:gap-5 md:gap-0">
          <Avatar
            variant="circular"
            alt="natali craig"
            src={`${baseURL}/storage/avatars/${user_avatars}`}
            className="border-2 border-white hover:z-10 m-0 p-0 w-[40px] h-[40px] md:w-[40px] md:h-[40px] lg:w-[40px] lg:h-[40px]"
          />
          <div className="flex gap-0 md:gap-5 lg:gap-0 my-2 flex-col md:flex-row lg:flex-col">
            <div className="font-patrick text-[18px] md:text-[15px] lg:text-[18px] p-0 m-0">
              {user_name}
            </div>
            <div className="font-patrik opacity-[60%] text-[16px] md:text-[15px] lg:text-[18px] p-o m-0">
              {tipe_name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
  )
}
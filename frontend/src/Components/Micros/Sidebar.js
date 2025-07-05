import React from 'react';
import Hookopen from './hookopen';
import { Link } from 'react-router-dom';

const Sidebar = ({ user, logout }) => {
  const { isOpen, toggleMenu } = Hookopen();

  return (
    <>
      <div
        className="bg-purple flex flex-col items-center "
        style={{ height: '100vh', width: isOpen ? '26%' : '15%' }}
      >
        {isOpen ? (
          <div className="flex flex-col justify-center items-center">
            <div
              className="rounded-full bg-white my-5 relative flex  justify-center items-center"
              style={{ height: '160px', width: '160px' }}
            >
              <div className="h-[150px] w-[150px] rounded-full p-5">
                <img
                  src={user.avatar}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            <h4 className="font-bold uppercase text-[20px]">
              <span>{user.name}</span>
            </h4>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div
              className="rounded-full bg-white my-5 relative flex i justify-center items-center"
              style={{ height: '160px', width: '160px' }}
            >
              <div className="h-[150px] w-[150px] rounded-full p-5">
                <img
                  src={user.avatar}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {isOpen ? (
          <div className="flex justify-between my-1">
            <div className="flex flex-col justify-between font-bold gap-4 my-10 w-full text-[20px]">
              <Link to={`/dashboard/${user.name}`}>
                <div className="w-auto py-3 flex justify-center gap-5 items-center">
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 -0.05 20.109 20.109"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="edit-user-2" transform="translate(-2 -2)">
                      <circle
                        id="secondary"
                        fill="#2ca9bc"
                        cx="5"
                        cy="5"
                        r="5"
                        transform="translate(6 3)"
                      />
                      <path
                        id="primary"
                        d="M9,21H4a1,1,0,0,1-1-1,7,7,0,0,1,7-7h1"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="primary-2"
                        data-name="primary"
                        d="M20.71,16.09,15.8,21H13V18.2l4.91-4.91a1,1,0,0,1,1.4,0l1.4,1.4A1,1,0,0,1,20.71,16.09ZM11,3a5,5,0,1,0,5,5A5,5,0,0,0,11,3Z"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </g>
                  </svg>
                  Account
                </div>
              </Link>

              <Link to="/dashboard/form">
                <div
                  href=""
                  className="w-auto py-3 flex justify-center gap-5 items-center"
                >
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_901_2648)">
                      <path
                        d="M26.8901 19.3101C29.2701 20.0901 31.0001 22.3501 31.0001 25.0001C31.0001 28.3101 28.3101 31.0001 25.0001 31.0001C21.6901 31.0001 19.0001 28.3101 19.0001 25.0001C19.0001 21.6901 21.6901 19.0001 25.0001 19.0001C25.6601 19.0001 26.3001 19.1101 26.8901 19.3101Z"
                        fill="#FFC44D"
                      />
                      <path
                        d="M27.5 24.5L25 27H23V25L25.49 22.51L27.5 24.5Z"
                        fill="#668077"
                      />
                      <path
                        d="M27 19L26.89 19.31C26.3 19.11 25.66 19 25 19C21.69 19 19 21.69 19 25C19 28.31 21.69 31 25 31H2C1 31 1 30 1 30V2C1 1 2 1 2 1H17V10C17 10 17 11 18 11H27V19Z"
                        fill="#FFE6EA"
                      />
                      <path
                        d="M26 9C27 10 27 11 27 11H18C17 11 17 10 17 10V1C17 1 18 1 19 2L26 9Z"
                        fill="#668077"
                      />
                      <path
                        d="M27 16V11C27 11 27 10 26 9L19 2C18 1 17 1 17 1M17 1H2C2 1 1 1 1 2V30C1 30 1 31 2 31H18M17 1V10C17 10 17 11 18 11H23M31 25C31 21.687 28.313 19 25 19C21.687 19 19 21.687 19 25C19 28.313 21.687 31 25 31C28.313 31 31 28.313 31 25ZM27.5 24.5L25.492 22.508L23 25V27H25L27.5 24.5Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_901_2648">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Buat Artikel
                </div>
              </Link>
              <Link to="/dashboard/library">
                <div
                  href=""
                  className="w-auto py-3 flex justify-center gap-5 items-center"
                >
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_901_2684)">
                      <path
                        d="M31 4V26C31 26.55 30.55 27 30 27H26V8C26 7.45 25.55 7 25 7H21V3H30C30.55 3 31 3.45 31 4Z"
                        fill="#668077"
                      />
                      <path
                        d="M26 27V30C26 30.55 25.55 31 25 31H7C6.45 31 6 30.55 6 30V25V8C6 7.45 6.45 7 7 7H21H25C25.55 7 26 7.45 26 8V27Z"
                        fill="#FFE6EA"
                      />
                      <path
                        d="M21 3V7H7C6.45 7 6 7.45 6 8V25H2C1 25 1 24 1 24V2C1 1.45 1.45 1 2 1H20C20.55 1 21 1.45 21 2V3Z"
                        fill="#FFC44D"
                      />
                      <path
                        d="M12 13H15M12 16H20M12 20H20M12 24H20M21 7V2C21 1.447 20.553 1 20 1H2C1.447 1 1 1.447 1 2V24C1 24 1 25 2 25H3M26 27H30C30.553 27 31 26.553 31 26V4C31 3.447 30.553 3 30 3H24M26 30C26 30.553 25.553 31 25 31H7C6.447 31 6 30.553 6 30V8C6 7.447 6.447 7 7 7H25C25.553 7 26 7.447 26 8V30Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_901_2684">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Library Artikel
                </div>
              </Link>

              <button
                onClick={logout}
                className="flex justify-center items-center gap-5  mt-[50px]"
              >
                <svg
                  fill="#000000"
                  width="60px"
                  height="60px"
                  viewBox="0 0 24 24"
                  id="sign-out-left-2"
                  data-name="Flat Color"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon flat-color"
                >
                  <path
                    id="secondary"
                    d="M17,11H5.41l1.3-1.29A1,1,0,0,0,5.29,8.29l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H17a1,1,0,0,0,0-2Z"
                    style={{ fill: 'white' }}
                  ></path>
                  <path
                    id="primary"
                    d="M20,21H11a2,2,0,0,1-2-2V16a1,1,0,0,1,2,0v3h9V5H11V8A1,1,0,0,1,9,8V5a2,2,0,0,1,2-2h9a2,2,0,0,1,2,2V19A2,2,0,0,1,20,21Z"
                    style={{ fill: 'red' }}
                  ></path>
                </svg>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-between font-bold gap-4 my-10 w-full text-[20px]">
              <Link
                to={`/dashboard/${user.name}`}
                className="w-auto py-3 flex justify-center gap-5 items-center"
              >
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 -0.05 20.109 20.109"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="edit-user-2" transform="translate(-2 -2)">
                    <circle
                      id="secondary"
                      fill="#2ca9bc"
                      cx="5"
                      cy="5"
                      r="5"
                      transform="translate(6 3)"
                    />
                    <path
                      id="primary"
                      d="M9,21H4a1,1,0,0,1-1-1,7,7,0,0,1,7-7h1"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      id="primary-2"
                      data-name="primary"
                      d="M20.71,16.09,15.8,21H13V18.2l4.91-4.91a1,1,0,0,1,1.4,0l1.4,1.4A1,1,0,0,1,20.71,16.09ZM11,3a5,5,0,1,0,5,5A5,5,0,0,0,11,3Z"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                </svg>
              </Link>
              <Link
                to="/dashboard/form "
                className="w-auto py-3 flex justify-center gap-5 items-center"
              >
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_901_2648)">
                    <path
                      d="M26.8901 19.3101C29.2701 20.0901 31.0001 22.3501 31.0001 25.0001C31.0001 28.3101 28.3101 31.0001 25.0001 31.0001C21.6901 31.0001 19.0001 28.3101 19.0001 25.0001C19.0001 21.6901 21.6901 19.0001 25.0001 19.0001C25.6601 19.0001 26.3001 19.1101 26.8901 19.3101Z"
                      fill="#FFC44D"
                    />
                    <path
                      d="M27.5 24.5L25 27H23V25L25.49 22.51L27.5 24.5Z"
                      fill="#668077"
                    />
                    <path
                      d="M27 19L26.89 19.31C26.3 19.11 25.66 19 25 19C21.69 19 19 21.69 19 25C19 28.31 21.69 31 25 31H2C1 31 1 30 1 30V2C1 1 2 1 2 1H17V10C17 10 17 11 18 11H27V19Z"
                      fill="#FFE6EA"
                    />
                    <path
                      d="M26 9C27 10 27 11 27 11H18C17 11 17 10 17 10V1C17 1 18 1 19 2L26 9Z"
                      fill="#668077"
                    />
                    <path
                      d="M27 16V11C27 11 27 10 26 9L19 2C18 1 17 1 17 1M17 1H2C2 1 1 1 1 2V30C1 30 1 31 2 31H18M17 1V10C17 10 17 11 18 11H23M31 25C31 21.687 28.313 19 25 19C21.687 19 19 21.687 19 25C19 28.313 21.687 31 25 31C28.313 31 31 28.313 31 25ZM27.5 24.5L25.492 22.508L23 25V27H25L27.5 24.5Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_901_2648">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              <a
                href=""
                className="w-auto py-3 flex justify-center gap-5 items-center"
              >
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_901_2684)">
                    <path
                      d="M31 4V26C31 26.55 30.55 27 30 27H26V8C26 7.45 25.55 7 25 7H21V3H30C30.55 3 31 3.45 31 4Z"
                      fill="#668077"
                    />
                    <path
                      d="M26 27V30C26 30.55 25.55 31 25 31H7C6.45 31 6 30.55 6 30V25V8C6 7.45 6.45 7 7 7H21H25C25.55 7 26 7.45 26 8V27Z"
                      fill="#FFE6EA"
                    />
                    <path
                      d="M21 3V7H7C6.45 7 6 7.45 6 8V25H2C1 25 1 24 1 24V2C1 1.45 1.45 1 2 1H20C20.55 1 21 1.45 21 2V3Z"
                      fill="#FFC44D"
                    />
                    <path
                      d="M12 13H15M12 16H20M12 20H20M12 24H20M21 7V2C21 1.447 20.553 1 20 1H2C1.447 1 1 1.447 1 2V24C1 24 1 25 2 25H3M26 27H30C30.553 27 31 26.553 31 26V4C31 3.447 30.553 3 30 3H24M26 30C26 30.553 25.553 31 25 31H7C6.447 31 6 30.553 6 30V8C6 7.447 6.447 7 7 7H25C25.553 7 26 7.447 26 8V30Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_901_2684">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <div className="flex justify-center mt-[80px]">
                <button onClick={logout}>
                  <svg
                    fill="#000000"
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    id="sign-out-left-2"
                    data-name="Flat Color"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon flat-color"
                  >
                    <path
                      id="secondary"
                      d="M17,11H5.41l1.3-1.29A1,1,0,0,0,5.29,8.29l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H17a1,1,0,0,0,0-2Z"
                      style={{ fill: 'white' }}
                    ></path>
                    <path
                      id="primary"
                      d="M20,21H11a2,2,0,0,1-2-2V16a1,1,0,0,1,2,0v3h9V5H11V8A1,1,0,0,1,9,8V5a2,2,0,0,1,2-2h9a2,2,0,0,1,2,2V19A2,2,0,0,1,20,21Z"
                      style={{ fill: 'red' }}
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        <div
          className={`absolute top-0 buttom-0 flex items-center z-[100] ${
            isOpen ? 'left-[380px]' : 'left-[250px]'
          }`}
        >
          <button onClick={toggleMenu} aria-expanded={false}>
            {isOpen ? (
              <svg
                width="60px"
                height="60px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Menu / Menu_Alt_03">
                  <path
                    id="Vector"
                    d="M5 17H13M5 12H19M5 7H13"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            ) : (
              <svg
                width="60px"
                height="60px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Menu / Menu_Alt_04">
                  <path
                    id="Vector"
                    d="M5 17H19M5 12H19M5 7H13"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

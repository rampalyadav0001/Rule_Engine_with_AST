// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-gray-900 shadow-lg'>
      <div className='container mx-auto p-4 flex justify-between items-center'>
        <div className='text-gray-100 font-bold text-2xl'>
          <span>Rule Engine with AST</span>
        </div>

        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-gray-100 focus:outline-none'
          >
            {isOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            )}
          </button>
        </div>

        {/* Links */}
        <ul
          className={`md:flex md:space-x-6 items-center ${
            isOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <li className='mb-2 md:mb-0'>
            <Link
              to='/'
              className='block md:inline-block bg-gray-700 text-white p-4 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110 hover:bg-gray-600 ease-in-out duration-300'
            >
              Create Rule
            </Link>
          </li>
          <li className='mb-2 md:mb-0'>
            <Link
              to='/combine-rules'
              className='block md:inline-block bg-gray-700 text-white p-4 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110 hover:bg-gray-600 ease-in-out duration-300'
            >
              Combine Rules
            </Link>
          </li>
          <li className='mb-2 md:mb-0'>
            <Link
              to='/evaluate-rule'
              className='block md:inline-block bg-gray-700 text-white p-4 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110 hover:bg-gray-600 ease-in-out duration-300'
            >
              Evaluate Rule
            </Link>
          </li>
          <li>
            <Link
              to='/display-rule'
              className='block md:inline-block bg-gray-700 text-white p-4 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110 hover:bg-gray-600 ease-in-out duration-300'
            >
              Display Rule
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

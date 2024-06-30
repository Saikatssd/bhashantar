import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import './assets/font.css'

function Hero() {
  return (
    <div>
      <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-46">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" sx={{ fontFamily: 'Roboto' }}>
            Streamlining Judicial Document Management and Translation
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Silence the language barrier in the courtroom with the power of AI! No more scrambling to translate documents. Our AI technology seamlessly converts everything into the local language, ensuring a smooth and efficient legal process for all involved.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              LOG IN
            </a>
            <a href="/login" className="text-md font-semibold leading-6 text-gray-900">
              Access My Workspace <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

import React from "react";
import pdfjsLib from "pdfjs-dist/build/pdf";
export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <header class="text-white body-font">
      <div class="container mx-auto flex flex-wrap p-5 md:flex-row">
        <a class="flex title-font font-medium text-white mb-4 md:mb-0 pr-4" href="/">
          <span class="ml-3 text-3xl">DOC2MCQ</span>
        </a>
        <button
            className="text-white cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none ml-auto pb-3"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div
          className={ 
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center font-semibold pl-7">
          <a class="mr-6 hover:text-white" href="/">Home</a>
          <a class="mr-6 hover:text-white" href="/sandbox">Sandbox</a>
          <a class="mr-6 hover:text-white" href="/tryit">Try it</a>
          
          <a class="mr-6 hover:text-white" href="/404">404</a>
        </nav>
        </div>
      </div>
    </header>
  );
}

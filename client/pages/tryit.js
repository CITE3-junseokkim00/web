import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PdfReader from '@/components/PdfReader'
import React, { useState } from 'react'
import { makeChunk, summarize, keyExtraction, generation, distractor } from '@/components/api'


function tryit() {


  const [text, setText] = useState("");
  const [isReady, setisReady] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  return (
    <div class='min-h-screen bg-black'>
      <Header />
      <PdfReader visible={isReady} />
      <div class={isReady ? 'flex justify-center items-center flex-col' : 'flex justify-center items-center flex-col hidden'}>
        <input type='text' onChange={(e) => setText(e.target.value)} class="dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize" placeholder='text' required />
        <h4 class='text-white'> text: {text} isReady= {isReady ? "True" : "False"}</h4>
        <div class='flex flex-row justify-center items-center'>
          <button type='button' onClick={() => { setisReady(!isReady); makeQuiz(text); }} class="px-4 py-2 mt-2 text-sm font-semibold dark:bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it(End 2 End)</button>
          <button type='button' onClick={() => setisReady(!isReady)} class="px-4 py-2 mt-2 text-sm font-semibold dark:bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it(manually)</button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default tryit
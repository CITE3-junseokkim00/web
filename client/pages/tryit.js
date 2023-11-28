import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PdfReader from '@/components/PdfReader'
import React, { useState } from 'react'
import { makeQuiz, summarize, keyExtraction, generation, distractor } from '@/components/api'
import Quiz from '@/components/Quiz'



function tryit() {


  const [text, setText] = useState("");
  const [isReady, setisReady] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [Quizzes, setQuizzes] = useState(null);
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  return (
    <div class='min-h-screen bg-black'>
      <Header />
      {isReady &&<PdfReader func={setText}/>}
      <div class={isReady ? 'h-38 flex justify-center items-center flex-col' : 'h-38 flex justify-center items-center flex-col hidden'}>
        {/* <input type='text' onChange={(e) => setText(e.target.value)} class="dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize" placeholder='text' required /> */}
        <textarea onChange={(e) => setText(e.target.value)} class="h-full w-1/2 dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize" placeholder='Enter context' required />
        <br></br>
      </div>
      <div class='flex flex-row justify-center items-center'>
        {isReady &&
        <>
          <button type='button' onClick={() => { setisReady(!isReady); makeQuiz(text, setQuizzes);}} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it</button>
          {/* <button type='button' onClick={() => setisReady(!isReady)} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it(manually)</button> */}
        </> 
        }
        {
          !isReady &&
          <>
            <button type='button' onClick={() => { setisReady(!isReady);}} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it again</button>
          </> 
        }
       
      </div>
      {/* <button type='button' onClick={() => console.log(Quizzes)} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">check Quizzes</button> */}
      <div class='flex-col flex justify-center items-center'>
        <div class='w-1/2 flex flex-col justify-center items-center p-5'>
          <form class='flex flex-col justify-center' onSubmit={() => console.log("Submit")}>
            {Quizzes && (
              <ul class='w-full flex flex-col gap-5'>
                {Quizzes['response'].map((item, key) => (
                  <Quiz key={key} item={item}/>
                ))}
              </ul>
            )}
            <br></br>
            {Quizzes && (
              <button type='submit' onClick={() => console.log("done")} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0x hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">submit!</button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default tryit
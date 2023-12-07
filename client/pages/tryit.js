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
  const [myAnswer, setmyAnswer] = useState([]);
  const [answer, setAnswer] = useState('')



  return (
    <div class='min-h-screen bg-black'>
      <Header />
      {isReady && <PdfReader func={setText} />}
      <div class={isReady ? 'h-38 flex justify-center items-center flex-col' : 'h-38 flex justify-center items-center flex-col hidden'}>
        {/* <input type='text' onChange={(e) => setText(e.target.value)} class="dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize" placeholder='text' required /> */}
        <textarea onChange={(e) => setText(e.target.value)} class="h-full w-1/2 dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize" placeholder='Enter context' required />
        <br></br>
      </div>
      <div class='flex flex-row justify-center items-center'>
        {isReady &&
            <button type='button' onClick={() => { setisReady(!isReady); makeQuiz(text, setQuizzes, setAnswer, setmyAnswer); }} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it</button>
        }
        {
          !isReady &&
            <button type='button' onClick={() => { setisReady(!isReady);}} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it again</button>
          
        }
        <button type='button' onClick={() => { setQuizzes(null); setText(''); }} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Clear</button>
        

      </div>
      {/* <button type='button' onClick={() => console.log(Quizzes)} class="px-4 py-2 mt-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-0 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">check Quizzes</button> */}
      <div class='flex-col flex justify-center items-center'>
        <div class='w-1/2 flex flex-col justify-center items-center p-5'>
          <form class='flex flex-col justify-center' onSubmit={() => console.log("Submit")}>
            {!text && !isReady
              &&
              <>
                <h1 class='text-red-600'>Please enter the Text</h1>
              </>
             }
            {Quizzes == null && !isReady && text
             &&
             <>
              <h1 class='text-white'>Loading...</h1>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width="50px" height= "50px" ><radialGradient id='a10' cx='.66' fx='.66' cy='.3125' fy='.3125' gradientTransform='scale(1.5)'><stop offset='0' stop-color='#FFFFFF'></stop><stop offset='.3' stop-color='#FFFFFF' stop-opacity='.9'></stop><stop offset='.6' stop-color='#FFFFFF' stop-opacity='.6'></stop><stop offset='.8' stop-color='#FFFFFF' stop-opacity='.3'></stop><stop offset='1' stop-color='#FFFFFF' stop-opacity='0'></stop></radialGradient><circle transform-origin='center' fill='none' stroke='url(#a10)' stroke-width='6' stroke-linecap='round' stroke-dasharray='200 1000' stroke-dashoffset='0' cx='100' cy='100' r='70'><animateTransform type='rotate' attributeName='transform' calcMode='spline' dur='2' values='360;0' keyTimes='0;1' keySplines='0 0 1 1' repeatCount='indefinite'></animateTransform></circle><circle transform-origin='center' fill='none' opacity='.2' stroke='#FFFFFF' stroke-width='6' stroke-linecap='round' cx='100' cy='100' r='70'></circle></svg>
             </>
             }
            {Quizzes && (
              <ul class='w-full flex flex-col gap-5'>
                {Quizzes['response'].map((item, key) => (
                  <Quiz key={key} item={item} func={setmyAnswer} myAnswer={myAnswer} />
                ))}
              </ul>
            )}
            <br></br>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default tryit
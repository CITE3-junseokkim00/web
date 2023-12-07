import React, { useState } from 'react'
import { distractor } from '@/components/api';

export default function Quiz(item, answers) {
  const data = item.item;
  const answer = data.answer
  // console.log(data)
  const [correct, setCorrect] = useState(false)
  const [reveal, setReveal] = useState(false)




  const setAnswer = (e,idx,value) => {
    e.preventDefault();
    // console.log(idx);
    // console.log(value);
    if (value.localeCompare(answer) == 0) {
      setCorrect(true);
    }
    else {
      setCorrect(false);
    }
  }

  return (
    <div class='flex flex-col p-5 justify-center bg-gray-700 rounded-md'>

        <h1 class='text-white pb-5'>{data.index+1}. {data.question}</h1>
        <fieldset class='text-white'>
        <ul class='flex-col'>
          {data.distractor.map((data, key) => (
              <li>
                <input type='radio' id={data} onClick={(e) => {e.target.value.localeCompare(answer)==0 ? setCorrect(true) : setCorrect(false);}} name={item.index+1} value={data} class='dark:text-white'/>
                <label for={data}> {key+1}) {data} </label>
              </li>
          ))}
        </ul>
        </fieldset>
        <div class='flex flex-col justify-center items-center'>
          <button type='button' onClick={() => {setReveal(!reveal); console.log(correct);}} class="flex text-center justify-center items-center w-1/3 mt-5 px-4 py-2 text-sm font-semibold bg-white dark:bg-white transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-900 md:mt-5 md:ml-4 hover:bg-gray-500 focus:text-gray-900 bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it</button>
          {reveal && correct && <h1 class='text-white'>✅ Correct Answer!</h1>}
          {reveal && !correct && <h1 class='text-white'>❌ Wrong Answer!</h1>}
        </div>
    </div>
  );
}
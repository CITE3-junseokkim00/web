import React from 'react'
import { distractor } from '@/components/api';

export default function Quiz(item) {
  const data = item.item;
  console.log(data)
  return (
    <div class='flex flex-col p-5 justify-center bg-gray-700 rounded-md'>

        <h1 class='dark:text-white'>{data.question}</h1>
        <fieldset class='text-white'>
        <ul class='flex-col'>
        <legend>Select the Correct Answer:</legend>
          {data.distractor.map((data, key) => (
            
              <div>
                <input type='radio' id={data} name={key} value={data} class='dark:text-white'/>
                <label for={data}> {data} </label>
              </div>
            
          ))}
        </ul>
        </fieldset>
    </div>
  );
}
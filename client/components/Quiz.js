import React from 'react'
import { distractor } from '@/components/api';

export default function Quiz(item) {
  const data = item.item;
  console.log(data)
  return (
    <div class='flex flex-col p-5 justify-center bg-gray-700 rounded-md'>

        <h1 class='text-white pb-5'>{data.index+1}. {data.question}</h1>
        <fieldset class='text-white'>
        <ul class='flex-col'>
          {data.distractor.map((data, key) => (
              <li>
                <input type='radio' id={data} name={data.index+1} value={data} class='dark:text-white'/>
                <label for={data}> {key+1}) {data} </label>
              </li>
          ))}
        </ul>
        </fieldset>
    </div>
  );
}
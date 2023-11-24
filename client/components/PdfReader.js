import React, { useState } from 'react'
// import {pdfjs, Document, Page} from 'react-pdf';
import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/build/pdf.worker.min.js`;



function PdfReader(func) {
    const handleFileChange = async (event) => {
        
        const file = event.target.files[0];
        if (file) {
            const dataUrl = URL.createObjectURL(file);
            const loadingTask = pdfjs.getDocument(dataUrl);
            const pdfDocument = await loadingTask.promise;

            let fullText = '';
            for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
                const page = await pdfDocument.getPage(pageNumber);
                // console.log(page)
                const pageText = await page.getTextContent();
                for(let j = 0; j < pageText.items.length; j++) {
                    fullText+=pageText.items[j].str
                }
            }
            func.func(fullText);
        }
    }

    return (
        <form class='flex flex-col items-center'>
            {/* <div class="flex flex-col items-center justify-center w-full mx-auto">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-6/12 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Only Pdf file</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" required onChange={handleFileChange} />
                </label>
                <br></br>
            </div> */}

            <div class="w-1/2 mb-3">
                <label
                    for="formFileLg"
                    class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >Select input</label
                >
                <input
                    class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    id="formFileLg"
                    type="file"
                    onChange={handleFileChange}
                    placeholder='Only PDF file required' />
                </div>
        </form>
    )
}


export default PdfReader;
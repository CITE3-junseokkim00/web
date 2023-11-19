import React, { useState } from 'react'
// import {pdfjs, Document, Page} from 'react-pdf';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';



function PdfReader(visible) {
    const [text, setText] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Create a file reader
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            
            // Read the PDF file as an ArrayBuffer
            // Handle the file reading completion
            reader.onload = async () => {
                // Load the PDF document
                
                const loadingTask = pdfjsLib.getDocument(reader.result);
                console.log("loading...")
                const pdfDocument = await loadingTask.promise;

                // Extract text from each page
                console.log('extracting...')
                let extractedText = '';
                for (let i = 1; i <= pdfDocument.numPages; i++) {
                    const page = await pdfDocument.getPage(i);
                    const pageText = await page.getText();
                    extractedText += pageText;
                }

                // Set the extracted text in the state
                console.log(extractedText)
                setText(extractedText);
            };
        }
    };

    return (
        <form class={visible ? '' :'hidden'}>
            <div class="flex flex-col items-center justify-center w-full mx-auto">
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
                {/* <div>
                    <h2 class="text-white">Extracted Text:</h2>
                    <pre class="">{text}</pre>
                </div> */}
                {/* <button class="dark:border-white px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-300 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Try it!</button> */}
            </div>
        </form>
    )
}


export default PdfReader;
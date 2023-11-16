import React, { useState } from 'react'
import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

function index() {
  return (
    <div className="text-white bg-black">
      <Head>
        <title>DOC2MCQ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default index
import { useState ,useEffect} from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [data,setData]=useState([])
  useEffect(()=>{
    const datafetchFrombackend=async()=>{
      const response=await axios("http://127.0.0.1:8000/about/")
      setData(response.data)
    }
     datafetchFrombackend();
  },[])


  return (
    <>
      <h1>App  is working fine without any errors</h1>
      <h1>the data we are fected from the backed is :: {data.message}</h1>
    </>
  )
}

export default App

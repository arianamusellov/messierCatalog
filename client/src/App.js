import './App.css';
import React, {useEffect, useState} from "react";
import Axios from 'axios'

function App() {
  const [num, setNum] = useState(0)
  const [mID, setmID] = useState('')
  const [messierObjectInfo, setMessierInfo] = useState([]) //si es un solo objeto json, qué argumento pasar, {} -> objeto

  //const getMessierInfo = () =>
  useEffect(() => { // no cacho bien la diferencia entre post y get, post -> big data
    Axios.get('http://localhost:3001/api/get').then((response) => {
      console.log(response) //lo que sea que hay en api/get va a guardarse en response
      setMessierInfo(response.data)
      
    })
  }, [num]) // esos corchetes indican el tipo de dato? esto era useEffect
/*
  useEffect(() => { // no cacho bien la diferencia entre post y get, post -> big data
    console.log(messierObjectInfo)
    const num2 = num
    setNum(num2+1)
  }, [messierObjectInfo])*/

  /*const getMessierInfo = () => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      console.log(response) //lo que sea que hay en api/get va a guardarse en response
      setMessierInfo(response.data)
      
    })}*/
  
  const sumbitMID = () => {
    const num2 = num
    setNum(num2+1)
    Axios.post('http://localhost:3001/api/insert', {
      messierID: mID
    }).then(()=>{
      console.log(mID)
      alert('successful insert')
      
      //getMessierInfo()
    })
    
  }

  return (
    <div className="App">
      <h1> Messier Object Catalogue</h1>
      <div className = "form"> 
        <label> Messier object ID: </label>
        <input type ="text" name="mID" onChange={(e) =>{
          setmID(e.target.value)
        }
        }/>
        
        <button onClick={sumbitMID}> Submit </button>
      
        getMessierInfo()
        
        {messierObjectInfo.map((val) => {
          return <h1> Messier ID: {val.m_id} | NGC: {val.ngc} </h1>
        })}
        
        

        {/* Como hago sin leerlo como arreglo?
        <h1> Messier ID: {messierObjectInfo.m_id} | NGC: {messierObjectInfo.ngc} </h1>
        <h2> Número: {num} </h2>*/}
        
      </div>
    </div>
  );
}

export default App;

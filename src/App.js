
import { useState } from 'react';
import './App.css';
import { UC,LC,NC,SC } from './Data/passChar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let[upperCase,SetUpperCase]=useState(false)
  let[LowerCase,SetLowerCase]=useState(false)
  let[specialCharCase,SetSpecialCharCase]=useState(false)
  let[numbers,setNumber]=useState(false)
  let [passLen,setPassLen]=useState(6)
  let [fpass,setFPas]=useState('')

 
let createPass=()=>{ 
  let charSet=""
  let finalpass=''
 

    if(upperCase||LowerCase||specialCharCase||numbers){

      if(upperCase){
        charSet+=UC
      }
      if(LowerCase){
        charSet+=LC
      }
      if(specialCharCase){
        charSet+=SC
      }
      if(numbers){
        charSet+=NC
      }

      for( let i=0;i<passLen;i++){
        finalpass+=charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
      setFPas(finalpass)
  }else{
    toast.warning("Please select atleast one choice!!")
  }
}
  let copyPass=()=>{
    if(fpass.length==0){
      toast.error("Nothing to copy")
    }else{
      navigator.clipboard.writeText(fpass)
      toast.success("Copied to clipboard")
    }
  }



  return (
    <div className="passwordBox">
      <h2>Password Generator</h2>
      <ToastContainer />
      <div className='passBox'>
      <input type='text' readOnly value={fpass}></input>
      <button onClick={copyPass}>Copy</button>
      </div>
      <div className='passLen'>
        <label>Password length</label>
        <input type='number' min={6} max={15} value={passLen} onChange={(event)=>setPassLen(event.target.value)} />
      </div>
      <div className='cases'>
        <label>Include upper-case character</label>
        <input type='checkbox' checked={upperCase} onChange={()=>SetUpperCase(!upperCase)}/>
      </div>
      <div className='cases'>
        <label>Include lower-case character</label>
        <input type='checkbox' checked={LowerCase} onChange={()=>SetLowerCase(!LowerCase)}/>
      </div>
      <div className='cases'>
        <label>Include numbers</label>
        <input type='checkbox' checked={numbers} onChange={()=>setNumber(!numbers)}/>
      </div>
      <div className='cases'>
        <label>Include special character</label>
        <input type='checkbox' checked={specialCharCase} onChange={()=>SetSpecialCharCase(!specialCharCase)}/>
      </div>
      <div className='passwordClick'>
      <button onClick={passLen<6? (event)=>{event.preventDefault();toast.error("Invalid input")}:createPass} className={passLen<6?"passwordNotAllowed":"passwordClickbutton"}>Generate Password</button>
      </div>
    </div>
  );
}

export default App;

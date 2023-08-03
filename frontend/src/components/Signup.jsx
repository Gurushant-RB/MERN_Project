import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style1 from "./signup.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [name, setName]=useState('');
  const [last, setLast]=useState('');
  const [email, setEmail]=useState('');
  const [pass, setPass]=useState('');
  const navigate=useNavigate();
  
  const register=(e)=>
  {
    e.preventDefault();
    const data={name, last, email, pass}
    if(name&&last&&email&&pass)
    {
      axios.post('http://localhost:4000/reg', data)
      .then((resp)=>
      {
        alert(resp.data.message);
        navigate('/');
      })
    }
    else
    {
      alert('invalid credentials');
    }
  }
  return (
    <div id={style1.container}>
      <section className={style1.sec1}>
        <div className={style1.login}>
          <h3 className={style1.h3}>Registration Form</h3>
        </div>
        <div className={style1.email_pass}>
          <form className={style1.part1}>
            <input type="text" placeholder="Enter first name" onChange={e=>setName(e.target.value)} autoFocus />
            <input type="text" placeholder="Enter last name" onChange={e=>setLast(e.target.value)} />
            <input type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter password" onChange={e=>setPass(e.target.value)}/>
            <button className={style1.button} onClick={register}>REGISTER</button>
          </form>
        </div>
        <div className={style1.part3}>
          <p>Already Registered?</p><Link to="/">Signin here</Link>
        </div>
      </section>
    </div>
  );
};
export default Signup;

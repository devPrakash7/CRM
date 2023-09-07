
import './Login.css';
import React, { useState } from 'react';
import axios from 'axios'; 
import { useHistory } from 'react-router-dom';



const Login = () => {
   
    const history = useHistory();
    const [values, setValues] = useState({
        email:"",
        password:"",
     });

     const handlesLogin = (e) => {

        const{name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    let Adminurl = "http://localhost:5001/admin/login";
   // let managerUrl = "http://localhost:5001/manager/login"


    const handleSumbit = async () =>  {

    try {

        const loginData = await axios.post(Adminurl , values)
            console.log(loginData.data);
          alert("admin login sucessfully");

        history.push('/admin/dashboard');
    
            
    }catch(err){

        console.log("Error(Login)" , err.message)
        alert('An error occurred during login.');
    }
    
 };


  return (

    <div className="App">
      <section>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ '--i': 0 }}></div>
          <div className="square" style={{ '--i': 1 }}></div>
          <div className="square" style={{ '--i': 2 }}></div>
          <div className="square" style={{ '--i': 3 }}></div>
          <div className="square" style={{ '--i': 4 }}></div>
          <div className="container">
            <div className="form">
              <h4>Welcome to TRUC</h4>
              <form>
                <div className="inputBox">
                  <input type="text" placeholder="email" name="email"  value={values.email} onChange={handlesLogin} id="name" />
                </div>
                <div className="inputBox">
                  <input type="password" placeholder="Password" name='password'  value={values.password} onChange={handlesLogin} id="paswd" />
                </div>
                <div className="inputBox">
                  <input type="button" onClick={handleSumbit} value="Login" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

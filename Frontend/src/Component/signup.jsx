import './signup.css'
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react";


const Signup = () => {

   const navigate = new useNavigate();
   const [values, setValues] = useState({
     Fname: "",
     Lname:"",
     email: "",
     password: "",
   });
 
   const handlesumbit= (e) => {
       const{name,value}=e.target
       setValues({
           ...values,
           [name]:value
       })
   }
   const registerEmployee = () => {

         const{Fname,email,Lname,password}=values;

         if(Fname && email &&password&&Lname)
       { 

        alert("posted");
         axios.post("http://localhost:5000/register",values)
         .then(res=>{
           alert(res.data.message)
  
       }
         
         )
         navigate("/login");
       }
       else{
           alert("Incomplete form")
       }
}

 return (
   <> 
   <formcontainer>
       <form>
           <div className='brand'>
             <h2>SignUp<span className='span_tag'>Page</span></h2>
           </div>
           <input type="text" placeholder='Enter your Fname' value={values.Fname} name='Fname'
           onChange={handlesumbit}
            />

           <input type="text" placeholder='Enter your Lname'value={values.Lname} name='Lname'
           onChange={handlesumbit}
            />

           <input type="text" placeholder='Enter your email' value={values.email}  name='email'
           onChange={handlesumbit}
           />

           <input type="password" placeholder='Enter your password' value={values.password} name='password'
           onChange={handlesumbit}
           />

          
         <button type='sumbit' onClick={registerEmployee}>Register</button>
         <span>Already have an account <Link to='/login'>Login</Link></span>
       </form>
      </formcontainer>
   </>
 )
}

export default Signup;
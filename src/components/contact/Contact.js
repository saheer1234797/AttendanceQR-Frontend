import React, { useState } from "react";

import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import EndPoint from '../../apis/Endpoint';
import "./Contact.css";


    function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

     e.preventDefault();
 
    try {
      const res = await fetch(EndPoint.SendEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(res.ok){
        toast.success(data.message||"Message sent sucessfully!",{
          position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        });
        setFormData({name:"",email:"",message:""})
      }else{
        toast.error(data.message||"Failed to send message");
      }
    }catch(error){
      console.log(error);
      toast.error("Failed to send message ");
      
    }
    
  };

  return <>
     <ToastContainer />
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>
          Have questions or need assistance? Reach out to us using the contact
          information below or fill out the form and we'll get back to you as
          soon as possible.
        </p>
       <p ><i className="bi bi-envelope-fill icon icon"></i>  General Inquiries: saheerk769@gmail.com</p>
        <p> <i className="bi bi-envelope-fill icon icon"></i>  Support: sk@gmail.com</p>
        <p ><i className="bi bi-clock-fill icon  icon"></i>  Business Hours: Monday - Friday, 10:00 AM - 6:00 PM IST</p>

   <p>
"From a small village to chasing big dreams — I’m living proof that your starting point never decides your finish line." - Saheer
</p>

        
        <div className="social-icons">
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-youtube"></i></a>
          <a href="https://linkedin.com/in/saheer-khan-9b7995285"><i className="bi bi-linkedin"></i></a>
          <a href="#"><i className="bi bi-twitter"></i></a>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send us a Message</h2>
        <form onSubmit={handleSubmit}>
            <lable className="l">Your Name </lable>
          <input
            type="text"
            name="name"
          
            value={formData.name}
            onChange={handleChange}
            required
          />
           <lable className="l" >Your Email</lable>
          <input
            type="email"
            name="email"
       
            value={formData.email}
            onChange={handleChange}
            required
          />
          <lable className="l" >Your Message</lable>
          <textarea className="massage"
            name="message"
           
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
</>
};

export default Contact;

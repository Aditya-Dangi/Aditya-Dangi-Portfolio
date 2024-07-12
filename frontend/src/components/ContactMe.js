import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactMeStyle.css';
import ContactMeImg from '../assets/contactme2.png';

const ContactMe = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const inputs = document.querySelectorAll('.input');

    function addFocus() {
      let parent = this.parentNode;
      parent.classList.add('focus');
    }

    function removeFocus() {
      let parent = this.parentNode;
      if (this.value === '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach(input => {
      input.addEventListener('focus', addFocus);
      input.addEventListener('blur', removeFocus);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', addFocus);
        input.removeEventListener('blur', removeFocus);
      });
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_eol8l8c', 'template_zkomtpi', form.current, {
        publicKey: 'neps6bpCwdcJIx6Vc',
      })
      .then(
        () => {
          alert('The form has been submitted successfully');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        },
        (error) => {
          alert('Failed to send the form. Please try again later.');
          console.log('FAILED...', error.text);
        }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='form-container'>
      <img className='contactme-img' src={ContactMeImg} alt="Background" />
      <form ref={form} className='contact-form' onSubmit={sendEmail}>
        <div className='input-div'>
          <label>Your Name</label>
          <input 
            type="text" 
            className="input" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className='input-div'>
          <label>Email</label>
          <input 
            type="email" 
            className="input" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className='input-div'>
          <label>Subject</label>
          <input 
            type="text" 
            className="input" 
            name="subject" 
            value={formData.subject} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className='input-div textarea-div'>
          <label>Message</label>
          <textarea 
            rows="6" 
            className="input" 
            name="message" 
            value={formData.message} 
            onChange={handleInputChange} 
            required 
          ></textarea>
        </div>
        <button type='submit' className='glow-on-hover'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactMe;

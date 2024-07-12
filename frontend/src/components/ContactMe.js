import React, { useEffect, useState } from 'react';
import './ContactMeStyle.css';
import ContactMeImg from '../assets/contactme2.png';

const ContactMe = () => {
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('The form has been submitted successfully');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      alert('There was a problem submitting the form');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was a problem submitting the form');
  }
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
      <form className='contact-form' onSubmit={handleSubmit}>
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

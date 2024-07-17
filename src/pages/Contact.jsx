import React, { useRef } from 'react';
import "./Contact.css";
import Swal from 'sweetalert2';

const Contact = () => {
  const formRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "9ab45988-b259-4d8c-b405-77bab6aef08c");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success",
        text: "Feedback sent successfully",
        icon: "success"
      });
      clearForm();
    }
  };

  const clearForm = () => {
    formRef.current.reset();
  };

  return (
    <section className='contact-form'>
      <h1>Send Us Your Feedback</h1>
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="input-box">
          <input type="text" placeholder='Full Name' name='name' required className='field' />
        </div>

        <div className="input-box">
          <input type="email" placeholder='Enter your email' name='email' required className='field' />
        </div>

        <div className="input-box">
          <textarea name="message" placeholder='Write your feedback here..' required className='field message'></textarea>
        </div>

        <button type='submit'>Send Feedback</button>
      </form>
    </section>
  );
};

export default Contact;
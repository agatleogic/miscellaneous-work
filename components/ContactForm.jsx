import { useState } from 'react';
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    console.log(data)
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg- p-5 rounded">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold">Name:</label>
        <input type="text" id="name" name="name" {...register('name', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded" />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
        <input type="email" id="email" name="email" {...register('email', { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })} className="w-full px-4 py-2 border border-gray-300 rounded" />
        {errors.email?.type === 'required' && <span className="text-red-500">Email is required</span>}
        {errors.email?.type === 'pattern' && <span className="text-red-500">Invalid email format</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="subject" className="block mb-2 font-bold">Subject:</label>
        <input type="text" id="subject" name="subject" {...register('subject', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded" />
        {errors.subject && <span className="text-red-500">Subject is required</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2 font-bold">Message:</label>
        <textarea id="message" name="message" {...register('message', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded"></textarea>
        {errors.message && <span className="text-red-500">Message is required</span>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
    </form>
  );
}

export default ContactForm;

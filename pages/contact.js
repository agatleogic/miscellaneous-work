import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-300 p-12 flex flex-col rounded-lg w-1/2 mx-auto gap-2"
    >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        className="rounded-lg p-1 text-xl"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        className="rounded-lg p-1 text-xl"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        className="rounded-lg p-1 text-xl"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        type="submit"
        className="rounded-lg p-2 mt-3 text-2xl font-bold text-white bg-cyan-500"
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;

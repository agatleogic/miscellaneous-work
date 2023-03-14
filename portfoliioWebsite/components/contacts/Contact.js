import { AiFillMessage } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import styles from "./contact.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [ip, setIp] = useState("");

  //for get ip and locationx`
  // axios.get(`http://ip-api.com/json/?fields=61439`)
  // .then((res)=>console.log(res.data))
  useEffect(() => {
    axios
      .get(`https://api.ipify.org/?format=json%27`)
      .then((res) => setIp(res.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      const sendContact = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        body: JSON.stringify({...data, ip}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!sendContact.ok) {
        console.log("failed tosend message !");
      } else {
        return sendContact.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section
        class={`text-gray-600 body-font relative my-24 ${styles.container}`}
      >
        <div class="container px-5 py-14 mx-auto flex flex-wrap md:flex-row">
          <div className="lg:w-1/2 flex flex-col mx-auto w-full p-5 mt-8 items-center md:items-start">
            <div className={styles.contactHead}>
              <h2>Get in Touch</h2>
            </div>

            <div className={styles.contactcontent}>
              <div className={styles.contactData}>
                <div className={styles.icons}>
                  <AiFillMessage />
                </div>
                <div className={styles.contactitem}>
                  <p>Call Anytime</p>
                  <h3>
                    <Link href="/">0 111 222 333</Link>
                  </h3>
                </div>
              </div>

              <div className={styles.contactData}>
                <div className={styles.icons}>
                  <HiOutlineMailOpen />
                </div>
                <div className={styles.contactitem}>
                  <p>Send Email</p>
                  <h3>
                    <Link href="/">ramanatleogic@gmail.com</Link>
                  </h3>
                </div>
              </div>

              <div className={styles.contactData}>
                <div className={styles.icons}>
                  <FiSend />
                </div>
                <div className={styles.contactitem}>
                  <p>Visit Office</p>
                  <h3>
                    <Link href="/">86 Road Broklyn street, New York</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-1/2 flex flex-col md:ml-auto w-full bg-slate-200 p-8 mt-8 rounded shadow-lg"
          >
            <div className="mb-3 flex flex-col">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                {...register("name", { required: true })}
                className={`w-full px-4 py-2 border rounded ${errors.name?"border-red-400":"border-gray-300"}`}
              />
              <div className="h-[25px]">
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
            </div>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                })}
                className={`w-full px-4 py-2 border rounded ${errors.email?"border-red-400":"border-gray-300"}`}
              />
              <div className="h-[25px]">
                {errors.email?.type === "required" && (
                  <span className="text-red-500">Email is required</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-500">Invalid email format</span>
                )}
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                {...register("subject", { required: true })}
                className={`w-full px-4 py-2 border rounded ${errors.subject?"border-red-400":"border-gray-300"}`}
              />
              <div className="h-[25px]">
                {errors.subject && (
                  <span className="text-red-500">Subject is required</span>
                )}
              </div>
            </div>
            <div className="mb-3">
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                {...register("message", { required: true })}
                className={`w-full px-4 py-2 border rounded ${errors.message?"border-red-400":"border-gray-300"}`}
              ></textarea>
              <div className="h-[25px]">
                {errors.message && (
                  <span className="text-red-500">Message is required</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
      <div className="w-[92vw] m-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14720.50172694357!2d75.8733751!3d22.7235788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd44d1beb083%3A0xf997696d678db324!2sAtal%20Dwar%2C%20HIG%20Main%20Rd%2C%20Near%20MIG%20Thana%2C%20Nehru%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452003!5e0!3m2!1sen!2sin!4v1675406186521!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: "1px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;

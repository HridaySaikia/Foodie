import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8gi5uws", // emailJS service id
        "template_beafutc", // emailJS Template id
        form.current,
        "skn14jcZhwfvF1ayQ" // emailJS Public key
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        },
        (error) => {
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-32 bg-gradient-to-b from-[#0d081f] to-[#131025]"
    >
      <ToastContainer />

      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Get in Touch</h2>
        <div className="w-28 h-1 bg-orange-500 mx-auto mt-3 rounded"></div>
        <p className="text-gray-400 mt-4 text-lg font-medium">
          Have a question, feedback, or an opportunity?  
          I’d love to hear from you! 🍴✨
        </p>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-md bg-[#1a1432] p-6 rounded-2xl shadow-2xl border border-gray-700">
  <h3 className="text-2xl font-semibold text-white text-center mb-6">
    Let’s Connect
  </h3>

  <form
    ref={form}
    onSubmit={sendEmail}
    className="flex flex-col space-y-5"
  >
    <input
      type="text"
      name="user_name"
      placeholder="Your Name"
      required
      className="w-full p-3 rounded-lg bg-[#131025] text-white text-lg border border-gray-600 focus:outline-none focus:border-orange-400 shadow-sm"
    />
    <input
      type="email"
      name="user_email"
      placeholder="Your Email"
      required
      className="w-full p-3 rounded-lg bg-[#131025] text-white text-lg border border-gray-600 focus:outline-none focus:border-orange-400 shadow-sm"
    />
    <input
      type="text"
      name="subject"
      placeholder="Subject"
      required
      className="w-full p-3 rounded-lg bg-[#131025] text-white text-lg border border-gray-600 focus:outline-none focus:border-orange-400 shadow-sm"
    />
    <textarea
      name="message"
      rows="5"
      placeholder="Write your message..."
      required
      className="w-full p-3 rounded-lg bg-[#131025] text-white text-lg border border-gray-600 focus:outline-none focus:border-orange-400 shadow-sm"
    ></textarea>

    {/* Send Button */}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-orange-500 to-pink-600 py-3 text-white font-semibold text-lg rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
    >
      Send Message 🚀
    </button>
  </form>
</div>

    </section>
  );
};

export default Contact;

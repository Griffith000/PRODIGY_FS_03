import React, { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center gap-12 px-4 py-12 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-slate-800 bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="mb-6 text-slate-700">
          Welcome to ElectroFashion Hub, your one-stop shop for the latest in
          electronics and fashion. We are dedicated to providing you with the
          best products, focusing on quality, customer service, and uniqueness.
        </p>
        <p className="mb-6 text-slate-700">
          Our store was founded with a passion for innovation and style. We
          believe in offering products that not only meet your needs but also
          inspire you. From cutting-edge gadgets to trendy apparel, we have
          something for everyone.
        </p>
        <p className="mb-6 text-slate-700">
          We are committed to ensuring that your shopping experience is seamless
          and enjoyable. Our team is always here to help you with any questions
          or concerns you may have.
        </p>
      </div>
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-clip-text text-transparent">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
         
          <button type="submit" className="transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50  m-4">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;

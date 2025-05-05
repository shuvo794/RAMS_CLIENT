"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="mt-10 mb-10 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Contact Form - Spans 3 columns */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
            <p className="text-gray-600 mb-8">
              Have a question or just want to say hi? We would love to hear from
              you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
                <Input
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
              </div>
              <Input
                placeholder="Your Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-gray-50"
              />
              <Textarea
                placeholder="Write Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-[200px] bg-gray-50"
              />
              <Button
                type="submit"
                className="bg-[#FF4B93] hover:bg-[#FF2D82] text-white px-8"
              >
                SEND YOUR MESSAGE
              </Button>
            </form>
          </div>

          {/* Contact Information - Spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col justify-center">
              <div className="space-y-8">
                {/* Dhaka Office */}
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-[#FF4B93] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Dhaka Office:</h3>
                    <p className="text-gray-600">
                      250/B Road No. 06,
                      <br />
                      Smith Dhara, Japani Bazar,
                      <br />
                      Shonitakhra, Jatra Bari,
                      <br />
                      Dhaka-1236, Bangladesh.
                    </p>
                  </div>
                </div>

                {/* UK Office */}
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-[#FF4B93] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">UK Office:</h3>
                    <p className="text-gray-600">
                      80-82 Nelson Street
                      <br />
                      London E1 2DY
                      <br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-[#FF4B93] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Email us directly</h3>
                    <a
                      href="mailto:sales@bluebayit.com"
                      className="text-gray-600 hover:text-[#FF4B93] transition-colors"
                    >
                      sales@bluebayit.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-[#FF4B93] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+8801861850206"
                        className="block text-gray-600 hover:text-[#FF4B93] transition-colors"
                      >
                        +8801861850206
                      </a>
                      <a
                        href="tel:+8801816255499"
                        className="block text-gray-600 hover:text-[#FF4B93] transition-colors"
                      >
                        +8801816255499
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#F4F5F8] flex items-center justify-center text-gray-600 hover:bg-[#FF4B93] hover:text-white transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#F4F5F8] flex items-center justify-center text-gray-600 hover:bg-[#FF4B93] hover:text-white transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#F4F5F8] flex items-center justify-center text-gray-600 hover:bg-[#FF4B93] hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

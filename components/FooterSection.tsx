import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

const companyLinks = [
  { title: "HOME", href: "/" },
  { title: "About", href: "/About" },
  { title: "Blog", href: "/Blog" },
  { title: "PRICING", href: "/pricing" },
  { title: "CONTACT US", href: "/Contactus" },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#2530bd] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/bbit.png"
                alt="BlueBayIT Logo"
                width={100}
                height={50}
              />
            </Link>
            <p className="text-gray-300 mb-6">
              Happen active county. Winding for the morning am shyness evident
              to poor. Garrets because elderly new.
            </p>
            {/* Social Media Icons */}
            {/* <div className="mt-4 sm:mt-0 flex  gap-4">
              {[
                { Icon: Facebook, link: "#" },
                { Icon: Twitter, link: "#" },
                { Icon: Linkedin, link: "#" },
                { Icon: Mail, link: "#" },
              ].map((social, index) => {
                const { Icon, link } = social;
                return (
                  <a
                    href={link}
                    key={index}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#262fbc]-800 hover:bg-[#262fbc]-700 transition-all transform hover:scale-110 text-[#262fbc]-400 hover:text-white"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div> */}
            {/* Download App Section */}
            <div className="text-white mt-10 rounded-lg">
              <h3 className="text-xl font-bold mb-4 sm:mb-0">
                Download the App
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="flex items-center bg-white text-blue-800 px-4 py-2 rounded-lg"
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="24"
                        height="24"
                      >
                        <path
                          fill="#FFD400"
                          d="M113.1 0L296.6 183.5 253.7 226.4 0 512V0z"
                        />
                        <path fill="#FF3333" d="M0 0v512l253.7-285.6L0 0z" />
                        <path
                          fill="#48FF48"
                          d="M296.6 183.5l91.4 91.4-43 43L253.7 226.4z"
                        />
                        <path
                          fill="#00D2FF"
                          d="M388 274.9l-274.9 137.6L0 512l253.7-285.6L388 274.9z"
                        />
                      </svg>
                    </span>
                    Google Play
                  </a>
                  <a
                    href="#"
                    className="flex items-center bg-white text-blue-800 px-4 py-2 rounded-lg"
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M255.8 0C114.6 0 0 114.6 0 255.8S114.6 511.6 255.8 511.6 511.6 397 511.6 255.8 397 0 255.8 0zm76.3 375.5c-8.7 15-26.4 24.7-43.3 24.7-13.7 0-22.7-4.6-38.2-4.6s-25.4 4.6-39.1 4.6c-17.1 0-33.4-9.5-42-24.7-25.1-43.4-38.3-95.6-16-138.1 11.2-21.6 31.2-35.4 54.4-35.4 13.1 0 25.3 5.2 38.2 5.2s23.6-5.2 38.2-5.2c23.2 0 42.2 13.3 53.2 34.6 1.1 2.1 2.1 4.3 3.1 6.4-4.7 2.2-45 21.1-44.9 62.4.1 38.4 35.3 55.9 38.5 57.1zm-76.3-249.2c-10.6 0-24.2 7.4-32 16.8-6.9 8.4-12.7 21.6-10.5 34.3h.6c11.5 0 23.5-7.5 30.8-16.7 6.9-8.5 12.2-21.8 11.1-34.4z" />
                      </svg>
                    </span>
                    App Store
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BD Contact Info */}

          <div>
            <h3 className="text-xl font-bold mb-6">Dhaka Office</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  250/6Road No: 06, Smriti Dhara, Japani Bazar,Shonirakhra,
                  Jatra Bari,Dhaka-1236, Bangladesh.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>admin@bluebayit.com</div>
                  <div>support@gmail.com</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>+8801861650206</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#262fbc] text-gray-400 py-4">
        <div className="container mx-auto flex items-center justify-center px-4">
          <p className="text-sm text-center">
            © 2025{" "}
            <span className="text-white font-semibold">Bluebay IT Limited</span>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

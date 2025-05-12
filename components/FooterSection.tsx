import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

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
            <div className="mt-4 sm:mt-0 flex  gap-4">
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
            </div>
            {/* Download */}
            <div className="mt-4 sm:mt-0 flex  gap-4">
              <h3 className="text-xl font-bold mb-6">Download the App</h3>
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

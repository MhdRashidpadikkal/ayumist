'use client'

import Link from 'next/link'
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#5e411d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">AYUMIST</h2>
          <p className="text-sm mt-2">Ayurveda for Everyone</p>
          <p className="text-sm mt-1">Natural Beauty | Skin & Hair Care</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            <li><Link href="/our-story" className="hover:underline">Our Story</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/refund" className="hover:underline">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm">📞 090488 67707</p>
          <p className="text-sm">📧 info@ayumist.com</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-yellow-300"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-yellow-300"><FaYoutube size={20} /></a>
            <a href="#" className="hover:text-yellow-300"><FaFacebookF size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} AYUMIST. All rights reserved.
      </div>
    </footer>
  )
}

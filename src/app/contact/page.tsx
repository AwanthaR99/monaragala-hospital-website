"use client";

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Button from '@/components/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white">
      {/* Page Title Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">අපව අමතන්න</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">ඔබගේ ගැටළු, යෝජනා සහ අදහස් අපට දන්වන්න.</p>
        </div>
      </div>

      {/* Main Content: Info + Form */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Info & Map */}
          <div data-aos="fade-right">
            <h2 className="text-2xl font-poppins font-bold mb-6">සම්බන්ධීකරණ තොරතුරු</h2>
            <div className="space-y-4 font-lato">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-blue-600 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">ලිපිනය</h3>
                  <p className="text-gray-600">දිස්ත්‍රික් මහ රෝහල, කොළඹ - බදුල්ල පාර, මොණරාගල, ශ්‍රී ලංකාව.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaPhone className="text-blue-600 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">දුරකථන</h3>
                  <p className="text-gray-600">055-2276261</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-blue-600 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">ඊමේල්</h3>
                  <p className="text-gray-600">dghmonaragala@health.gov.lk</p>
                </div>
              </div>
            </div>
            
            {/* Embedded Google Map */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.993701816586!2d81.33999800907087!3d6.891355693078959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae450822efad3d5%3A0xc77ffeaef05c031c!2sDistrict%20General%20Hospital%20Monaragala!5e0!3m2!1sen!2slk!4v1753287414743!5m2!1sen!2slk" 
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div data-aos="fade-left">
            <h2 className="text-2xl font-poppins font-bold mb-6">පණිවිඩයක් එවන්න</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-md">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">නම</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">ඊමේල් ලිපිනය</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">මාතෘකාව</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">පණිවිඩය</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <div>
                <Button variant="primary" className="w-full" disabled={status === 'Sending...'}>
                  {status === 'Sending...' ? 'Sending...' : 'පණිවිඩය යවන්න'}
                </Button>
              </div>
              {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  imageSrc?: string;
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  linkHref: string;
  linkText: string;
};

function Card({ imageSrc, icon, title, children, linkHref, linkText }: CardProps) {
  const cardContent = (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl h-full flex flex-col">
      {imageSrc && (
        <div className="relative w-full h-48">
          <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        {icon && <div className="mb-4 text-[#1976D2]">{icon}</div>}
        <h4 className="font-poppins font-bold text-xl text-gray-800 mb-2">
          {title}
        </h4>
        <p className="font-lato text-gray-600 mb-4 flex-grow">
          {children}
        </p>
        {linkHref && linkText && (
          <div className="mt-auto">
             <span className="font-semibold text-[#1976D2] hover:underline">
                {linkText} &rarr;
             </span>
          </div>
        )}
      </div>
    </div>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} passHref>
        <div className="block cursor-pointer">{cardContent}</div>
      </Link>
    );
  }

  return cardContent;
}

export default Card;
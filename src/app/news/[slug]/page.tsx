import React from 'react';
import { client } from '@/lib/sanityClient';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

// Define the type for a single news item
interface SingleNews {
  title: string;
  imageUrl: string;
  content: any;
  _createdAt: string;
}

// This function fetches a single news item based on its slug
async function getSingleNewsData(slug: string): Promise<SingleNews | null> {
  const query = `*[_type == "news" && slug.current == "${slug}"][0]{
    title,
    "imageUrl": mainImage.asset->url,
    content,
    _createdAt
  }`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const SingleNewsPage = async ({ params }: { params: { slug: string } }) => {
  const newsItem = await getSingleNewsData(params.slug);

  if (!newsItem) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold">404 - පුවත සොයාගත නොහැක</h1>
        <p className="mt-4">සමාවන්න, ඔබ සොයන පුවත මෙහි නොමැත.</p>
        <Link href="/news" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          &larr; සියලුම පුවත් වෙත ආපසු යන්න
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <article>
          <div className="mb-8">
            <Link href="/news" className="text-blue-600 hover:underline font-semibold font-lato">
              &larr; සියලුම පුවත් වෙත
            </Link>
          </div>

          <p className="text-gray-500 font-lato mb-2 text-sm">
            Published on {new Date(newsItem._createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>

          {/* Title - Reduced font size on medium screens and up */}
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-8 leading-tight">
            {newsItem.title}
          </h1>

          {/* Main Image - Reduced height */}
          {newsItem.imageUrl && (
            <div className="relative w-full h-80 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg" data-aos="fade-up">
              <Image 
                src={newsItem.imageUrl} 
                alt={newsItem.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose lg:prose-xl max-w-none font-lato text-gray-800" data-aos="fade-up" data-aos-delay="100">
            <PortableText value={newsItem.content} />
          </div>

        </article>
      </div>
    </div>
  );
};

export default SingleNewsPage;
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

  // This check is very important. If no news item is found, show a "Not Found" message.
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
      <div className="container mx-auto px-6 py-12">
        <article>
          {/* Back link */}
          <div className="mb-8">
            <Link href="/news" className="text-gray-600 hover:text-blue-600 font-semibold">
              &larr; සියලුම පුවත් වෙත
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            {newsItem.title}
          </h1>

          {/* Published Date */}
          <p className="text-gray-500 font-lato mb-6">
            Published on: {new Date(newsItem._createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>

          {/* Main Image */}
          {newsItem.imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={newsItem.imageUrl} 
                alt={newsItem.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          {/* Content Body */}
          <div className="prose lg:prose-xl max-w-none font-lato text-gray-800">
            <PortableText value={newsItem.content} />
          </div>

        </article>
      </div>
    </div>
  );
};

export default SingleNewsPage;
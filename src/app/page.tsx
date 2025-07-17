import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { FaStethoscope, FaNewspaper, FaUserMd } from 'react-icons/fa';
import { client } from '@/lib/sanityClient';

// Define the type for our news data
interface News {
  _id: string;
  title: string;
  imageUrl: string;
  shortDescription: string;
  slug: { current: string };
}

// This function fetches news data from Sanity
async function getNewsData(): Promise<News[]> {
    const query = `*[_type == "news"] | order(_createdAt desc)[0...3]{
      _id,
      title,
      "imageUrl": mainImage.asset->url,
      shortDescription,
      slug
    }`;
    const data = await client.fetch(query, {}, { cache: 'no-store' });
    return data;
}


export default async function Home() {
  // Fetch the data before returning the page
  const latestNews = await getNewsData();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <Image 
          src="/images/hero-background.jpeg"
          alt="Monaragala Hospital Entrance"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="z-20 p-4">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl">
            නිරෝගී ප්‍රජාවක් සඳහා අපගේ කැපවීම
          </h1>
          <p className="font-lato mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            මොණරාගල දිස්ත්‍රික් මහ රෝහලේ නිල වෙබ් අඩවියට ඔබ සාදරයෙන් පිළිගනිමු.
          </p>
          
<div className="mt-8 flex justify-center gap-4">
  <Link href="/clinics">
    <Button variant="primary">සායන කාලසටහන</Button>
  </Link>
  <Link href="/contact">
    <Button variant="secondary">අපව අමතන්න</Button>
  </Link>
</div>

        </div>
      </section>

      {/* Quick Access Hub */}
      <section className="bg-gray-50 py-16" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              icon={<FaStethoscope size={40} />}
              title="සායන සහ වෛද්‍ය සේවා"
              linkHref="/clinics"
              linkText="තොරතුරු සඳහා පිවිසෙන්න"
            >
              ඔබට අවශ්‍ය සායනය, වෛද්‍යවරයා සහ වේලාවන් පහසුවෙන් සොයාගන්න.
            </Card>
            <Card 
              icon={<FaNewspaper size={40} />}
              title="පුවත් සහ දැනුම්දීම්"
              linkHref="/news"
              linkText="සියලුම පුවත්"
            >
              රෝහලේ නවතම සිදුවීම්, සෞඛ්‍ය කඳවුරු සහ විශේෂ දැනුම්දීම්.
            </Card>
            <Card 
              icon={<FaUserMd size={40} />}
              title="විශේෂඥ වෛද්‍යවරු"
              linkHref="/doctors"
              linkText="නාමාවලිය බලන්න"
            >
              අපගේ රෝහලේ සේවයේ නියුතු විශේෂඥ වෛද්‍යවරුන් පිළිබඳ විස්තර.
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Snapshot */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <Image
              src="/images/about-us-image.jpeg"
              alt="Hospital Staff"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="font-poppins font-bold text-3xl text-gray-800">අපේ දැක්ම සහ මෙහෙවර</h2>
            <p className="font-lato text-gray-600 mt-4">
              මොණරාගල දිස්ත්‍රික්කයේ ප්‍රමුඛතම සෞඛ්‍ය සේවා සපයන්නා බවට පත්වීම, නවීන තාක්ෂණයෙන් සහ දයාන්විත සේවයකින් සවිබල ගැන්වූ නිරෝගී ප්‍රජාවක් බිහිකිරීම අපගේ ඒකායන අරමුණයි.
            </p>
            <div className="mt-6">
              <Link href="/about">
                <Button variant="primary">වැඩිදුර කියවන්න</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest News Section (Now Dynamic) */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-8" data-aos="fade-up">නවතම පුවත්</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews && latestNews.map((newsItem, index) => (
              <div key={newsItem._id} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card 
                  imageSrc={newsItem.imageUrl} 
                  title={newsItem.title} 
                  linkHref={newsItem.slug?.current ? `/news/${newsItem.slug.current}` : '#'}
                  linkText="වැඩිදුර කියවන්න"
                >
                  {newsItem.shortDescription}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
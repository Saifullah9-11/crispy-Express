import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1200&q=80',
  url = 'https://crispy-express.run.app',
  type = 'website'
}) => {
  const siteTitle = `${title} | Crispy Express`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FastFoodRestaurant",
          "name": "Crispy Express",
          "image": image,
          "@id": url,
          "url": url,
          "telephone": "+923001234567",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Chicken Street",
            "addressLocality": "Lahore",
            "postalCode": "54000",
            "addressCountry": "PK"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "10:00",
            "closes": "23:59"
          },
          "priceRange": "$$",
          "servesCuisine": "Fast Food, Fried Chicken"
        })}
      </script>
    </Helmet>
  );
};

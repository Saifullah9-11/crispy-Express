import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const fullTitle = `${title} | Crispy Express`;
  const defaultDesc = "The ultimate destination for crispy fried chicken, juicy burgers, and unbeatable deals. Fast delivery, fresh taste, and bold flavors.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" />
    </Helmet>
  );
};

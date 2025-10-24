import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "PrimaHealth - Platform Kesehatan Mahasiswa FK UM",
  description = "Platform kesehatan terintegrasi untuk mahasiswa Fakultas Kedokteran Universitas Negeri Malang. Edukasi kesehatan, galeri kegiatan, dan tanya jawab kesehatan.",
  keywords = "kesehatan, mahasiswa, FK UM, PrimaHealth, edukasi kesehatan, galeri kesehatan, tanya jawab kesehatan, Universitas Negeri Malang",
  image = "/Logo_Hijau.png",
  url = "https://primahealth.my.id",
  type = "website",
  structuredData = null
}) => {
  const fullTitle = title.includes('PrimaHealth') ? title : `${title} | PrimaHealth`;
  const fullUrl = url.startsWith('http') ? url : `https://primahealth.my.id${url}`;
  const fullImage = image.startsWith('http') ? image : `https://primahealth.my.id${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="PrimaHealth" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

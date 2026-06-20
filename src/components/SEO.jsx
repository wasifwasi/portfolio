import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://wasifrehman.com";
const SITE_NAME = "Wasif Rehman Portfolio";
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

const SEO = ({
  title = "Wasif Rehman | Solution Architect",
  description = "Solution Architect designing and shipping end-to-end systems across web, mobile, and AI — from real-time platforms and 3D experiences to AI-powered automation on Next.js, React, and modern cloud stacks.",
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  article = null,
  noindex = false,
}) => {
  const url = `${SITE_URL}${path}`;

  // JSON-LD Structured Data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wasif Rehman",
    url: SITE_URL,
    jobTitle: "Solution Architect",
    description: "Solution Architect designing end-to-end systems across web, mobile, and AI with Next.js, React, Node.js, and modern cloud stacks.",
    sameAs: [
      "https://github.com/wasifrehman",
      "https://linkedin.com/in/wasifrehman",
    ],
    knowsAbout: [
      "React", "Node.js", "Next.js", "React Native", "Python",
      "JavaScript", "TypeScript", "AI/ML", "Firebase", "MongoDB",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Portfolio of Wasif Rehman - Solution Architect",
    author: personSchema,
  };

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
          "@type": "Person",
          name: "Wasif Rehman",
        },
        publisher: {
          "@type": "Person",
          name: "Wasif Rehman",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        keywords: article.tags?.join(", "),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...(path !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: title,
              item: url,
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(path === "/" ? [websiteSchema, personSchema] : breadcrumbSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

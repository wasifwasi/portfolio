import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://portfolio-wod3.vercel.app";
const SITE_NAME = "Wasif Rehman Portfolio";
// Social preview image (1200x630), built from real project photos
const DEFAULT_IMAGE = `${SITE_URL}/og.jpg`;

const SEO = ({
  title = "Wasif Rehman | Full-Stack & AI Engineer",
  description = "Wasif Rehman — full-stack & AI engineer. I build AI agents, automation pipelines, Next.js web platforms and React Native apps that work in production. Book a free 15-min call.",
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  article = null,
  noindex = false,
}) => {
  const url = `${SITE_URL}${path}`;
  // Link previews need absolute image URLs
  const imageUrl = image.startsWith("/") ? `${SITE_URL}${image}` : image;

  // JSON-LD Structured Data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wasif Rehman",
    url: SITE_URL,
    jobTitle: "Full-Stack & AI Engineer",
    description: "Full-stack & AI engineer building AI agents, Next.js platforms and React Native apps that work in production.",
    sameAs: [
      "https://github.com/wasifwasi",
      "https://www.linkedin.com/in/wasif-rehman-32210a18b/",
    ],
    knowsAbout: [
      "AI agents", "LLM integration", "Next.js", "React", "React Native",
      "Node.js", "Python", "FastAPI", "TypeScript", "PostgreSQL", "Supabase",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Portfolio of Wasif Rehman — Full-Stack & AI Engineer",
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
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

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

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const blogContent = {
  'next-19-new-features': {
    title: 'Next 19 New Features',
    date: 'December 12, 2025',
    content: (
      <>
        <p>Next.js 19 has arrived, bringing a suite of powerful new features designed to streamline development and boost application performance.</p>
        <h3>1. Enhanced TurboPack</h3>
        <p>The build system has been completely overhauled with the latest version of TurboPack, offering up to 50% faster build times.</p>
        <h3>2. Server Actions 2.0</h3>
        <p>Server Actions have been refined for better type safety and easier error handling, making full-stack React even more seamless.</p>
        <h3>3. Built-in AI SDK Integration</h3>
        <p>Next.js 19 introduces native support for AI SDKs, simplifying the integration of LLMs into your applications.</p>
        <p>These features mark a significant step forward for the React framework, solidifying its position as a top choice for modern web development.</p>
      </>
    ),
  },
  'security-flaw-react2shell': {
    title: 'Security Flaw: react2shell',
    date: 'December 10, 2025',
    content: (
      <>
        <p>A critical security vulnerability has been identified in the popular `react2shell` library.</p>
        <h3>The Vulnerability</h3>
        <p>The flaw allows for potential arbitrary code execution if user input is not properly sanitized before being passed to the shell execution context.</p>
        <h3>Impact</h3>
        <p>Applications using `react2shell` versions prior to 1.4.5 are at risk. Attackers could exploit this to gain unauthorized access to the server environment.</p>
        <h3>Mitigation</h3>
        <p>Developers are urged to upgrade to version 1.4.5 or later immediately. If an upgrade is not possible, ensure strict input validation is in place for any data passed to the library.</p>
      </>
    ),
  },
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogContent[id];

  if (!post) {
    return (
      <div className="blog-post section container">
        <h2>Post not found</h2>
        <Link to="/blog" className="button button--flex">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="blog-post section" id="blog-post">
      <div className="container">
        <Link to="/blog" className="blog--back-link">
          <i className="ri-arrow-left-line"></i> Back to Blogs
        </Link>
        <h1 className="section--title">{post.title}</h1>
        <span className="section--subtitle">{post.date}</span>
        <div className="blog--content">{post.content}</div>
      </div>
    </section>
  );
};

export default BlogPost;

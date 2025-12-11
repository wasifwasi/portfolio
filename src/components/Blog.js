import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'; // We'll create this for styling

const blogs = [
  {
    id: 'next-19-new-features',
    title: 'Next 19 New Features',
    excerpt: 'Explore the groundbreaking features introduced in Next.js 19, from enhanced performance to new routing capabilities.',
    date: 'December 12, 2025',
  },
  {
    id: 'security-flaw-react2shell',
    title: 'Security Flaw: react2shell',
    excerpt: 'A critical look at the recently discovered security vulnerability in the react2shell library and how to mitigate it.',
    date: 'December 10, 2025',
  },
];

const Blog = () => {
  return (
    <section className="blog section" id="blog">
      <h2 className="section--title">Latest Blogs</h2>
      <span className="section--subtitle">My thoughts & insights</span>

      <div className="blog--container container grid">
        {blogs.map((blog) => (
          <div className="blog--card" key={blog.id}>
            <h3 className="blog--title">{blog.title}</h3>
            <p className="blog--description">{blog.excerpt}</p>
            <span className="blog--date">{blog.date}</span>
            <Link to={`/blog/${blog.id}`} className="blog--button button button--flex">
              Read More <i className="ri-arrow-right-line button--icon"></i>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;

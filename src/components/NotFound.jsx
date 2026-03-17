import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import SEO from "./SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Wasif Rehman"
        description="The page you're looking for doesn't exist."
        noindex={true}
      />
      <section className="notfound section">
        <div className="notfound--container container">
          <div className="notfound--content">
            <span className="notfound--code">404</span>
            <h1 className="notfound--title">Page Not Found</h1>
            <p className="notfound--description">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="notfound--actions">
              <Link to="/" className="notfound--btn">
                <Home size={18} />
                Back to Home
              </Link>
              <button
                className="notfound--btn notfound--btn-outline"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;

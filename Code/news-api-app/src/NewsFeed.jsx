import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "7e0360cf627e429489971dfba48c701b";
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setArticles(data.articles);

        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "#333";
    document.body.style.color = "#fff";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  if (loading) {
    return <div className="text-center text-primary py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger py-5">Error: {error}</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#333" }}>
      <div className="container py-5">
        <h1 className="text-center mb-4" style={{ color: "#fff" }}>
          Top News
        </h1>
        <div className="d-flex flex-wrap justify-content-center" style={{ gap: "1rem" }}>
          {articles
            .filter((article) => article.title !== "[Removed]" && article.urlToImage != null) // Exclude articles with "[Removed]" title
            .map((article, index) => (
              <div
                key={index}
                className="card shadow-sm"
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: "15px",
                  width: "300px",
                }}
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    className="card-img-top"
                    alt={article.title}
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>
                    {article.title}
                  </h5>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm mt-3"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;

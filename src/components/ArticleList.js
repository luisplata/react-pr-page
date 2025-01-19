import React from "react";
import Article from "./Article";

const ArticleList = ({ quality, articles }) => {
    return (
        <section id={`calidad-${quality}`} className="my-5">
            <div className="container">
                <h2 className="text-left mb-4 ms-4">{quality}</h2>
                <div >
                    {articles.map((article, index) => (
                        <div className="mb-4 d-inline-flex" key={index}>
                            <Article
                                id={article.id}
                                name={article.name}
                                description={article.description}
                                image={article.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArticleList;

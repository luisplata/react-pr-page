import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("https://lobasvip.com.ve/index.php/api/people")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error("Error:", error));
    }, []);

    const articles = data;
    
    const articlesData = [
        {
            id: 1,
            nombre: "Artículo A1",
            description: "Descripción breve A1",
            image: "https://picsum.photos/200/300",
            mapa: "Zona 1",
            tags: ["Categoria 1", "Categoria 2"],
        },
    ];

    const [filters, setFilters] = useState({
        name: "",
        zone: "",
        categories: [],
    });

    const filteredArticles = articles.filter((article) => {
        const matchesName =
            article.nombre.toLowerCase().includes(filters.name.toLowerCase());

        const matchesZone = filters.zone
            ? article.zone === filters.zone
            : true;

        const matchesCategories =
            filters.categories.length === 0 ||
            filters.categories.some((category) =>
                article.categories.includes(category)
            );

        return matchesName && matchesZone && matchesCategories;
    });

    return (
        <div>
            {articles.map((item)=>(
                <div>{}</div>
            ))}
            <Header></Header>
            <div className="container ps-5">
                <h3>Articulos Mexico</h3>
                
            </div>
            <Filters setFilters={setFilters} />
            <ArticleList quality="Disponibles" articles={filteredArticles} />
            <Footer></Footer>    
        </div>
    );
};

export default Home;

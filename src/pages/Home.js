import React, { useState } from "react";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    const articlesData = [
        {
            id: 1,
            name: "Artículo A1",
            description: "Descripción breve A1",
            image: "https://picsum.photos/200/300",
            zone: "Zona 1",
            categories: ["Categoria 1", "Categoria 2"],
        },
        {            
            id: 2,
            name: "Artículo A2",
            description: "Descripción breve A2",
            image: "https://picsum.photos/200/300",
            zone: "Zona 2",
            categories: ["Categoria 2", "Categoria 3"],
        },
        {            
            id: 2,
            name: "Artículo A2",
            description: "Descripción breve A2",
            image: "https://picsum.photos/200/300",
            zone: "Zona 2",
            categories: ["Categoria 2", "Categoria 3"],
        },
        {            
            id: 2,
            name: "Artículo A2",
            description: "Descripción breve A2",
            image: "https://picsum.photos/200/300",
            zone: "Zona 2",
            categories: ["Categoria 2", "Categoria 3"],
        },
        {            
            id: 2,
            name: "Artículo A2",
            description: "Descripción breve A2",
            image: "https://picsum.photos/200/300",
            zone: "Zona 2",
            categories: ["Categoria 2", "Categoria 3"],
        }
    ];

    const [filters, setFilters] = useState({
        name: "",
        zone: "",
        categories: [],
    });

    const filteredArticles = articlesData.filter((article) => {
        const matchesName =
            article.name.toLowerCase().includes(filters.name.toLowerCase());

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
            <Header></Header>
            <div className="container ps-5">
                <h3>Articulos Mexico</h3>
                
            </div>
            <Filters setFilters={setFilters} />
            <ArticleList quality="Alta Calidad" articles={filteredArticles} />
            <ArticleList quality="Media Calidad" articles={filteredArticles} />
            <ArticleList quality="Baja Calidad" articles={filteredArticles} />
            <Footer></Footer>    
        </div>
    );
};

export default Home;

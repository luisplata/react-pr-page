import React, { useState } from "react";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";
import Header from "../components/Header";

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
        // Agrega más artículos...
    ];

    const [filters, setFilters] = useState({
        name: "",
        zone: "",
        categories: [],
    });

    // Filtrar los artículos según los filtros seleccionados
    const filteredArticles = articlesData.filter((article) => {
        // Filtro por nombre
        const matchesName =
            article.name.toLowerCase().includes(filters.name.toLowerCase());

        // Filtro por zona
        const matchesZone = filters.zone
            ? article.zone === filters.zone
            : true;

        // Filtro por categoría
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
            <Filters setFilters={setFilters} />
            <ArticleList quality="Alta Calidad" articles={filteredArticles} />
            <ArticleList quality="Media Calidad" articles={filteredArticles} />
            <ArticleList quality="Baja Calidad" articles={filteredArticles} />
        </div>
    );
};

export default Home;

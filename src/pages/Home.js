import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useUserLocation from "../hooks/useUserLocation";
import { calcularDistanciaKm } from "../utils/distance";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Home = () => {

    const [data, setData] = useState([]);
    const { location, getLocation } = useUserLocation();

    useEffect(() => {
               
      fetch(`${API_BASE_URL}people`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error("Error:", error));
    }, []);

    const articles = data;
    const getDistance = calcularDistanciaKm;

    function getZones (){
        if (articles){
            const zones = [];
            for (let article of articles){
                if (!zones.includes(article.mapa))
                    zones.push(article.mapa)
            }
            return zones;
        }
    }

    const [filters, setFilters] = useState({
        name: "",
        zone: "",
        categories: [],
        distance: 0,
    });
    useEffect(()=>{
        if (filters.distance > 0 && !location)
            getLocation();
    }, [filters])

    const filteredArticles = articles.filter((article) => {

        const matchesName =
            article.nombre.toLowerCase().includes(filters.name.toLowerCase());
            

        const matchesZone = filters.zone
            ? article.mapa === filters.zone
            : true;

            
        let matchesCategories = false;
        
        if(filters.categories.length > 0)
        {
            if(article.tags.some(tag => tag.tipo === "categoria"))
            {
                console.log("hayCategoria");
                
                const categoryValue = article.tags.find(tag => tag.tipo === "categoria").valor.toLowerCase();

                for (let category of filters.categories){
                    console.log(categoryValue);
                    
                    if (categoryValue && categoryValue.includes(category)){
                        matchesCategories = true;
                        break;
                    }
                }
            }
        }
        else if(article.media.length >= 0) matchesCategories = true;
        let near = false;
        if (filters.distance > 0 && location){
            
            const coords = article.tags.find(tag => tag.tipo === "mapa");
            if (coords){
                const [latStr, lonStr] = coords.valor.split(',');
                const distance = getDistance(location.lat, location.lon, latStr, lonStr);
                near = distance >= filters.distance;
                
            }
        }
        else near = true;        

        return matchesName && matchesZone && matchesCategories && near;
    });

    return (
        <div>
            {articles.map((item)=>(
                <div>{}</div>
            ))}
            <Header></Header>
            <div className="container ps-5">
                <h3>Modelos</h3>
            </div>
            <Filters setFilters={setFilters} zones = {articles? getZones() : ["Zona 1", "Zona 2", "Zona 3"]}/>
            <ArticleList quality="Disponibles" articles={filteredArticles} />
            <Footer></Footer>    
        </div>
    );
};

export default Home;

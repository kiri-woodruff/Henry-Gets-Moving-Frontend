import './IndividualRecipe.scss';
import React, {useEffect, useState} from "react";
import recipeStock from '../../Assets/recipeStock.jpg';
import {Helmet, HelmetProvider} from "react-helmet-async";
import Weather from "../../Components/Weather";
import Grass from "../../Components/Grass";
import BackArrow from "../../Components/BackArrow/BackArrow";
import {Recipe} from "../../Structs/DataTypes";
import {useParams} from "react-router-dom";
import {API_URL} from "../../API";

const IndividualRecipe = () => {
    const [recipe, setRecipe] = useState<Recipe>()
    const id = useParams();
    useEffect( () => {
        const getRecipe = async () => {
            const recipe =  await fetch(`${API_URL}/recipes/${id.id}`)
                .then((response) => {
                    if (response.ok) return response.json();
                    return {
                        errorCode: response.status,
                        error: response.statusText,
                    }
                }).then((response) => {
                    return response as Recipe
                });
            console.log(recipe)
            setRecipe(recipe)
        }
        getRecipe()
    }, [])
    return (
        <div className="individual-recipe">
            <HelmetProvider>
                <Helmet>
                    <title>{recipe?.name}</title>
                </Helmet>
            </HelmetProvider>
            <Weather/>
            <BackArrow route="/recipes"/>
            <div className='recipe-div'>
                <div className='recipe-image'>
                    <img src={recipe?.thumbnail} alt='RecipePage Name'/>
                </div>
                <div className='recipe-cook-info'>
                    <h2>{recipe?.name}</h2>
                    <p><strong>Prep Time</strong>: {recipe?.prep_time}</p>
                    <p><strong>Cook Time</strong>: {recipe?.cook_time}</p>
                </div>
            </div>
            <div className='recipe-text'>
                <p>
                    <strong>Ingredients</strong>: {recipe?.ingredients}
                </p>
                <p>
                    <strong>Steps</strong>: {recipe?.recipe_steps}
                </p>
            </div>
            <Grass/>
        </div>
    )
}

export default IndividualRecipe;
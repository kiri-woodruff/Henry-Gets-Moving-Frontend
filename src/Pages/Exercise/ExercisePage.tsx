import './Exercise.scss';
import exerciseStock from '../../Assets/exerciseStock.jpg'
import trophy from '../../Assets/40mins.svg'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import exit from '../../Assets/Exit.svg';
import {Helmet, HelmetProvider} from "react-helmet-async";
import Grass from "../../Components/Grass";
import Weather from "../../Components/Weather";
import API from '../../API';
import {Exercise, ExerciseCategory} from "../../Structs/DataTypes";

const ExercisePage = () => {
    const [selectedExercise, setSelectedExercise] = useState<null | Exercise>(null);
    const [exercises, setExercises] = useState([] as Exercise[])
    const [exerciseCategory, setExerciseCategory] = useState([] as ExerciseCategory[])
    const [selectedCategory, setSelectedCategory] = useState("");
    const [noMoreExercises, setNoMoreExercises] = useState(false)
    const [page, setPage] = useState(2)

    useEffect(() => {
        API.getPaginatedExercises(String(1)).then((response) => setExercises(response.data));
        API.getPaginatedExercises(String(page)).then((response) => {
            if(response.data.length == 0){
                setNoMoreExercises(true)
            }
        })
        API.getExerciseCategories().then((category) => setExerciseCategory(category));
    }, [])
    const navigate = useNavigate();

    const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    }

    const getMoreExercises = () => {
        API.getPaginatedExercises(String(page)).then((response) => setExercises(exercises.concat(response.data)));
        API.getPaginatedExercises(String(page + 1)).then((response) => {
            if(response.data.length == 0){
                setNoMoreExercises(true)
            }
        })
        console.log(exercises)
        setPage(page + 1)
    }

    const categoryLayout = (category: ExerciseCategory[]) => {
        return category.map((category) => {
                return (
                    <option value={category.id}>{category.name}</option>
                )
            }
        )
    }

    const exerciseLayout = (individualExercise: Exercise[], filter: string) => {
        return  individualExercise.filter((exercise) => {
            if (filter === "") return true;
            return exercise.category_id.toString() === filter;
        }).map((exercise) => {
                return (
                    <>
                        <div className='grid-content'>
                            <img src={exercise.thumbnail_link} onClick={e => (setSelectedExercise(exercise))}
                                 alt={exercise.name + " Thumbnail"}/>
                            <p className='name'>{exercise.name}</p>
                            <p className='category'>{exercise.exerciseCategory?.name}</p>
                        </div>

                    </>
                )
            }
        )
    }
    return (
        <div className="exercise">
            <HelmetProvider>
                <Helmet>
                    <title>Get Moving</title>
                </Helmet>
            </HelmetProvider>
            <Weather/>
            <div className='otd-div'>
                <div className='otd-image'>
                    <img src={exerciseStock} alt={"OTD Thumbnail"}/>
                </div>
                <div className='otd-text'>
                    <h2>Exercise of the Day</h2>
                    <p>Exercise Name</p>
                </div>
            </div>
            <div className='trophy-div'>
                <div className='trophy-image'>
                    <img src={trophy} alt={"Trophy"}/>
                </div>
                <div className='trophy-text'>
                    <p>You Have Logged</p>
                    <p>40 minutes</p>
                    <p>for Child's Name</p>
                    <p>Keep up the good work!</p>
                </div>
            </div>
            <div className='exercise-log-exercise'>
                <button onClick={() => {
                    navigate(API.isLoggedIn() ? '/exercise-log' : '/login');
                }} className='red-button'>Log Exercise
                </button>
            </div>
            <div className='exercise-content'>
                <div className='select-link'>
                    <select onChange={onCategoryChange}>
                        <option value="" >All</option>
                        {categoryLayout(exerciseCategory)}
                    </select>
                    <button onClick={() => {
                        navigate(API.isLoggedIn() ? '/all-logs' : '/login');
                    }} className='red-button'>View All Logs
                    </button>
                </div>
                <div className='exercise-grid'>
                    {exerciseLayout(exercises, selectedCategory)}
                </div>
                {selectedExercise &&
                <div className='dialog-box'>
                    <div className='background-color'>
                        <Weather/>
                        <div className='exit-button'>
                            <img src={exit} alt='Exit' onClick={e => (setSelectedExercise(null))}/>
                        </div>
                        <div className='desktop-dialog'>
                            <div className='episode-player'>
                                <div className='video-player'>
                                    <iframe
                                        src={selectedExercise.video_link}
                                        frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                            <div className='exercise-text'>
                                <p className='dbox-name'>{selectedExercise.name}</p>
                                <p className='dbox-category'>{selectedExercise.exerciseCategory?.name}</p>
                            </div>
                        </div>
                        <div>
                            {/*TODO Add picture of henry here*/}
                        </div>
                        <Grass/>
                    </div>
                    <div className='background'/>
                </div>
                }
                {!noMoreExercises &&
                    <div className='see-more'>
                        <button className='red-button' onClick={getMoreExercises}>See More</button>
                    </div>
                }
            </div>
            <Grass/>
        </div>
    )
}

// @ts-ignore
export default ExercisePage
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { getDishes } from "../utils/getData";
import { setData, deleteData } from "../store/slices/dishes";

import AveragesCard from "../components/AveragesCard";
import ResposiveCard from "../components/ResponsiveCard";

// El Home de la aplicación mostrará los platos del menú en un listado. Cada ítem (el cuál debe ser un
//   componente separado) del listado contendrá:
//   ● Nombre del plato.
//   ● Imagen.
//   ● Características del plato.
//   ● Acciones para ver el detalle o eliminarlo del menú.

// En la pantalla de Home se deberá mostrar, además de los platos que conforman el menú:
// ● Acumulativo de precio del menú.
// ● Promedio de tiempo de preparación entre todos los platos.
// ● Promedio de Healt Score entre todos los platos.
// ● El menú debe tener 4 platos. Debe haber 2 veganos y 2 que no lo sean. Esto debe
// validarse al intentar agregar un nuevo plato.
// ● Se deberá poder eliminar un plato del menú, lo que generará nuevamente los promedios
// y acumulativos (los mismos deben estar almacenados en el estado del componente
// utilizando Hooks)

const Home = () => {
  const [loading, setLoading] = useState(false)
  const dishes = []
  const { data } = useSelector(state => state.dishes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let accPrice = 0
  let averagePreparationTime = 0
  let averageHealthScore = 0

  const deleteDish = id => {
    dispatch(deleteData(id))
  }

  const moreDetails = () => navigate('/dish-detail')
  const showDishDetails = dish => { }

  // Se ejecuta por única vez en la primer carga de la página
  useEffect( () => {
    if (data.length == 0) {
    setLoading(true)
    const DIETS = { vegan: 'vegan' }
    const numberOfDishes = 2
    const addRecipeNutrition = true
    const includeIngredients = ['meat']

    Promise.all([
      getDishes({ diet: DIETS.vegan, numberOfDishes, addRecipeNutrition }),
      getDishes({ numberOfDishes, addRecipeNutrition, includeIngredients })
    ]).then(res => {
      res.map(el => dishes.push(...el.data.results))
      dispatch(setData(dishes))
      setLoading(false)
    }).catch(error => {
      new Error(error)
    })
  }},[])

  if (data.length >= 1) {
    let accPreparationTime = 0
    let accHealthScore = 0

    data.map(dish => {
      accPrice = accPrice + dish.pricePerServing
      accPreparationTime = accPreparationTime + dish.readyInMinutes
      accHealthScore = accHealthScore + dish.healthScore
    })

    accPrice = accPrice.toFixed(2)
    averagePreparationTime = parseInt(accPreparationTime / data.length)
    averageHealthScore = (accHealthScore / data.length).toFixed(1)
  }

  const averagesAndAcc = [
    { title: 'Average Preparation Time', value: `${averagePreparationTime} minutes` },
    { title: 'Average Health Score', value: `${averageHealthScore}` },
    { title: 'Total Price', value: `$ ${accPrice}` }
  ]

  return (
    <Container>
      <div className="row">
        <p className="text-center text-muted">
        The menu has a maximum of 4 dishes / Two vegan and two non-vegan dishes / Vegan plates are distinguished by a green border
        </p>
        <div className="col-xl-9 mb-4">
          {loading &&
            <div className="alert alert-primary text-center" role="alert">
              Loading...
            </div>
          }
          <div className="row g-4">
            {data.length > 0 &&
              data.map(dish =>
                <div className="col-sm-6 col-lg-12" key={dish.id}>
                  <ResposiveCard 
                    dish={dish}
                    deleteDish={deleteDish}
                    clickCard={showDishDetails}
                  />
                </div>
              )
            }
            {data.length < 4 && !loading &&
              <Card body
                className="align-self-center text-muted text-center my-4 col-sm-6 col-lg-12"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/dishes-finder')}>add Dish
              </Card>
            }
          </div>
        </div>
        <div className="col-xl-3">
          <div className="row g-4">
            {averagesAndAcc.map((el, index) =>
              <AveragesCard key={index} {...el} moreDetails={moreDetails} ></AveragesCard>)
            }
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home

  // --------------- Example dish ---------------
  // aggregateLikes: 1669
  // analyzedInstructions: Array []
  // cheap: false
  // creditsText: "Jen West"
  // cuisines: Array [ "American" ]
  // dairyFree: true
  // diets: Array(3) [ "dairy free", "lacto ovo vegetarian", "vegan" ]
  // dishTypes: Array(4) [ "lunch", "main course", "main dish", … ]
  // gaps: "no"
  // glutenFree: false
  // healthScore: 78
  // id: 715594
  // image: "https://spoonacular.com/recipeImages/715594-312x231.jpg"
  // imageType: "jpg"
  // lowFodmap: false
  // nutrition: Object { nutrients: (28) […], properties: (2) […], flavonoids: (26) […], … }
  // occasions: Array []
  // pricePerServing: 83.23
  // readyInMinutes: 45
  // servings: 2
  // sourceName: "Pink When"
  // sourceUrl: "http://www.pinkwhen.com/homemade-french-fries/"
  // spoonacularScore: 99
  // spoonacularSourceUrl: "https://spoonacular.com/homemade-garlic-and-basil-french-fries-715594"
  // summary: "The recipe Homemade Garlic and Basil French Fries is ready <b>in roughly 45 minutes</b> and is definitely a super <b>vegan</b> option for lovers of American food. One serving contains <b>596 calories</b>, <b>18g of protein</b>, and <b>15g of fat</b>. For <b>83 cents per serving</b>, you get a side dish that serves 2. Several people made this recipe, and 1669 would say it hit the spot. If you have garlic salt, flour, garlic powder, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a spoonacular score of 100%</b>. This score is outstanding. Try <a href=\"https://spoonacular.com/recipes/homemade-french-fries-with-fresh-garlic-and-dill-494220\">Homemade French Fries with Fresh Garlic and Dill</a>, <a href=\"https://spoonacular.com/recipes/roasted-garlic-french-fries-519898\">Roasted Garlic French Fries</a>, and <a href=\"https://spoonacular.com/recipes/sweet-potato-fries-with-basil-salt-and-garlic-mayonnaise-120735\">Sweet Potato Fries With Basil Salt and Garlic Mayonnaise</a> for similar recipes."
  // sustainable: false
  // title: "Homemade Garlic and Basil French Fries"
  // vegan: true
  // vegetarian: true
  // veryHealthy: true
  // veryPopular: true
  // weightWatcherSmartPoints: 19
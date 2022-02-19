import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { getDishes } from "../utils/getData";
import { setData, updateData } from "../store/slices/dishes";

import Dish from '../components/Dish'
import AveragesCard from "../components/AveragesCard";

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
  const [firstLoad, setFirstLoad] = useState(true)
  const dishes = []
  const { data } = useSelector(state => state.dishes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let accPrice = 0
  let averagePreparationTime = 0
  let averageHealthScore = 0

  const deleteDish = id => {
    dispatch(updateData(id))
  }

  if (data.length == 0 && firstLoad) {
    const DIETS = { vegan: 'vegan' }
    const numberOfDishes = 2
    const addRecipeNutrition = true
    const includeIngredients = 'meat'

    Promise.all([
      getDishes({ diet: DIETS.vegan, numberOfDishes, addRecipeNutrition }),
      getDishes({ numberOfDishes, addRecipeNutrition, includeIngredients })
    ]).then(res => {
      res.map(el => dishes.push(...el.data.results))
      dispatch(setData(dishes))
    }).catch(error => {
      new Error(error)
    })

    setFirstLoad(false)
  }

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

  const moreDetails = () => navigate('/dish-detail')

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

  return (
    <Container>
      <div className="row">
        <div className="col-md-9">
          {data.length > 0 &&
            data.map(dish =>
              <Dish key={dish.id} {...dish} deleteDish={deleteDish} />
            )
          }
          {data.length < 4 &&
            <Card body
              className="text-muted text-center my-md-3 my-lg-4"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/dishes-finder')}>add Dish
            </Card>
          }
        </div>
        <div className="col-md-3">
          {averagesAndAcc.map((el, index) =>
            <AveragesCard key={index} {...el} moreDetails={moreDetails}></AveragesCard>)
          }
        </div>
      </div>
    </Container>
  )
}

export default Home
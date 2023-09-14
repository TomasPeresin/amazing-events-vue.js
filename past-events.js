let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

// Realizamos con un modo distinto a los anteriores

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    let datos = data;

    const $datosPastEvents = pastEvents(datos);

    // agarramos las categorias posibles
    const $arregloCategorias = categoriasDisponibles($datosPastEvents);

    // inyectamos en el html segun corresponda
    imprimirEnHTML($datosPastEvents, $cards, crearCards);
    imprimirEnHTML($arregloCategorias, $categories, crearCategories);

    // filtrar cartas segun los checks activos
    $botonSubmit.addEventListener("click", (event) => {
      event.preventDefault();
      let cartasFiltradas = filtrarPorTexto($datosPastEvents);
      hayCartas(cartasFiltradas);
    });

    // filtrar cartas segun los checks activos
    $categories.addEventListener("change", (e) => {
      filtrarCategorias($datosPastEvents);
    });
  })
  .catch((error) => console.log(error));


function pastEvents(objeto) {
  let pastEventsArray = [];
  for (let event of objeto.events) {
    if (event.date <= objeto.currentDate) {
      pastEventsArray.push(event);
    }
  }
  return pastEventsArray;
}



  
// async function recuperarData(){
//     try{
//         const response = await fetch(urlApi);
//         const datos = await response.json();

//         function pastEvents(objeto){
//             let pastEventsArray = [];
//             for (let event of objeto.events){
//                 if (event.date <= objeto.currentDate){
//                     pastEventsArray.push(event);
//                 }
//             }
//             return pastEventsArray;
//         }

//         const $datosPastEvents = pastEvents(datos);

//         // agarramos las categorias posibles
//         const $arregloCategorias = categoriasDisponibles($datosPastEvents);

//         // inyectamos en el html segun corresponda
//         imprimirEnHTML($datosPastEvents, $cards, crearCards);
//         imprimirEnHTML($arregloCategorias, $categories, crearCategories);

//         // filtrar cartas segun los checks activos
//         $botonSubmit.addEventListener("click", (event) =>{
//             event.preventDefault();
//             let cartasFiltradas = filtrarPorTexto($datosPastEvents);
//             hayCartas(cartasFiltradas);
//         });

//         // filtrar cartas segun los checks activos
//         $categories.addEventListener("change", (e) =>{filtrarCategorias($datosPastEvents)});
//     }
//     catch(error){
//         console.log(error);
//     }
// }

// recuperarData();

// // Recorro cada elemento del array para luego
// // comparar la fecha de este elemento con la
// // fecha actual. Si la fecha del elemento es
// // menor o igual, lo metemos en los eventos
// // pasados para luego devolverlo.
// function pastEvents(objeto){
//     let pastEventsArray = [];
//     for (let event of objeto.events){
//         if (event.date <= objeto.currentDate){
//             pastEventsArray.push(event);
//         }
//     }
//     return pastEventsArray;
// }

// const $cartasPastEvents = pastEvents();

// // agarramos las categorias posibles
// const $arregloCategorias = categoriasDisponibles($cartasPastEvents)

// // inyectamos en el html segun corresponda
// imprimirEnHTML($cartasPastEvents, $cards, crearCards);
// imprimirEnHTML($arregloCategorias, $categories, crearCategories);

// // filtrar cartas segun los checks activos
// $botonSubmit.addEventListener("click", (event) =>{
//     event.preventDefault();
//     let cartasFiltradas = filtrarPorTexto($cartasPastEvents);
//     hayCartas(cartasFiltradas);
// });

// // filtrar cartas segun los checks activos
// $categories.addEventListener("change", (e) =>{filtrarCategorias($cartasPastEvents)});

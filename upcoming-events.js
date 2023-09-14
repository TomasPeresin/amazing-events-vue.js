let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function recuperarData(){
    try{
        const response = await fetch(urlApi);
        const datos = await response.json();
        
        const $cartasUpcomingEvents = upcomingEvents(datos);

        // agarramos las categorias posibles
        const $arregloCategorias = categoriasDisponibles($cartasUpcomingEvents);

        // inyectamos en el html segun corresponda
        imprimirEnHTML($cartasUpcomingEvents, $cards, crearCards);
        imprimirEnHTML($arregloCategorias, $categories, crearCategories);

        // filtrar cartas segun los checks activos
        $botonSubmit.addEventListener("click", (event) =>{
            event.preventDefault();
            let cartasFiltradas = filtrarPorTexto($cartasUpcomingEvents);
            hayCartas(cartasFiltradas);
        });

        // filtrar cartas segun los checks activos
        $categories.addEventListener("change", (e) =>{filtrarCategorias($cartasUpcomingEvents)});
    }
    catch(error){
        console.log(error);
    }
}

recuperarData();

// Recorro cada elemento del array para luego
// comparar la fecha de este elemento con la
// fecha actual. Si la fecha del elemento es
// mayor, lo metemos en los eventos por venir
// para luego devolverlo.
function upcomingEvents(objeto){
    let upcomingEventsArray = [];
    for (let event of objeto.events){
        if (event.date > objeto.currentDate){
            upcomingEventsArray.push(event);
        }
    }
    return upcomingEventsArray;
}



// // Recorro cada elemento del array para luego
// // comparar la fecha de este elemento con la
// // fecha actual. Si la fecha del elemento es
// // mayor, lo metemos en los eventos por venir
// // para luego devolverlo.
// function upcomingEvents(){
//     let upcomingEventsArray = [];
//     for (let event of data.events){
//         if (event.date > data.currentDate){
//             upcomingEventsArray.push(event);
//         }
//     }
//     return upcomingEventsArray;
// }

// const $cartasUpcomingEvents = upcomingEvents();

// // agarramos las categorias posibles
// const $arregloCategorias = categoriasDisponibles($cartasUpcomingEvents)

// // inyectamos en el html segun corresponda
// imprimirEnHTML($cartasUpcomingEvents, $cards, crearCards);
// imprimirEnHTML($arregloCategorias, $categories, crearCategories);

// // filtrar cartas segun los checks activos
// $botonSubmit.addEventListener("click", (event) =>{
//     event.preventDefault();
//     let cartasFiltradas = filtrarPorTexto($cartasUpcomingEvents);
//     hayCartas(cartasFiltradas);
// });

// // filtrar cartas segun los checks activos
// $categories.addEventListener("change", (e) =>{filtrarCategorias($cartasUpcomingEvents)});
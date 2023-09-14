let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function recuperarData(){
    try{
        const response = await fetch(urlApi);
        const datos = await response.json();
        
        // agarramos las categorias posibles
        const $arregloCategorias = categoriasDisponibles(datos.events);

        // inyectamos en el html segun corresponda
        imprimirEnHTML(datos.events, $cards, crearCards);
        imprimirEnHTML($arregloCategorias, $categories, crearCategories);

        // filtrar cartas segun los checks activos
        $botonSubmit.addEventListener("click", (event) =>{
            event.preventDefault();
            let cartasFiltradas = filtrarPorTexto(datos.events);
            hayCartas(cartasFiltradas);
        });

        // filtrar cartas segun los checks activos
        $categories.addEventListener("change", (e) =>{filtrarCategorias(datos.events)});
    }
    catch(error){
        console.log(error);
    }
}

recuperarData();
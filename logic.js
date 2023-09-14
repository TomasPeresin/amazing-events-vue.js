// Agarramos el contenedor donde van a ir las cartas
const $cards = document.getElementById("cards");

// Agarramos el contenedor donde van las categorias
const $categories = document.getElementById("categories");

// Agarramos el boton y el input del buscador
const $botonSubmit = document.querySelector('button[type="submit"]');
const $barraSearch = document.querySelector('input[type="search"]');

// funcion para insertar el cuerpo de las cartas 
function crearCards(card){
    let template ="";
    template = `
        <div class="card mb-4 rounded" style="width: 18rem">
            <img src=${card.image} class="card-img-top" alt="${card.image}" style="height: 190px;"/>
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text" style="height: 72px">
                    ${card.description}
                </p>
                <div class="d-flex justify-content-between align-content-end flex-wrap">
                    <p>Price: $${card.price}</p>
                    <a href="details.html?id=${card._id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
        `;
    return template
}

// funcion para insertar las categorias
function crearCategories(string){
    let template = "";
    template = `
        <div>
            <input type="checkbox" name="${string}" value="${string}" id ="${string}"/>
            <label for="${string}">${string}</label>
        </div>
    `;
    return template;
}

// funcion para insertar parrafos
function crearParrafo(string){
    let template = "";
    template = `
            <p>${string}</p>
        `;
    return template;
} 

function categoriasDisponibles(arreglo){
    return [...new Set(arreglo.map(objeto => objeto.category))]
}

// funcion reutilizable que agarra (un elemento iterable; donde se introduce; la funcion que inserta el texto)
function imprimirEnHTML(arreglo, elementoHTML, funcionEstructura){
    let estructura = "";
    arreglo.forEach ( object => {
        estructura += funcionEstructura(object)
    });
    elementoHTML.innerHTML = estructura;
}

// resive un arreglo de los eventos disponibles para filtrarlos segun lo ingresado por usuario
function filtrarPorTexto(eventosDisponibles){
    let textoBuscado = $barraSearch.value;
    let cartasFiltradas = [];
        eventosDisponibles.forEach( e =>{
            if (e.name.includes(textoBuscado)){
                cartasFiltradas.push(e);
            }
        })
    return cartasFiltradas;
}

// resive un arreglo de los eventos disponibles para filtrarlos segun lo ingresado por usuario
function filtrarPorTexto(eventosDisponibles){
    let textoBuscado = $barraSearch.value;
    return (eventosDisponibles.filter( e =>(e.name.includes(textoBuscado)))
    );
}

function filtrarCategorias(eventosDisponibles){
    let nodeList = document.querySelectorAll("input[type='checkbox']:checked");
    let arregloValores = Array.from(nodeList).map(check=>check.value)
    // verificamos que este marcada alguna categoria (al poner y sacar no mostraba cartas)
    if (arregloValores.length > 0){
        cartas = filtrarPorTexto(eventosDisponibles);
        let cartasFiltradas = cartas.filter(objeto => arregloValores.includes(objeto.category));
        hayCartas(cartasFiltradas);
    }
    else {
        cartas = filtrarPorTexto(eventosDisponibles);
        imprimirEnHTML(cartas, $cards, crearCards);
    }    
}

// verificamos que existan cartas con los filtros dados
function hayCartas(objetos){
    if (objetos.length > 0){
        imprimirEnHTML(objetos, $cards, crearCards);
    }
    else{
        let mensajeInformativo = ["Ups! ninguna carta concuerda con los filtros pedidos. ¿Probamos con otros?"];
        imprimirEnHTML(mensajeInformativo, $cards, crearParrafo);
    }
}
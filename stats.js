const $eventsStatics = document.getElementById('eventsStatics');
const $pastEventsTable = document.getElementById('PastEventsStatics');
const $upcomingEventsTable = document.getElementById('upcomingStatics');

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlApi).then( (response) => response.json())
.then( (data) => {
    datos = data;

    // Agregamos los porcentajes al objeto data.events por cada evento
    datos.events.forEach( (event) => {
        event.percent = AgregarPorcentaje(event);
    })

    // Ordenamos segun el porcentaje de asistencia (menor a mayor)
    datos.events.sort((a, b) => a.percent - b.percent)

    // Imprimimos los datos de la primer tabla
    EventsStatics(datos);

    // Filtramos segun los eventos que ya sucedieron y los que vienen
    let pastEvents = pastEventsFilter(datos);
    let upcomingEvents = upcomingEventsFilter(datos);

    // Imprimimos las dos tablas que faltan
    PastStatics(pastEvents);
    UpcomingStatics(upcomingEvents);
}) 
.catch( (error) => console.log(error));

function UpcomingStatics(events){
    // Agarramos un array que contiene objetos con las categorias y los datos necesarios (category, revenue, assistance)
    let eventosFiltrados = FiltradoPorCategoria(events);
    // Lo ordenamos de mayor a menor asistencia
    eventosFiltrados.sort((a, b) => b.asistencia - a.asistencia)
    // Lo imprimimos en su tabla correspondiente
    eventosFiltrados.forEach( fila => StatisticsImprimir(fila, $upcomingEventsTable));
}

function PastStatics(events){
    let eventosFiltrados = FiltradoPorCategoria(events);
    eventosFiltrados.sort((a, b) => b.asistencia - a.asistencia)
    eventosFiltrados.forEach( fila => StatisticsImprimir(fila, $pastEventsTable));
}

function FiltradoPorCategoria(events){
    // Agarro las categorias posibles de los eventos que tengo disponibles
    let cateDisponibles = categoriasDisponibles(events);
    let categoriasObjeto = [];
    // Por cada categoria obtenemos un objeto con los datos que necesitamos (category, revenue, assistance)
    // y lo metemos en el array
    cateDisponibles.forEach( 
        categoria => categoriasObjeto.push(creacionObjetoCategoria(events, categoria))
        );
    return categoriasObjeto;
}

// recibo eventos a filtrar y una categoria
function creacionObjetoCategoria(events, categ){
    // Agarro los eventos que tengan la categoria solicitada
    eventosFiltrados = events.filter( (event) => categ.includes(event.category));
    // Obtenemos las ganancias de los eventos obtenidos
    let revenue = Revenues(eventosFiltrados);
    // Obtenemos el porcentaje de asistencia de los eventos obtenidos
    let asistencia = Assistance(eventosFiltrados);

    // Devolvemos un objeto que contiene la categoria, las ganancias y el porcentaje de asistencia
    return {categoria : categ, revenue: revenue, asistencia: asistencia};
}

function StatisticsImprimir(fila, elementoHTML){
    let estructura = "";

    estructura += `
    <tr>
        <td>${fila.categoria}</td>
        <td>${fila.revenue}</td>
        <td>${fila.asistencia}%</td>
    </tr>
    `;
    elementoHTML.innerHTML += estructura;
}

function Revenues(eventos){
    let ganancias = 0;
    // Filtramos según sean past o upcoming envents
    if (Object.keys(eventos[0]).includes("estimate")){
        eventos.forEach( evento => ganancias += evento.price * evento.estimate);
    }
    else{
        eventos.forEach( evento => ganancias += evento.price * evento.assistance);
    }

    // Le damos formato a lo recaudado
    let formato = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(ganancias);
    return formato;
}

function Assistance(eventos){
    let asistencia = 0;
    eventos.forEach( evento => asistencia += evento.percent);
    asistencia = asistencia/eventos.length;

    // Redondemaos el porcentaje en 2 decimales
    let formato = asistencia.toFixed(2);
    return formato;
}

function categoriasDisponibles(arreglo){
    return [...new Set(arreglo.map(objeto => objeto.category))]
}

function pastEventsFilter(objeto) {
    let pastEventsArray = [];
    for (let event of objeto.events) {
      if (event.date <= objeto.currentDate) {
        pastEventsArray.push(event);
      }
    }
    return pastEventsArray;
}

function upcomingEventsFilter(objeto){
    let upcomingEventsArray = [];
    for (let event of objeto.events){
        if (event.date > objeto.currentDate){
            upcomingEventsArray.push(event);
        }
    }
    return upcomingEventsArray;
}

// Agregar porcentaje a los objetos dados
function AgregarPorcentaje(evento) {
    // Primero reviso si es un past event o un upcoming event segun tenga asistencia o un estimado
    if (Object.keys(evento).includes("assistance")){
        return evento.assistance*100/evento.capacity;
    }
    else{
        return evento.estimate*100/evento.capacity;
    }
}

function EventsStatics(datos){
    let pastEvents = pastEventsFilter(datos);
    imprimirEventsStatics(datos.events, pastEvents, $eventsStatics);
}

function imprimirEventsStatics(datos, pastEvents, elementoHTML){
    let estructura = "";
    // agarramos el de mas asistencia y el de menos
    let mayor = pastEvents.at(-1);
    let menor = pastEvents.at(0);
    // Ordenamos segun la capacidad 
    datos.sort((a, b) => b.capacity - a.capacity)
    // Asignamos el de mayor capacidad
    let eventoCapacidadMayor = datos.at(0);
    let formato = new Intl.NumberFormat("en-US");
    let valor = eventoCapacidadMayor.capacity
    let capacidadMayor = formato.format(valor);
    // asignamos y agregamos a estructura
    estructura += `<td>${mayor.name} ${mayor.percent.toFixed(2)}%</td>`;
    estructura += `<td>${menor.name} ${menor.percent}%</td>`;
    estructura += `<td>${eventoCapacidadMayor.name} ${capacidadMayor}</td>`;

    elementoHTML.innerHTML += estructura;
}
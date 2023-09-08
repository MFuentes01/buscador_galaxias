const input = document.getElementById("inputBuscar");
const btn = document.getElementById("btnBuscar");
const container = document.getElementById("contenedor");

btn.addEventListener("click", function () {

    //Limpia contenido del contenedor
    container.innerHTML = "";

    //Toma valor de la barra de busqueda
    let searchValue = input.value;

    //Se declara la url del json con la variable searchValue para tomar el dato de busqueda
    const DATA_URL = `https://images-api.nasa.gov/search?q=${searchValue}`

    console.log(searchValue);

    //El fetch toma los datos de la url
    fetch(DATA_URL)
    .then (response => response.json())
    .then (data => {

        //Si existe un item
        if (data.collection.items.length > 0) {
            //Recorre los resultados y crea elementos HTML para cada imagen
            data.collection.items.forEach((item) => {
              const imagenUrl = item.links[0].href;
              const titulo = item.data[0].title;
              const descripcion = item.data[0].description;
              const fecha = item.data[0].date_created;

              //Crea un elemento HTML para mostrar la imagen y su informacion
              const elemento = document.createElement("div");
              elemento.innerHTML = `
                <div class="card mb-3">
                  <img src="${imagenUrl}" class="card-img-top" alt="${titulo}">
                  <div class="card-body">
                    <h5 class="card-title">${titulo}</h5>
                    <p class="card-text">${descripcion}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${fecha}</small></p>
                  </div>
                </div>
                    `


            //Agrega al contenedor los divs con la informacion de cada elemento
            container.appendChild(elemento);
            })}


    })
    .catch(error => {
        console.error("Hubo un error", error);
    });






})
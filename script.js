
//Declaración variables

const contenedorLetras = document.getElementById("contenedor-letras");
const contenedorOpcionesJugador = document.getElementById("opciones-jugador");
const sectionInputJugador = document.getElementById("section-input-jugador");
const contendorJuegoNuevo = document.getElementById("contenedor-juego-nuevo");
const buttonJuegoNuevo = document.getElementById("button-juego-nuevo");
const imagenesAhorcado = document.getElementById("imagenes-ahorcado");
const resultadoTexto = document.getElementById("resultado-texto");
const contenedorPuntuaciones = document.getElementById("puntuaciones-jugadores")
const inputUsuario = document.getElementById("usuario");
let mejoresPuntuaciones = [];
let nombreUsuario = "-";
let puntuacionFinal = 0;
//array de palabras

let palabrasAhorcado = {
  frutas: ["banana", "sandía", "cereza", "higo", "mandarina", "manzana"],
  animales: ["gato", "perro", "caballo", "elefante", "guacamaya", "ardilla"],
  paises: ["Venezuela", "España", "Francia", "Panama", "Noruega", "Argentina"],
  ciudades: ["Caracas", "Madrid", "Barcelona", "Coruña", "Valencia", "Lugo"],
};

// contador

let winCount = 0;
let count = 0;
let palabraElegida = 0;

// display botones de opciones

const mostrarOpciones = () => {
  contenedorOpcionesJugador.innerHTML += `<h3> Selecciona una opcion para jugar</h3>`;
  let buttonPalabrasAhorcado = document.createElement("div");
  for (let value in palabrasAhorcado) {
    buttonPalabrasAhorcado.innerHTML += `<button class="opciones" onclick="generarPalabra('${value}')">${value}</button>`;
  }
  contenedorOpcionesJugador.appendChild(buttonPalabrasAhorcado);
};

//Bloquear todos los botones
const bloquear = () => {
  let opcionesButtons = document.querySelectorAll(".opciones");
  let letrasButtons = document.querySelectorAll(".letras");
  //Desabilitar todas las opciones
  opcionesButtons.forEach((button) => {
    button.disabled = true;
  });

  //Deshabilitar letras
  letrasButtons.forEach((button) => {
    button.disabled = true;
  });
  contendorJuegoNuevo.classList.remove("hide");
};

//funcion inicial para cuando la pagina carga o el usuario presione ara juego nuevo
const iniciar = () => {
  winCount = 0;
  count = 0;
  if(nombreUsuario.length >1){cambiarNombre()}
  else{nombre()}
  

  //Mostramos mejores puntuaciones
if (mejoresPuntuaciones.length > 0){
  contenedorPuntuaciones.innerHTML = "<tr><th>NOMBRE</th><th>PUNTUACION</th></tr>";
  for ( let i in mejoresPuntuaciones){
    contenedorPuntuaciones.innerHTML += 
    '<tr>'+
    '<td>'+mejoresPuntuaciones[i]['name']+'</td>'+
    '<td>'+mejoresPuntuaciones[i]['puntuacion']+'</td>'+
    '</tr>';
  }
}


  //Ocultamos todas las letras y el boton de juego nuevo
  sectionInputJugador.innerHTML = "";
  contenedorOpcionesJugador.innerHTML = "";
  contenedorLetras.classList.add("hide");
  contendorJuegoNuevo.classList.add("hide");
  contenedorLetras.innerHTML = "";
  imagenesAhorcado.innerHTML = ""
  let a = true;
// abecedario dentro del contenedor
for (let i = 65; i <92; i++) {
  let button = document.createElement("button");
  button.classList.add("letras");
  /// usa los números del 65 al 97 de acuerdo al la numeración en la lista ASCII (A-Z)
  if ((i>64 && i<91) || i === 209){
    if(i===79 && a){
      i=209;
      a=false;
    }
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let letrasArray = palabraElegida.split("");
      let dashes = document.getElementsByClassName("dashes");
      // Si el array de letras contiene la letra clicada se reemplaza el dash por la letra correspondiente( y si no se dibuja una parte del ahorcado)
      if (letrasArray.includes(button.innerText)){
        letrasArray.forEach((char, index) => {
          //Si la letra clicada está en el array
          if (char === button.innerText){
            //Reemplazo dash por letra e incrementamos contador
            dashes[index].innerText = char;
            winCount += 1;
            // si el wincount es igual a la longitud de la palabra ganas
            if (winCount === letrasArray.length) {
              puntuacionFinal = (10-count)*palabraElegida.length
              mejoresPuntuaciones.push({name: nombreUsuario, puntuacion: puntuacionFinal})
              suprimirPuntuaciones(mejoresPuntuaciones);
              console.log(mejoresPuntuaciones)
              resultadoTexto.innerHTML = `<h2 class='mensaje-ganador'>¡HAS GANADO! Puntuacion de: ${puntuacionFinal}</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
              //Bloquear todos los botones
              bloquear();
            }
          }
        });
    }
    else {
      //Contador de oportunidades (y aladir imagen del ahorcado)
      count += 1;
      switch(count){
        case 1:
          imagenesAhorcado.innerHTML = ""
          imagenesAhorcado.innerHTML +=  '<img src="Imagenes/Imagen1.png" alt="">'
          break;
        case 2:
          imagenesAhorcado.innerHTML = ""
          imagenesAhorcado.innerHTML +=  '<img src="Imagenes/Imagen2.png" alt="">'
          break;
        case 3:
          imagenesAhorcado.innerHTML = ""
          imagenesAhorcado.innerHTML +=  '<img src="Imagenes/Imagen3.png" alt="">'
          break;
        case 4:
          imagenesAhorcado.innerHTML = ""
          imagenesAhorcado.innerHTML +=  '<img src="Imagenes/Imagen4.png" alt="">'
          break;
        case 5:
          imagenesAhorcado.innerHTML = ""
          imagenesAhorcado.innerHTML +=  '<img src="Imagenes/Imagen5.png" alt="">'
          break;
        case 6:
          imagenesAhorcado.innerHTML = ""
          imagenesAhorcado.innerHTML +=  '<img src="Imagenes/Imagen6.png" alt="">'
          break;
      }
      //Si el contador es igual a 6, el jugador pierde
      if(count===7){
        puntuacionFinal = palabraElegida.length+winCount
        mejoresPuntuaciones.push({name: nombreUsuario, puntuacion: puntuacionFinal})
        suprimirPuntuaciones(mejoresPuntuaciones);
        console.log(mejoresPuntuaciones)
        resultadoTexto.innerHTML = `<h2 class='mensaje-perdedor'>¡HAS PERDIDO! Puntuacion de: ${puntuacionFinal}</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
        bloquear();
      }
    }
    //Desabilitar boton click
    button.disabled = true;
  });
  contenedorLetras.append(button);
  if(i===209){i=78}
}
}
mostrarOpciones();
};



//Generador de palabras

const generarPalabra = (palabrasAhorcadoValue) => {
  let buttonOpciones = document.querySelectorAll(".opciones");
  imagenesAhorcado.innerHTML += '<img src="Imagenes/imagen0.png" alt="">';
  //If optionValur matches the button innerText then highlight the button
  buttonOpciones.forEach((button) => {
    if (button.innerText.toLowerCase() === palabrasAhorcadoValue) {
      button.classList.add("activo");
    }
    button.disabled = true;
  });

  //Ocultar letras, y limpiar palabra anterior
  contenedorLetras.classList.remove("hide");
  sectionInputJugador.innerText = "";

  let opcionArray = palabrasAhorcado[palabrasAhorcadoValue];

  //Escoger Palabra Random
  palabraElegida = opcionArray[Math.floor(Math.random() * opcionArray.length)];
  palabraElegida = palabraElegida.toUpperCase();
  console.log(palabraElegida);

  //Reemplazar cada letra con un "_"
  let palabraOculta = palabraElegida.replace(
    /./g,
    '<span class="dashes">_</span>&nbsp;' //&nbsp; pone espacio para separar cada letra y _
  );

  //Muestra cada elemento como un span
  sectionInputJugador.innerHTML = palabraOculta;
};

//iniciar un juego nuevo
buttonJuegoNuevo.addEventListener("click", iniciar);
window.onload = iniciar;

//Sistema de puntuaciones
function suprimirPuntuaciones(array){
  array.sort((a, b) => b.puntuacion - a.puntuacion);
  if(array.length > 3){
    array.pop();
    return array
  }
}
function nombre(){
  inputUsuario.innerHTML = "<p>Introduzca su nombre:</p><input class='nombre' type='text' id='inputNombre'><button class='nombre' onclick='guardarNombre()'>GUARDAR</button> ";
}
function guardarNombre(){
  nombreUsuario = document.getElementById("inputNombre").value;
  inputUsuario.innerHTML = "<button class='nombre'onclick='nombre()'>CAMBIAR NOMBRE</button>"
}
function cambiarNombre(){
  inputUsuario.innerHTML = "<button class='nombre' onclick='nombre()'>CAMBIAR NOMBRE</button>"
  console.log(nombreUsuario)
}

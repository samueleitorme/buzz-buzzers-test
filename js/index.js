// Variable para almacenar el índice del controlador
let MandoBuzz = null;

// Elemento del DOM para mostrar el estado de la conexión
const estadoConexion = document.getElementById("estado-conexion");

window.addEventListener("gamepadconnected", (event) => {
  const gamepad = event.gamepad;
  MandoBuzz = gamepad.index;
  actualizarEstadoConexion(true);
  // const msgConectado = "✅ Buzz Conectado";
});

// Evento para cuando se desconecta un controlador
window.addEventListener("gamepaddisconnected", (event) => {
  MandoBuzz = null;
  actualizarEstadoConexion(false);
  // const msgDesconectado = "❌ Buzz Desconectado";
});

function actualizarEstadoConexion(connected) {
  if (connected) {
    estadoConexion.innerText = "✅ Buzz Conectado";
    estadoConexion.style.color = "#00d26a";
  } else {
    estadoConexion.innerText = "❌ Buzz Desconectado";
    estadoConexion.style.color = "#f92f60";
  }
}

// Función para manejar los botones del controlador
function handleButtons(buttons) {
  const selectedButtonClass = "selected-button";
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonElement = document.getElementById(`controller-b${i}`);

    if (buttonElement) {
      if (button.pressed) {
        // Cambiado a button.pressed para verificar si el botón está presionado
        buttonElement.classList.add(selectedButtonClass);
      } else {
        buttonElement.classList.remove(selectedButtonClass);
      }
    }
  }
}

// Función que se ejecuta en un ciclo para actualizar los botones del controlador
function gameLoop() {
  if (MandoBuzz !== null) {
    const gamepad = navigator.getGamepads()[MandoBuzz];
    if (gamepad) {
      handleButtons(gamepad.buttons);
    }
  }
  requestAnimationFrame(gameLoop);
}

// Iniciar el ciclo de juego
gameLoop();

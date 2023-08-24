// Variable para almacenar el índice del controlador
let controllerIndex = null;

// Elemento del DOM para mostrar el estado de la conexión
const connectionStatusText = document.getElementById("estado-conexion");

window.addEventListener("gamepadconnected", (event) => {
  const gamepad = event.gamepad;
  controllerIndex = gamepad.index;
  updateConnectionStatus(true);
  // const msgConectado = "✅ Buzz Conectado";
});

// Evento para cuando se desconecta un controlador
window.addEventListener("gamepaddisconnected", (event) => {
  controllerIndex = null;
  updateConnectionStatus(false);
  // const msgDesconectado = "❌ Buzz Desconectado";
});

function updateConnectionStatus(connected) {
  if (connected) {
    connectionStatusText.innerText = "✅ Buzz Conectado";
    connectionStatusText.style.color = "#00d26a";
  } else {
    connectionStatusText.innerText = "❌ Buzz Desconectado";
    connectionStatusText.style.color = "#f92f60";
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
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    if (gamepad) {
      handleButtons(gamepad.buttons);
    }
  }
  requestAnimationFrame(gameLoop);
}

// Evento para cuando se conecta un controlador

// Iniciar el ciclo de juego
gameLoop();

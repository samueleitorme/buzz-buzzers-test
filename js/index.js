let controllerIndex = null;
const conexinoDiv = document.getElementById('estado-conexion');

window.addEventListener("gamepadconnected", (event) => {
  const gamepad = event.gamepad;
  controllerIndex = gamepad.index;
  const msgConectado = "✅Buzz Conectado";
  console.log('%c%s', 'font-size: 20px; color: #00d26a; font-weight:bold', msgConectado);
});

window.addEventListener("gamepaddisconnected", (event) => {
  controllerIndex = null;
  const msgDesconectado = "❌Buzz Desconectado";
  console.log('%c%s', 'font-size: 20px; color: #f92f60; font-weight:bold', msgDesconectado);
});


function handleButtons(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonElement = document.getElementById(`controller-b${i}`);
    const selectedButtonClass = "selected-button";
    

    if (buttonElement) {
      if (button.value > 0) {
        buttonElement.classList.add(selectedButtonClass);
        console.log(buttonElement)
      } else {
        buttonElement.classList.remove(selectedButtonClass);
      }
    }
  }
}

function gameLoop() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    handleButtons(gamepad.buttons);
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();

(() => {
  // Create the modal
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #222;
    border-radius: 10px;
    padding: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: 80vh;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  `;

  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  closeButton.onclick = () => modal.remove();
  modal.appendChild(closeButton);

  const container = document.createElement("div");
  container.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: auto;
  `;
  modal.appendChild(container);

  document.body.appendChild(modal);

  const colors = [
    "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6",
    "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
    "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A",
    "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC",
    "#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC",
    "#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399",
    "#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680",
    "#4D8066", "#809980", "#E6FF80", "#1AFF33", "#999933",
    "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3",
    "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF",
  ];
  const SQUARES = 150 * 114;

  for (let i = 0; i < SQUARES; i++) {
    const square = document.createElement("div");
    square.style.cssText = `
      background-color: #1d1d1d;
      box-shadow: 0 0 2px #000;
      height: 16px;
      width: 16px;
      margin: 2px;
      transition: background 2s ease, box-shadow 2s ease;
    `;
    square.addEventListener("mouseover", () => setColor(square));
    square.addEventListener("mouseout", () => removeColor(square));
    container.appendChild(square);
  }

  function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }

  function removeColor(element) {
    element.style.background = "#1d1d1d";
    element.style.boxShadow = "0 0 2px #000";
  }

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
})();

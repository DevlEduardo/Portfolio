document.addEventListener("DOMContentLoaded", () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÃÕÂÊÎÔÛÇabcdefghijklmnopqrstuvwxyzáéíóúãõâêîôûç ";
  const elements = document.querySelectorAll(".decode-text");

  elements.forEach(el => {
    // Pega o HTML do elemento (com os <br>)
    const htmlLines = el.innerHTML.split(/<br\s*\/?>/i);

    // Limpa o conteúdo do elemento
    el.innerHTML = "";

    let lineIndex = 0;

    function animateLine() {
      if (lineIndex >= htmlLines.length) return;

      const finalText = htmlLines[lineIndex].trim();
      const currentText = Array(finalText.length).fill(" ");
      let frame = 0;
      const totalFramesPerChar = 3;
      const totalFrames = finalText.length * totalFramesPerChar;

      const span = document.createElement("span");
      el.appendChild(span);

      // Coloca <br> só se não for a última linha
      if (lineIndex < htmlLines.length - 1) {
        el.appendChild(document.createElement("br"));
      }

      function animate() {
        const progress = Math.floor(frame / totalFramesPerChar);

        for (let i = 0; i < finalText.length; i++) {
          if (i < progress) {
            currentText[i] = finalText[i];
          } else {
            currentText[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }

        span.textContent = currentText.join("");

        if (frame < totalFrames) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          span.textContent = finalText;
          lineIndex++;
          animateLine();
        }
      }

      animate();
    }

    animateLine();
  });
});

/* =============================================
   JaqueMáTICas — utils.js
   ============================================= */

/**
 * YouTube Façade: inyecta el iframe al hacer clic sobre la miniatura.
 * @param {HTMLElement} el  — el div.yt-facade clicado
 * @param {string}      id  — ID del vídeo de YouTube
 */
function ytPlay(el, id) {
  el.outerHTML =
    '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
    '?autoplay=1&rel=0" ' +
    'allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" ' +
    'allowfullscreen ' +
    'style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:8px;">' +
    '</iframe>';
}

/**
 * Mini Quiz: evalúa la respuesta seleccionada y actualiza la puntuación.
 * Marca con data-ok el botón correcto de cada pregunta.
 * @param {HTMLElement} btn     — botón pulsado
 * @param {boolean}     correct — si es la respuesta correcta
 */
function checkAnswer(btn, correct) {
  const opts = btn.closest('.quiz-opts');
  if (opts.dataset.answered) return;   // ya contestada
  opts.dataset.answered = '1';

  if (correct) {
    btn.classList.add('q-ok');
  } else {
    btn.classList.add('q-no');
    opts.querySelectorAll('[data-ok]').forEach(b => b.classList.add('q-ok'));
  }

  // Deshabilitar todos los botones de esta pregunta
  opts.querySelectorAll('button').forEach(b => { b.style.pointerEvents = 'none'; });

  // Comprobar si se han respondido todas las preguntas
  const quiz  = opts.closest('.mini-quiz');
  const total = quiz.querySelectorAll('.quiz-opts').length;
  const done  = quiz.querySelectorAll('.quiz-opts[data-answered]').length;

  if (done === total) {
    const ok = quiz.querySelectorAll('.quiz-opts[data-answered] .q-ok').length;
    const sc = quiz.querySelector('.quiz-score');
    if (ok === total) {
      sc.textContent = '🏆 ¡Perfecto! ' + ok + '/' + total + ' — ¡Eres un campeón/a!';
    } else if (ok >= Math.ceil(total / 2)) {
      sc.textContent = '⭐ ' + ok + '/' + total + ' — ¡Muy bien, sigue así!';
    } else {
      sc.textContent = '📚 ' + ok + '/' + total + ' — Repasa el tema y vuelve a intentarlo.';
    }
    sc.style.display = 'block';
  }
}

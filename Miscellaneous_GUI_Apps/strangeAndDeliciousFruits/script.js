document.addEventListener("DOMContentLoaded", function() {
  const figures = document.querySelectorAll("figure");
  const timers = new Map();

  function startTimer(e) {
    const figure = e.currentTarget;
    if (timers.has(figure)) return;

    const timer = setTimeout(() => {
      showCaption(figure);
      timers.delete(figure);
    }, 1000);

    timers.set(figure, timer);
  }

  function showCaption(figure) {
    const caption = figure.querySelector('figcaption');
    if (caption) {
      caption.classList.remove('caption-hidden');
      caption.classList.add('caption-visible');
    }
  }

  function hideCaption(e) {
    const figure = e.currentTarget;

    if (timers.has(figure)) {
      clearTimeout(timers.get(figure));
      timers.delete(figure);
    }

    const caption = figure.querySelector('figcaption');
    if (caption) {
      caption.classList.remove('caption-visible');
      caption.classList.add('caption-hidden');
    }
  }

  figures.forEach(fig => fig.addEventListener("mouseenter", startTimer));
  figures.forEach(fig => fig.addEventListener("mouseleave", hideCaption));
});
document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  let isRandom = false;
  const sections = document.querySelectorAll("section");
  let currentIndex = 0;
  const previousBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");
  const randomBtn = document.getElementById("random");

  const root = (() => {
    if ("scrollingElement" in document) return document.scrollingElement;
    const html = document.documentElement;
    const start = html.scrollTop;
    html.scrollTop = start + 1;
    const end = html.scrollTop;
    html.scrollTop = start;
    return end > start ? html : document.body;
  })();

  const ease = (duration, elapsed, start, end) =>
    Math.round(end * (-Math.pow(2, -10 * elapsed/duration) + 1) + start);

  const getCoordinates = id => {
    const start = root.scrollTop;
    const delta = (() => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      const max = root.scrollHeight - window.innerHeight;
      return start + top < max ? top : max - start;
    })();
    if (delta) return new Map([["start", start], ["delta", delta]]);
  };

  const scrollTo = (index) => {
    const coordinates = getCoordinates(`slide-${index}`);
    if (!coordinates) return;

    const tick = timestamp => {
      progress.set("elapsed", timestamp - start);
      root.scrollTop = ease(...progress.values(), ...coordinates.values());
      progress.get("elapsed") < progress.get("duration")
      ? requestAnimationFrame(tick)
      : complete(`#slide-${index}`, coordinates);
    };

    const progress = new Map([["duration", 800]]);
    const start = performance.now();
    requestAnimationFrame(tick);
  };

  const complete = (hash, coordinates) => {
    history.pushState(null, null, hash);
    root.scrollTop = coordinates.get("start") + coordinates.get("delta");
  };

  const findIndex = (currentSection, sections) => {
    let index = -1;
    sections.forEach((section, i) => {
      if (section === currentSection) {
        index = i;
      }
    })
    return index;
  }

  const randomize = (currentIndex) => {
    let index = Math.floor(Math.random() * sections.length);
    if (index !== currentIndex) {
      return  index
    } else if (currentIndex === sections.length - 1) {
      return index - 1;
    } else {
      return index + 1;
    }

  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      scrollTo(currentIndex);
    }
  }

  const goNext = () => {
    if (currentIndex < sections.length) {
      currentIndex += 1;
      scrollTo(currentIndex);
    }
  }

  // const attachHandler = (links, index) => {
  //   const link = links.item(index);
  previousBtn.addEventListener("click", event => {
    event.preventDefault();
    goPrevious();
  });
  nextBtn.addEventListener("click", event => {
    event.preventDefault();
    goNext();
  });
  randomBtn.addEventListener("click", event => {
    event.preventDefault();
    currentIndex = randomize();
    scrollTo(currentIndex);
  });



  let lastScroll = 0;
  const keys = {37: 2, 38: 2, 39: 1, 40: 1, 32:1};

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
    if (e.timeStamp - lastScroll > 80) {
      if (e.deltaY < 0 || keys[e.keyCode] === 2) {
        goPrevious();
      } else {
        goNext();
      }
    }
    lastScroll = e.timeStamp;
  }

  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  const viewWidth = Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
  console.log(viewWidth);
  if (viewWidth > 768) {
    disableScroll();
  }
});

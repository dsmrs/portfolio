import { scrollTo } from './scroll-to';


export function init() {
  const sections = document.querySelectorAll('.slides section');
  let currentSection = 0;
  document.addEventListener('keydown', (event) => {
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
      event.preventDefault();
    }
    if (event.key.match("Arrow")) {
      const html = document.documentElement;
      const height = Math.max(html.clientHeight, window.innerHeight || 0);
      if (event.key === "ArrowDown") {
        if (sections.length > currentSection) {
          currentSection += 1;
          scrollTo(height);
        }
      } else if (event.key === "ArrowUp") {
        if (currentSection > 0) {
          currentSection -= 1;
          scrollTo(-height);
        }
      }
      console.log(currentSection);
    }
  });
}

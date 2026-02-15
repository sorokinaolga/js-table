class Dom {
  constructor() {

  }
}

export function $() {
  return new Dom();
}

$.create = (tagName = 'div', classes = '') => {
  const el = document.createElement(tagName);
  if(classes) {
    el.classList.add(classes);
  }

  return el;
}
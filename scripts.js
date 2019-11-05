const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let textArea;
  let deleteButtons;

  function init(_form, _items) {
    items = _items;
    const itemsChildren = Array.from(items.childNodes);

    _form.addEventListener('submit', formHandler);
    document.addEventListener('keypress', commit);
    
    textArea = document.querySelector('.form__input');

    // TODO láta hluti í _items virka
    for (const item of itemsChildren) {
      if(item.nodeType === Node.TEXT_NODE) {
        continue;
      } else {
        item.querySelector('.item__button').addEventListener('click', deleteItem);
        item.querySelector('.item__checkbox').addEventListener('click', finish);
        item.querySelector('.item__text').addEventListener('click', edit);
      }
    }
  }

  function formHandler(e) {
    e.preventDefault();
    const data = textArea.value;
    add(data);

  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const { target } = e;
    const item = target.parentNode;
    if(item.classList.contains('item--done'))
    {
      item.classList.remove('item--done');
    } else {
      item.classList.add('item--done');
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    commit('Enter');
    const { target } = e;
    const item = target.parentNode;
    const textInputElement = el('input', 'item__edit');
    textInputElement.setAttribute('type', 'text');
    textInputElement.setAttribute('autofocus', 'autofocus');
    textInputElement.value = target.firstChild.nodeValue;
    item.replaceChild(textInputElement, target);
    textInputElement.focus();


  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(e.key === 'Enter' || e === 'Enter')
    {
      const insert = document.querySelector('.item__edit');

      if(insert === null) {

      } else {
        const spanElement = el('span', 'item__text', edit);
        spanElement.appendChild(document.createTextNode(insert.value));
        const item = insert.parentNode;
        item.replaceChild(spanElement, insert);
      }
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    if(value.trim().length == 0) {

    } else {
      const liElement = el('li', 'item');

      const inputElement = el('input', 'item__checkbox', finish);
      inputElement.setAttribute('type', 'checkbox');

      const spanElement = el('span', 'item__text', edit);
      spanElement.appendChild(document.createTextNode(value));

      const buttonElement = el('button', 'item__button', deleteItem);
      buttonElement.appendChild(document.createTextNode('Eyða'));

      liElement.appendChild(inputElement);
      liElement.appendChild(spanElement);
      liElement.appendChild(buttonElement);

      items.appendChild(liElement);
    }
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const { target } = e;
    target.parentNode.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.addEventListener('click', clickHandler);
    return element;
  }

  return {
    init: init
  }
})();

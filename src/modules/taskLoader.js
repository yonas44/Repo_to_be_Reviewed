/* eslint-disable no-use-before-define */
const { stringifier } = require('./stringifier.js');
const { check } = require('./taskMethods.js');

function TaskLoader(lists, tasksClass) {
  // Remove old childNodes before rendering new Nodes
  const tasks = tasksClass.store;

  while (lists.hasChildNodes()) {
    lists.removeChild(lists.firstChild);
  }

  // Map tasks inside the task container

  tasks.forEach((task, index) => {
    const list = document.createElement('li');
    const form = document.createElement('form');
    form.className = 'task-form';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.bool;
    tasks[index].index = index + 1;
    stringifier(tasks);

    // Add event listener for checkbox

    checkBox.addEventListener('change', () => {
      check(tasks, task, index, text);
      if (task.bool === true) {
        text.style.textDecoration = 'line-through';
      } else {
        text.style.textDecoration = 'none';
      }
      stringifier(tasks);
    });

    const text = document.createElement('input');
    text.className = 'task';
    text.value = task.string;
    if (task.bool === true) text.style.textDecoration = 'line-through';

    // Add event listener for each added form

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      text.blur();
      tasksClass.taskEditor(text, index);
      stringifier(tasks);
      dots.className = 'bi bi-three-dots-vertical';
      form.classList.remove('on');
      if (task.bool === true) text.style.textDecoration = 'line-through';
    });

    const dots = document.createElement('i');
    dots.className = 'bi bi-three-dots-vertical';
    dots.id = 'dots';

    // Add event listener for task input field

    text.addEventListener('click', () => {
      form.classList.add('on');
      dots.className = 'bi bi-trash3';
      dots.id = 'delete';
      text.style.textDecoration = 'none';
    });

    // Add event listener for remove button

    dots.addEventListener('click', (event) => {
      if (event.target.id === 'delete') {
        tasksClass.taskRemover(index);
        stringifier(tasks);
        TaskLoader(lists, tasksClass);
      }
    });

    // Add on blur event listener for input field

    text.addEventListener('blur', () => {
      form.classList.remove('on');
      form.childNodes[2].className = 'bi bi-three-dots-vertical';
      if (form.childNodes[0].checked === true) {
        form.childNodes[1].style.textDecoration = 'line-through';
      }
    });
    form.append(checkBox, text, dots);
    list.appendChild(form);
    lists.appendChild(list);
  });
}

module.exports = { TaskLoader };

(function() {
  const container = document.getElementById('todo-list-container');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function setup() {
    let text;
    if (todos.length > 0)
      text = todos.map((x, i) => `
        <div>
          <input value="${i}" ${x.ok && 'checked' || ''} type="checkbox" id="todo${i}" class="todo">
          <label for="todo${i}">${x.content}</label>
        </div>
      `).join('');
    else 
      text = `
        <h1 style="
          text-align: center;
        ">NOTHING TODO</h1>
      `;

    container.innerHTML = text;
    updateAllSelect();
  }

  const chkboxAllSelect = document.getElementById('chkbox-all-select');

  function updateAllSelect() {
    const isAllFinish = todos.reduce((pre, cur) => {
      return pre + +cur.ok;
    }, 0);
    chkboxAllSelect.disabled = todos.length === 0;
    chkboxAllSelect.checked = todos.length && todos.length === isAllFinish || false;

    updateCount();
  }

  chkboxAllSelect.addEventListener('click', e => {
    todos = todos.map(x => ({ ...x, ok: e.target.checked }));

    setup();
  });

  container.addEventListener('change', e => {
    const i = +e.target.value;
    todos[i].ok = e.target.checked;

    updateAllSelect();
  });

  window.addEventListener('blur', () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  function addTodo() {
      const input = document.getElementById('input-add-todo'),
      content = input.value.trim();
      if (!content) return ;

      input.value = '';
      
      todos = [{
        ok: false,
        content,
      }, ...todos];
      
      setup();
  }

  document
    .getElementById('btn-add-todo')
    .addEventListener('click', addTodo);

  function completeTodo() {
    todos = todos.filter(todo => !todo.ok);

    setup();
  }

  function updateCount() {
    const allCount = todos.length,
      finishedCount = todos.reduce((pre, cur) => {
        return pre + +cur.ok;
      }, 0);

    document
      .getElementById('count-todo')
      .innerHTML = `${finishedCount} /// ${allCount}`
  }

  document
    .getElementById('btn-complete-todo')
    .addEventListener('click', completeTodo);

  setup();
})();
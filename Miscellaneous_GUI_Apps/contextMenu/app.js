const App = {
  todoList: [
    { id: 1, task: 'Buy postcards of Bangkok', date: '01-08-2025', completed: false },
    { id: 2, task: 'Write and mail postcards to Payne kids', date: '01-08-2025', completed: false },
    { id: 3, task: 'Meditate with Shambhala Group', date: '01-08-2025', completed: false },
    { id: 4, task: 'Start work on Flow for iOS', date: '01-08-2025', completed: true},
    { id: 5, task: 'Find suitable tutorial for iOS Core Data', date: '01-09-2025', completed: false }
  ],

  init() {
    this.cacheElements();
    this.compileTemplates();
    this.bindEvents();
    this.renderTodos();
  },

  cacheElements() {
    this.todoContainer = document.getElementById('todo-container');
    this.todosTemplate = document.getElementById('todos_template').innerHTML;
    this.overlay = document.querySelector('.overlay');
    this.confirmDeleteTemplate = document.getElementById('confirm_template').innerHTML;
    this.confirmModal = document.getElementById('confirm_modal');
    this.contextMenuTemplate = document.getElementById('context_menu_template').innerHTML;
    this.contextMenuContainer = document.getElementById('context_menu');
  },

  compileTemplates() {
    this.template = Handlebars.compile(this.todosTemplate);
    this.confirmDelete = Handlebars.compile(this.confirmDeleteTemplate);
    this.contextMenu = Handlebars.compile(this.contextMenuTemplate);
  },

  bindEvents() {
    this.todoContainer.addEventListener('click', (e) => {
      e.preventDefault();
      const left = e.clientX;
      const top = e.clientY;
      const todoId = e.target.dataset.id;
      this.showContextMenu(todoId, {left: left, top: top});
    });
  },

  showContextMenu(todoId, coords) {
    const contextMenuHTML = this.contextMenu({ id: todoId });
    this.contextMenuContainer.innerHTML = contextMenuHTML;
    this.bindContextMenu(todoId);

    console.log(coords);
    this.contextMenuContainer.style.position = 'absolute';
    this.contextMenuContainer.style.left = `${coords.left}px`;
    this.contextMenuContainer.style.top = `${coords.top}px`;
    console.log(this.contextMenuContainer.style.left, this.contextMenuContainer.style.top);
    this.contextMenuContainer.style.display = 'block';

    this.overlay.style.display = 'block'
    this.overlay.addEventListener('click', () => this.hideContextMenu());
  },

  hideContextMenu() {
    this.contextMenuContainer.style.display = 'none';
    this.overlay.style.display = 'none';
  },

  bindContextMenu(id) {
    const deleteLink = document.querySelector('.remove');
    deleteLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideContextMenu();
      this.showConfirm(id);
    });
  },

  bindModalEvents(id) {
    this.confirm_yes = document.querySelector('a.confirm_yes');
    this.confirm_no = document.querySelector('a.confirm_no');

    this.confirm_yes.addEventListener('click', (e) => {
      e.preventDefault();
      this.deleteTodo(id);
      this.renderTodos();
    });

    this.confirm_no.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideConfirm();
    });

    this.overlay.addEventListener('click', () => this.hideConfirm());
  },

  renderTodos() {
    const compiledHTML = this.template({ todos: this.todoList });
    this.todoContainer.innerHTML = compiledHTML;
  },

  deleteTodo(todoId) {
    this.todoList = this.todoList.filter(todo => todo.id !== Number(todoId));
    this.hideConfirm();
  },

  showConfirm(todoId) {
    const confirmHTML = this.confirmDelete({ id: todoId});
    this.confirmModal.innerHTML = confirmHTML;
    this.confirmModal.style.display = 'block';
    this.overlay.style.display = 'block'
    this.bindModalEvents(todoId);
  },

  hideConfirm() {
    this.confirmModal.style.display = 'none';
    this.overlay.style.display = 'none';
    this.confirmModal.innerHTML = '';
  },
}

App.init();
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
    this.compileTemplate();
    this.renderTodos();
  },

  cacheElements() {
    this.todoContainer = document.getElementById('todo-container');
    this.todosTemplate = document.getElementById('todos_template').innerHTML;
  },

  compileTemplate() {
    this.template = Handlebars.compile(this.todosTemplate);
  },

  renderTodos() {
    const compiledHTML = this.template({ todos: this.todoList });
    this.todoContainer.innerHTML = compiledHTML;
  },
}

App.init();
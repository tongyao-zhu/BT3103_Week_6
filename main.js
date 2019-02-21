var db = firebase
  .initializeApp({
    databaseURL: "https://bt3103-108bf.firebaseio.com"
  })
  .database();
var todosRef = db.ref("todosWithUsername");
new Vue({
  el: "#app",
  data: {
    newTodoText: "",
    username: "anonymous"
  },
  firebase: {
    todos: todosRef.limitToLast(25)
  },
  methods: {
    addTodo: function() {
      if (this.newTodoText) {
        todosRef.push({
          text: this.newTodoText,
          username: this.username
        });
        this.newTodoText = "";
      }
    },
    updateTodoText: function(todo, newText) {
      todosRef
        .child(todo[".key"])
        .child("text")
        .set(newText);
    },
    updateUser: function() {},
    removeTodo: function(todo) {
      todosRef.child(todo[".key"]).remove();
    }
  }
});

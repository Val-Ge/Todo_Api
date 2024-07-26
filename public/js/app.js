$(document).ready(function() {
    // handle form submission
    $('#add-todo-form').on('submit', function(event) {
        event.preventDefault();
        const newTodo = $('#todo-input').val();
        $.ajax({
            url: '/api/todos',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: newTodo }),
            success: function(todo) {
                $('#todo-list').append(
                    `<li data-id="${todo._id}">
                        <span>${todo.name}</span>
                        <button class="delete-btn">✖</button>
                    </li>`
                );
                $('#todo-input').val('');
            }
        });
    });

    // Handle click on todo item
    $('#todo-list').on('click', 'li', function() {
        const $this = $(this);
        const todoId = $this.data('id');
        const isCompleted = $this.hasClass('completed');

        $.ajax({
            url: `/api/todos/${todoId}`,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({ completed: !isCompleted }),
            success: function() {
                $this.toggleClass('completed');
            }
        });
    })

    // Handle delete button click
    $('#todo-list').on('click', '.delete-btn', function(event) {
        event.stopPropagation(); // Prevent the click event from bubbling up to the li
        const todoId = $(this).closest('li').data('id');
        $.ajax({
            url: `/api/todos/${todoId}`,
            method: 'DELETE',
            success: function() {
                $(`li[data-id="${todoId}"]`).remove();
            }
        });
    });
});

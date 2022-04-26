$(document).ready(function () {
  let edit = false;
  $('#task-result').hide();
  fetchTasks();

  $('#search').keyup(function () {
    if ($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'task-search.php',
        type: 'POST',
        data: {
          search,
        },
        success: function (response) {
          let tasks = JSON.parse(response);
          let template = '';
          tasks.forEach((task) => {
            template += `<li>
                ${task.name}
              </li>`;
            $('#container').html(template);
            $('#task-result').show();
          });
        },
      });
    }
  });

  $('#task-form').submit(function (e) {
    const postData = {
      name: $('#name').val(),
      description: $('#description').val(),
      id: $('#task-id').val(),
    };

    let url = edit === false ? 'task-add.php' : 'task-edit.php';

    $.post(url, postData, function (response) {
      console.log(response);
      fetchTasks();
      $('#task-form').trigger('reset');
    });
    e.preventDefault();
  });

  function fetchTasks() {
    $.ajax({
      url: 'task-list.php',
      type: 'GET',
      success: function (response) {
        let tasks = JSON.parse(response);
        let template = '';
        tasks.forEach((task) => {
          template += `<tr task-id=${task.id}>
              <td>${task.id}</td>
              <td><a href="#" class="task-name text-decoration-none">${task.name}</a></td>
              <td>${task.description}</td>
              <td class="text-center px-0">
                <button class="task-delete btn btn-danger">Delete</button>
                <button class="btn btn-warning">Edit</button>
              </td>
            </tr>`;
        });
        $('#tasks').html(template);
      },
    });
  }

  $(document).on('click', '.task-delete', function () {
    if (confirm('Are you sure you want to delete it?')) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('task-id');
      $.post('task-delete.php', { id }, function (response) {
        console.log(response);
        fetchTasks();
      });
    }
  });

  $(document).on('click', '.task-name', function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('task-id');
    $.post('task-single.php', { id }, function (response) {
      const task = JSON.parse(response)[0];
      $('#name').val(task.name);
      $('#description').val(task.description);
      $('#task-id').val(task.id);
      edit = true;
    });
  });
});

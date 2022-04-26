$(document).ready(function () {
  $('#task-result').hide();

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
});

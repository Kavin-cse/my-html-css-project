script
$(document).ready(function () {
  // Add Task
  $("#addTaskBtn").click(function () {
    let taskText = $("#taskInput").val().trim();
    if (taskText !== "") {
      addTask(taskText);
      $("#taskInput").val("");
    }
  });

  // Add Task on Enter key
  $("#taskInput").keypress(function (e) {
    if (e.which === 13) {
      $("#addTaskBtn").click();
    }
  });

  // Function to create a new task
  function addTask(text) {
    let task = `
      <li class="list-group-item">
        <div class="form-check">
          <input class="form-check-input task-check" type="checkbox">
          <label class="form-check-label">${text}</label>
        </div>
        <div class="task-actions">
          <button class="btn btn-sm btn-warning edit-btn">Edit</button>
          <button class="btn btn-sm btn-danger delete-btn">Delete</button>
        </div>
      </li>
    `;
    $("#taskList").append(task);
  }

  // Toggle Completed
  $(document).on("change", ".task-check", function () {
    $(this).closest("li").find("label").toggleClass("completed");
  });

  // Delete Task
  $(document).on("click", ".delete-btn", function () {
    $(this).closest("li").remove();
  });

  // Edit Task
  $(document).on("click", ".edit-btn", function () {
    let label = $(this).closest("li").find("label");
    let currentText = label.text();
    let newText = prompt("Edit task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      label.text(newText.trim());
    }
  });

  // Filter Tasks
  $(".filter-btn").click(function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    let filter = $(this).data("filter");

    $("#taskList li").each(function () {
      let isChecked = $(this).find(".task-check").is(":checked");

      if (filter === "all") {
        $(this).show();
      } else if (filter === "active" && !isChecked) {
        $(this).show();
      } else if (filter === "completed" && isChecked) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
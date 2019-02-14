// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
  $(".change-devoured").on("click", function(event) {
    const id = $(this).data("id");
    const newDevoured = $(this).data("newdevoured");

    console.log("devoured state is ",newDevoured);

    const newDevouredState = {
      devoured: newDevoured
    };

    // Send the PUT request.
    $.ajax(`/api/burger/${id}`, {
      type: "PUT",
      data: newDevouredState
    }).then(
      () => {
        console.log("changed devoured to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", event => {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      name: $("#ba").val().trim(),
    };
    console.log(newBurger);

    // Send the POST request.
    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(
      () => {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    const id = $(this).data("id");

    // Send the DELETE request.
    $.ajax(`/api/burgers/${id}`, {
      type: "DELETE"
    }).then(
      () => {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
  
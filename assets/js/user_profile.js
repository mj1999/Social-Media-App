{
  let friendForm = $("#friendship-form");
  let button = $(" button", friendForm);
  console.log(button);
  let toggle_friendship = function () {
    friendForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/friends/toggle",
        data: friendForm.serialize(),
        success: function (data) {
          console.log(data);
          if (data.data.added) {
            button.text("Remove-friend");
          } else {
            button.text("Add-friend");
          }
        },
        error: function (err) {
          console.log("error while adding friend : ", err);
        },
      });
    });
  };
  toggle_friendship();
}

{
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          // console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#posts-list").prepend(newPost);
          deletePost($(" .delete-post", newPost));
          createComment(newPost);
          notification("success", "Post Created!");
        },
        error: function (err) {
          console.log(err.responseText);
          notification("error", "Post couldnt be created");
        },
      });
      e.target.reset();
    });
  };
  const setDate = function () {
    let date = new Date();
    date = date.toString().split(" ");
    return date[1] + " " + date[2] + " " + date[3] + ", " + date[4];
  };
  let newPostDom = function (post) {
    return $(`
        <div id="post-${post._id}" class="post-display">
            <div class="content">
                <p>${post.content}</p>
            </div>
            <div class="post-info">
                <div class="post-date">
                    <small>${setDate()}</small>
                </div>
                <div class="post-user">
                    <small>
                    <b>User:&nbsp;</b>
                    ${post.user.name}
                    </small>
                </div>
            </div>
            <div class="comment">
                <div>Comments:</div>
                <form action="/comments/create" id="new-comment-form-post-${
                  post._id
                }" method="post">
                    <textarea
                    required
                    name="comment"
                    cols="35"
                    rows="1"
                    placeholder="Type here..."
                    ></textarea>
                    <input type="hidden" name="postID" value="${post._id}" />
                    <input type="submit" value="Comment" />
                </form>
                <br />
                <div class="comment-list">

                </div>
            </div>
            <form class="delete-post" action="/posts/delete" method="post">
                <input type="hidden" name="postID" value="${post._id}" />
                <input class="delete-btn" type="submit" value="delete" />
            </form>
        </div>
    `);
  };

  let deletePost = function (deletePostForm) {
    $(deletePostForm).submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/delete",
        data: deletePostForm.serialize(),
        success: function (data) {
          $(`#post-${data.data.post._id}`).remove();
          notification("success", "Post Deleted!");
        },
        error: function (err) {
          console.log(err.responseText);
          notification("error", "Post couldnt be deleted");
        },
      });
    });
  };

  let createComment = function (post) {
    // console.log(post);
    let newCommentForm = $(`#new-comment-form-${post[0].id}`);
    newCommentForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/comments/create",
        data: newCommentForm.serialize(),
        success: function (data) {
          let newComment = newCommentDom(data.data.comment);
          let container = $(" .comment-list", post);
          container.append(newComment);
          // console.log($(" .delete-comment", newComment));
          deleteComment($(" .delete-comment", newComment));
        },
        error: function (err) {
          console.log(err);
        },
      });
      e.target.reset();
    });
  };

  let newCommentDom = function (comment) {
    return $(`
    <div id='${comment._id}' class="comment-display">
      <div class="comment-content">
        <p>${comment.content}</p>
        <div class="comment-info">
          <div class="comment-date">
            <small>${setDate()}</small>
          </div>
          <div class="comment-user">
            <small
              ><b>User:&nbsp;</b>
              ${comment.user.name}
            </small>
          </div>
        </div>
      </div>
      <form class="delete-comment" action="/comments/delete" method="post">
        <input type="hidden" name="commentID" value="${comment._id}" />
        <button class="delete-btn" type="submit">
          <i class="fa-solid fa-trash"></i>
        </button>
      </form>
    </div>
    `);
  };

  let deleteComment = function (deleteCommentForm) {
    // console.log(deleteCommentForm);
    deleteCommentForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/comments/delete",
        data: deleteCommentForm.serialize(),
        success: function (data) {
          $(`#${data.data.comment._id}`).remove();
          notification("success", "Comment Deleted!");
        },
        error: function (err) {
          console.log("error deleting comment", err);
        },
      });
    });
  };

  for (let el of $(".delete-post")) {
    deletePost($(el));
  }
  for (let el of $(".post-display")) {
    createComment($(el));
  }
  for (let el of $(".delete-comment")) {
    deleteComment($(el));
  }

  const notification = function (type, message) {
    new Noty({
      theme: "relax",
      text: message,
      type: type,
      layout: "topRight",
      timeout: 1500,
    }).show();
  };

  createPost();
}

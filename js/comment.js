const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const comment = document.getElementById('comment').value;

  // Create a new comment element
  const newComment = document.createElement('li');
  newComment.innerHTML = comment;

  // Add the new comment to the list
  commentsList.appendChild(newComment);

  // Save the comment to the database (in this example, we're just logging it to the console)
  console.log(comment);
});

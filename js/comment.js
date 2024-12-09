
const tx = document.querySelector('#comment');
const commentList = document.querySelector('.comment-list');
const submit = document.querySelector('.comment-btn')


// The common function to add comment
function addComment(event) {
  // prevent the page refresh
  if(event) event.preventDefault();
  // prevent submitting empty contents
  if (tx.value.trim()) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment-item');
    newComment.innerHTML = `
        <div class="info">
          <div class="name-line">
            <svg xmlns="http://www.w3.org/2000/svg" class="comment-avatar" height="40px" viewBox="0 -960 960 960" width="40px" fill="black">
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
            </svg>
            <p class="name">Anonymous</p>
          </div>
          <p class="text">${tx.value.trim()}</p>
          <p class="time">${new Date().toLocaleString()}</p>
          <button class="delete-btn">Delete</button>
        </div>
      `;
    commentList.appendChild(newComment);
    tx.value = '';

    // Add event listener for delete button
    const deleteBtn = newComment.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        newComment.remove(); // Remove the comment item
    });
  }
}
  


// add comment if the enter up
tx.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    addComment(e)
    }
  }
);

// add comment if the submit button is clicked
submit.addEventListener('click', function (e) {
  addComment(e);
});


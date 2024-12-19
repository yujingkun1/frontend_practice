const tx = document.querySelector('#comment');
const commentList = document.querySelector('.comment-list');
const submit = document.querySelector('.comment-btn');

// Add comment if the submit button is clicked
submit.addEventListener('click', function (e) {
    addComment(e);
});

// Add comment function with login check
function addComment(event) {
  if (event) event.preventDefault();

  // Check if user is logged in
  const username = localStorage.getItem('loggedInUser') || 'Guest';

  // Prevent submitting empty contents
  if (tx.value.trim()) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment-item');
    newComment.innerHTML = `
    <div class="info">
        <div class="name-line">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle"
                                viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
            <p class="name">${username}</p>
            
        </div>
        <p class="text">${tx.value.trim()}</p>
        <p class="time">${new Date().toLocaleString()}</p>
        <div class="actions">
                                
            <button class="like-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path
                        d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
                </svg>
                <span class="like-count">0</span>
            </button>

            <button class="reply-btn" aria-label="reply">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path
                        d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                </svg>
            </button>
            ${username !== 'Guest' ? `
            <button class="delete-btn">Delete</button>
            ` : ''} 
        </div>
        <div class="replies"></div>
    </div>
    `;
    commentList.appendChild(newComment);
    tx.value = '';

    attachReplyFunctionality(newComment);
    attachLikeFunctionality(newComment);
    if (username !== 'Guest') {
        attachDeleteFunctionality(newComment); // Only attach delete functionality for logged-in users
    }
  }
}

// Attach reply functionality
function attachReplyFunctionality(commentItem) {
  const replyBtn = commentItem.querySelector('.reply-btn');
  const repliesContainer = commentItem.querySelector('.replies');

  let replyInputVisible = false;
  replyBtn.addEventListener('click', function () {
    if (!replyInputVisible) {
        const replyInput = document.createElement('div');
        replyInput.classList.add('reply-input-container');
        replyInput.innerHTML = `
        
        <div class="submit-row">
            <span class="d-inline-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle"
                                viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
            <textarea class="reply-input" placeholder="Type your reply here..." rows="1"></textarea>
            <button class="submit-reply-btn">Submit</button>
            </span>
        </div>
        
        `;
        repliesContainer.appendChild(replyInput);

        const submitReplyBtn = replyInput.querySelector('.submit-reply-btn');
        const replyInputField = replyInput.querySelector('.reply-input');

        submitReplyBtn.addEventListener('click', function () {
            if (replyInputField.value.trim()) {
                const username = localStorage.getItem('loggedInUser') || 'Guest';
                const newReply = document.createElement('div');
                newReply.classList.add('reply-item');
                newReply.innerHTML = `
                    <div class="name-line">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle"
                                        viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                        <p class="reply-username">${username}</p>   
                    </div>
                    <p class="reply-text">${replyInputField.value.trim()}</p>
                    <p class="reply-time">${new Date().toLocaleString()}</p>
                    ${username !== 'Guest' ? `<button class="delete-reply-btn">Delete</button>` : ''}
                `;
                repliesContainer.appendChild(newReply);
                replyInput.remove();
                replyInputVisible = false;
                // Attach delete functionality for the new reply
                if (username !== 'Guest') {
                    attachDeleteReplyFunctionality(newReply);
                }             
            }
        });
      replyInputVisible = true;
    } else {
      repliesContainer.querySelector('.reply-input-container').remove();
      replyInputVisible = false;
    }
  });
}

// Attach like functionality
function attachLikeFunctionality(commentItem) {
  const likeBtn = commentItem.querySelector('.like-btn');
  const likeCount = commentItem.querySelector('.like-count');

  let liked = false;
  likeBtn.addEventListener('click', function () {
    liked = !liked;
    if (liked) {
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
      likeBtn.classList.add('liked');
    } else {
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
      likeBtn.classList.remove('liked');
    }
  });
}

// Attach delete functionality
function attachDeleteFunctionality(commentItem) {
  const deleteBtn = commentItem.querySelector('.delete-btn');
  const username = localStorage.getItem('loggedInUser') || 'Guest';

  if (deleteBtn) {
    deleteBtn.addEventListener('click', function () {
      const commentUsername = commentItem.querySelector('.name').textContent;
      if (commentUsername === username || username === 'Admin') {
        commentItem.remove();
      } else {
        alert('You can only delete your own comments.');
      }
    });
  }
}

// Attach delete functionality for replies
function attachDeleteReplyFunctionality(replyItem) {
  const deleteReplyBtn = replyItem.querySelector('.delete-reply-btn');
  const username = localStorage.getItem('loggedInUser') || 'Guest';

  if (deleteReplyBtn) {
    deleteReplyBtn.addEventListener('click', function () {
      const replyUsername = replyItem.querySelector('.reply-username').textContent;
      if (replyUsername === username || username === 'Admin') {
        replyItem.remove();
      } else {
        alert('You can only delete your own replies.');
      }
    });
  }
}

// Initialize existing comments
document.querySelectorAll('.comment-item').forEach(commentItem => {
    attachReplyFunctionality(commentItem);
    attachLikeFunctionality(commentItem);
    attachDeleteFunctionality(commentItem);
});


// Add comment if the enter key is pressed
tx.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addComment(e);
    }
});


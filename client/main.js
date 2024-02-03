const baseURL = "http://localhost:2020";
const messageForm = document.getElementById("message-form");
const submitButton = document.getElementById("submitBtn");
const messageList = document.getElementById("message-list");

messageList.addEventListener("click", async (event) => {
  //click event for delete buttons
  event.preventDefault();
  await handleDelete(event.target.id); //message id for delete
  displayMessageList(); //displaying updated message list (displayMessage function)
});

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const messageData = new FormData(messageForm);
  const messageContent = Object.fromEntries(messageData);
  const response = await fetch(`${baseURL}/messageBoard`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(messageContent),
  });
  if (response.status === 200) {
    displayMessageList();
  } else {
    console.log("Failed to add message");
  }
});

displayMessageList();

async function getMessageList() {
  const response = await fetch(`${baseURL}/messageBoard`);

  let result = await response.json();
  console.log(result);
  return result;
}

async function displayMessageList() {
  let messages = await getMessageList(); //needs await, otherwise messages is undefined.(update message function)
  messageList.innerHTML = "";
  messages.forEach((message) => {
    let messageLi = document.createElement("li");
    let messageDiv = document.createElement("div");
    let usernameDelDiv = document.createElement("div");
    usernameDelDiv.className = `username-delete-div`;
    let messageUsername = document.createElement("p");
    messageUsername.className = `username`;
    messageUsername.innerText = `${message.username}`; //getting the username to display
    let messageText = document.createElement("p");
    messageText.className = `message-text`;
    messageText.innerText = `${message.message}`; //getting the message to display
    let deleteBtn = document.createElement("button");
    deleteBtn.id = message.id;
    deleteBtn.textContent = "X";
    // creating div for messages, p's for username and message, button for delete

    usernameDelDiv.append(messageUsername);
    usernameDelDiv.append(deleteBtn);
    //appending delete button and username to first div
    messageDiv.append(usernameDelDiv);
    // appending username delete div to messages div
    messageDiv.append(messageText);
    //appending message text to second div
    messageLi.append(messageDiv);
    //appending message div to message Li element
    messageList.append(messageLi);
    //appending message Li to messageList
  });

  // messages.forEach((message) => {
  //   let listItem = document.createElement("li"); //creating message list items
  //   let deleteBtn = document.createElement("button"); //creatings delete buttong on messages
  //   deleteBtn.id = message.id; //giving id for delete button from messages
  //   listItem.innerHTML = `${message.username} : ${message.message}`; //listing messages
  //   listItem.append(deleteBtn); //listing delete button
  //   deleteBtn.textContent = "X"; //setting buttong content
  //   messageList.append(listItem); //adding list item. message and delete button
  // });
}

// function for delete
async function handleDelete(id) {
  const result = await fetch(`${baseURL}/messageBoard/${id}`, {
    method: "DELETE",
  });
  console.log(result);
}

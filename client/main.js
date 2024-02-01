const baseURL = "http://localhost:2020";
const messageForm = document.getElementById("message-form");
const submitButton = document.getElementById("submitBtn");
const messageList = document.getElementById("message-list");

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
    const messages = await getMessageList();
    displayMessageList(messages);
  } else {
    console.log("Failed to add message");
  }
});

async function getMessageList() {
  const response = await fetch(`${baseURL}/messageBoard`);

  let result = await response.json();
  console.log(result);
  return result;
}

function displayMessageList(messages) {
  messageList.innerText = "";
  messages.forEach((message) => {
    let listItem = document.createElement("li");
    listItem.innerText = `${message.username} : ${message.message}`;
    messageList.append(listItem);
  });
}

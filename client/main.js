const baseURL = "http://localhost:2020";
const messageForm = document.getElementById("message-form");
const submitButton = document.getElementById("submitBtn");

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
  if (response.ok) {
    displaymessageBoard();
  } else {
    console.log("Failed to add message");
  }
});

// submitButton.addEventListener('click', )

// JavaScript code to handle hover effect and fetch message from backend
document.addEventListener("DOMContentLoaded", function () {
  const valentinesDayCard = document.querySelector(".valentines-day-card");
  const hoverMessage = document.querySelector(".text");

  async function fetchMessage() {
    try {
      // Fetch message from backend
      const response = await fetch("/api/message"); // Update URL as per your backend endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch message");
      }
      const data = await response.json();
      return data.message || "No special message today"; // If no message available, use alternate message
    } catch (error) {
      console.error("Error fetching message:", error);
      return "Failed to fetch message";
    }
  }

  async function showMessage() {
    const message = await fetchMessage();
    hoverMessage.textContent = message;
  }

  async function resetMessage() {
    hoverMessage.textContent = "Happy Valentine's Day";
  }

  async function showToFrom() {
    const message = await fetchMessage();
    const sender = message.sender;
    const recipient = message.recipient;

    // Update "To" section with recipient
    const toElement = document.querySelector(".to");
    if (recipient) {
      toElement.textContent = `To: ${recipient}`;
    } else {
      toElement.style.display = "none"; // Hide "To" element if there is no recipient
    }

    // Update "From" section with sender
    const fromElement = document.querySelector(".from");
    if (sender) {
      fromElement.textContent = `From: ${sender}`;
      fromElement.style.display = "block"; // Show "From" element if there is a sender
    } else {
      fromElement.style.display = "none"; // Hide "From" element if there is no sender
    }
  }

  // Set the default text of the card
  resetMessage();
  showToFrom();

  // Add event listeners to show/hide message on hover
  valentinesDayCard.addEventListener("mouseenter", showMessage);
  valentinesDayCard.addEventListener("mouseleave", resetMessage);
});

document.addEventListener("DOMContentLoaded", function () {
  const valentinesDayCard = document.querySelector(".container");
  const card = document.querySelector(".card");

  async function showToFrom() {
    const message = await fetchMessage();
    // const sender = message.sender;
    // const recipient = message.recipient;
    const sender = "test";
    const recipient = "testing";

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

  showToFrom();

  function animateCardUp() {
    card.style.transition = "top 0.5s ease-in-out";
    card.style.top = "-90px";
  }

  function animateCardDown() {
    card.style.transition = "top 0.5s ease-in-out";
    card.style.top = "0";
  }

  // Add event listeners to animate card on mouse enter and mouse leave
  valentinesDayCard.addEventListener("mouseenter", animateCardUp);
  valentinesDayCard.addEventListener("mouseleave", animateCardDown);
});

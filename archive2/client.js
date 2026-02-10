const form = document.querySelector("form");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `http://localhost:8000/search?inputValue=${encodeURIComponent(
        data.get("code")
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Row data:", data);
    } else {
      console.error("Server returned an error:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleSubmit(e);
  }
});

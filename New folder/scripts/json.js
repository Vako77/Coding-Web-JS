fetch("http://localhost:3000/settlements")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("json-container");

    // თითო Settlement-ისთვის ქარდის შექმნა
    data.forEach((settlement) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
    <img src="${settlement.Image}" alt="${settlement.Name}">
     <div class="main-information-card">
        <h3 class="card-title">${settlement.Name}</h3>
        <p>${settlement.information}</p>
    </div>
      `;
      container.appendChild(card); // ქარდის დამატება კონტეინერში
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

const username = localStorage.getItem("username");
const email = localStorage.getItem("email");
const password = localStorage.getItem("password");

console.log("username:", username);
console.log("email:", email);
console.log("password:", password);

if (username && email && password) {
  const userInfoDiv = document.getElementById("userInfo");
  userInfoDiv.innerHTML = `
      <p><strong>სახელი:</strong> ${username}</p>
      <p><strong>ელ-ფოსტა:</strong> ${email}</p>
      <p><strong>პაროლი:</strong> ${password}</p>
    `;
} else {
  document.getElementById("userInfo").textContent = "მონაცემები არ მოიძებნა.";
}

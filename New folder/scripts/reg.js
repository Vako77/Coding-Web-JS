document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const faceIdButton = document.getElementById("faceIdButton");
  const cameraContainer = document.getElementById("cameraContainer");
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const faceIdError = document.getElementById("faceIdError");

  let isFaceDetected = false;

  faceIdButton.addEventListener("click", async () => {
    const regCard = document.querySelector(".reg-card");
    regCard.classList.add("hidden");
    cameraContainer.classList.remove("hidden");
    setTimeout(() => cameraContainer.classList.add("active"), 50);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();
      faceIdError.textContent = "გთხოვთ, მიუახლოვდეთ კამერას...";
      detectFace();
    } catch (error) {
      console.error("Camera access error:", error);
      faceIdError.textContent = "კამერაზე წვდომა ვერ მოხერხდა.";
      cameraContainer.classList.remove("active");
      cameraContainer.classList.add("hidden");
      regCard.classList.remove("hidden");
    }
  });

  async function detectFace() {
    const model = await blazeface.load();
    const context = canvas.getContext("2d");

    const detect = async () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const predictions = await model.estimateFaces(canvas);

      if (predictions.length > 0) {
        isFaceDetected = true;
        faceIdError.textContent = "სკანირება წარმატებით გაიარეთ!";

        const stream = video.srcObject;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        cameraContainer.classList.remove("active");
        cameraContainer.classList.add("hidden");

        setTimeout(() => {
          const regCard = document.querySelector(".reg-card");
          regCard.classList.remove("hidden");
        }, 500);
      } else {
        requestAnimationFrame(detect);
      }
    };

    detect();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let hasError = false;

    const username = document.getElementById("username").value.trim();
    const usernameError = document.getElementById("usernameError");
    if (username.length < 5) {
      usernameError.textContent = "სახელი უნდა შეიცავდეს მინიმუმ 5 სიმბოლოს.";
      hasError = true;
    } else {
      usernameError.textContent = "";
    }

    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "გთხოვთ, სწორად შეიყვანეთ ელ-ფოსტა.";
      hasError = true;
    } else {
      emailError.textContent = "";
    }

    const password = document.getElementById("password").value.trim();
    const passwordError = document.getElementById("passwordError");
    if (password.length < 8) {
      passwordError.textContent = "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს.";
      hasError = true;
    } else {
      passwordError.textContent = "";
    }

    if (!isFaceDetected) {
      faceIdError.textContent = "Face ID ვერ გააქტიურდა.";
      hasError = true;
    } else {
      faceIdError.textContent = "";
    }

    if (!hasError) {
      const successMessage = document.getElementById("successMessage");
      const closeSuccess = document.getElementById("closeSuccess");
    
      successMessage.classList.add("active");
    
      closeSuccess.addEventListener("click", () => {
        successMessage.classList.remove("active");
      });
    
      form.reset();
      isFaceDetected = false;
    
      setTimeout(() => {
        window.location.href = "pages/home.html";
      }, 3000);
    }
    
    
  });
});

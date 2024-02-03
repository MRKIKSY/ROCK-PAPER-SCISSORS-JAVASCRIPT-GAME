// Get DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

// Function to reset the game
function resetGame() {
  // Remove "active" class from all option images
  optionImages.forEach((image) => {
    image.classList.remove("active");
  });

  // Set default images and result text
  userResult.src = cpuResult.src = "images/rock.png";
  result.textContent = "Wait...";
}

// Function to update and display the scoreboard
function updateScoreboard(userScore, cpuScore) {
  const scoreboard = document.querySelector(".scoreboard");
  scoreboard.textContent = `User: ${userScore} - CPU: ${cpuScore}`;
}

// Check if there is a scoreboard in local storage, if not initialize it
let userScore = localStorage.getItem("userScore") || 0;
let cpuScore = localStorage.getItem("cpuScore") || 0;
updateScoreboard(userScore, cpuScore);

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    // Reset the game
    resetGame();

    // Add "active" class to the clicked option image
    image.classList.add("active");

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "MR KIKSY",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "MR KIKSY",
        SS: "Draw",
        SR: "MR KIKSY",
        SP: "User",
      };

      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];

      // Update the scoreboard based on the result
      if (userValue !== cpuValue) {
        outComeValue === "User" ? userScore++ : cpuScore++;
        localStorage.setItem("userScore", userScore);
        localStorage.setItem("cpuScore", cpuScore);
        updateScoreboard(userScore, cpuScore);
      }

      // Display the result
      result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;

      // Reload the window after a brief delay
      setTimeout(() => {
        location.reload();
      }, 2000);
    }, 2500);
  });
});


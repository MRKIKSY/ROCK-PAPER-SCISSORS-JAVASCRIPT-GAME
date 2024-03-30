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
  userResult.src = cpuResult.src = "rock.png";
  result.textContent = "Wait...";
}

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
      let cpuImages = ["rock.png", "paper.png", "scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "SORRY SAM  WON ",
        RS: "CONGRATS MILAN  ",
        PP: "Draw",
        PR: "CONGRATS MILAN   ",
        PS: "SORRY SAM WON  ",
        SS: "Draw",
        SR: "SORRY SAM WON  ",
        SP: "CONGRATS MILAN   ",
      };

      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];

      // Display the result
      result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;

      // Reload the window after a brief delay
      setTimeout(() => {
        location.reload();
      }, 2000);
    }, 2500);
  });
});

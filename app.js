const Utility = require("./src/utility/Utility");
const prompt = require("prompt-sync")();

const utility = new Utility();

const startMenu = () => {
  console.log("\nWelcome to the Hotel management program");
  let flag = true;
  do {
    console.log("\nPress 1 - Registration");
    console.log("Press 2 - Login");
    console.log("Press 4 - Exit\n");
    let option = parseInt(prompt("Enter your choice : "));
    switch (option) {
      case 1:
        utility.registerCustomer();
        break;
      case 2:
        utility.login();
        break;
      case 3:
        utility.adminPage();
        break;
      case 4:
        flag = false;
        break;
      default:
        console.log("Invalid input!");
        break;
    }
  } while (flag);
}

startMenu();
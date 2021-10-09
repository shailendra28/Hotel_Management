const prompt = require("prompt-sync")();
const CustomerDetail = require("./customerDetails");
const CustomerOrders = require("./customerOrder");
const fs = require("fs");
const JsonToXlsx = require("xlsx");

class CustomerUtility {
  // New registration of customer
  registerCustomer = () => {
    let customer = new CustomerDetail();
    console.log("");
    customer.fName = prompt("Enter your first name : ");
    customer.lName = prompt("Enter your last name : ");
    customer.phone = prompt("Enter your phone number : ");
    customer.email = prompt("Enter your email Id : ");
    customer.daystoStay = prompt("Enter the number of days to stay : ");
    customer.uniqueKey = this.generateuniqueKey(customer.fName, customer.phone);

    customer.checkInDate = new Date();
    customer.pass = prompt("Choose a password : ");
    this.write(customer, "G:/HotelManagement/json/data.json");
    console.log();
    console.log(customer.fName, customer.lName, "registered successfully");
  };
  //generate uId for customer
  generateuniqueKey = (name, number) => {
    return name.substring(0, 4) + number.substring(0, 4);
  };

  write = (user) => {
    try {
      const docObj = JSON.parse(
        fs.readFileSync("G:/HotelManagement/json/data.json")
      );
      docObj.push(user);
      fs.writeFileSync(
        "G:/HotelManagement/json/data.json",
        JSON.stringify(docObj)
      );
    } catch {
      let docArray = new Array();
      docArray.push(CustomerDetail);
      fs.writeFileSync(
        "G:/HotelManagement/json/data.json",
        JSON.stringify(docArray)
      );
    }
  };

  //login option
  login() {
    console.log(
      "\n  --- Please choose login option ---\n 1.Admin login \n 2.User login \n 3.exit\n"
    );
    let choice = parseInt(prompt("Enter your choice : "));
    switch (choice) {
      case 1:
        this.adminLogin();
        break;
      case 2:
        this.userLogin();
        break;
      default:
        console.log("Invalid Choice!");
        break;
    }
  }

  // Admin login
  adminLogin() {
    let username = prompt("Enter your username : ");
    let password = prompt("Enter passcode : ");
    let flag = true;
    if (username === "Admin" && password === "admin123") {
      console.log("\nWelcome Admin");
      do {
        console.log(
          "\n  --- Please choose login option ---\n 1.Generate Bill  \n 2.exit\n );"
        );
        let option = parseInt(prompt("Enter your choice : "));
        if (option === 1) {
          this.generateBill();
        } else if (option == 2) flag = false;
      } while (flag);
    } else console.log("Invalid entry");
  }

  generateBill() {
    console.log("Print Bill:");
    this.jsonToXlsx(
      "G:/HotelManagement/json/data.json",
      "G:/HotelManagement/report/report.xlsx",
      "customerBill"
    );
    this.jsonToXlsx(
      "G:/HotelManagement/json/customer.json",
      "G:/HotelManagement/report/order.xlsx",
      "orderReport"
    );
  }
  userLogin() {
    let name = prompt("Enter customer name: ");
    let password = prompt("Enter your password: ");

    const doc = fs.readFileSync("G:/HotelManagement/json/data.json");
    const docObj = JSON.parse(doc);

    for (let user in docObj) {
      if (docObj[user].name === name && docObj[user].uniqueKey === password) {
        this.customer = docObj[user];
        console.log("\n|--- Welcome", this.customer.name + "! ---|");
        this.orderMenu();
      }
    }
    console.log("Incorrect matched");
    console.log("");
  }

  orderMenu = () => {
    let option = 0;
    do {
      console.log(
        "\n  --- Please choose Your Menu ---\n 1.Order food \n 2.Other services \n 3.exit\n"
      );
      option = parseInt(prompt("Enter your choice : "));

      switch (option) {
        case 1:
          this.orderFood();
          break;
        case 2:
          this.orderServices();
          break;
        case 3:
          this.exit();
          option = 4;
          break;
        default:
          console.log("Not Allowed");
          break;
      }
    } while (option != 4);
  };
}
orderFood = () => {
  let flag = true;
  while (flag) {
    console.log("\nPress 1 - Order Tea (10Rs)");
    console.log("Press 2 - Order Breakfast (150Rs)");
    console.log("Press 3 - Order Lunch (250Rs)");
    console.log("Press 4 - Order Dinner (500Rs)");
    console.log("Press 5 - Back\n");
    let option = parseInt(prompt("Enter Your Choice"));

    switch (option) {
      case 1:
        this.write(new Orders(this.customer.uniqueKey, "Tea", 1, 10));
        console.log("\n Tea selected successfully");
        break;
      case 2:
        this.write(new Orders(this.customer.uniqueKey, "Breakfast", 1, 150));
        console.log("\nBreakfast selected successfully");
        break;
      case 3:
        this.write(new Orders(this.customer.uniqueKey, "Lunch", 1, 250));
        console.log("\nLunch selected successfully");
        break;
      case 4:
        this.write(new Orders(this.customer.uniqueKey, "Dinner", 1, 500));
        console.log("\nDinner selected  successfully");
        break;
      case 5:
        flag = false;
        break;
      default:
        console.log("Invalid!!!");
    }
  }
};
otherServices = () => {
  let flag = true;
  while (flag) {
    console.log("\nPress 1 - Rent Bike(550Rs)");
    console.log("Press 2 - Rent Car(1000Rs)");
    console.log("Press 3 - Exit\n");
    let option = parseInt(prompt("Enter Your Choice"));

    switch (option) {
      case 1:
        this.write(new Orders(this.customer.uniqueKey, "Bike", 1, 550));
        console.log("\nBike selected successfully");
        break;
      case 2:
        this.write(new Orders(this.customer.uniqueKey, "Car", 1, 1000));
        console.log("\nCar selected successfully");
        break;
      case 3:
        console.log("Exit");
        flag = false;
        break;
      default:
        console.log("Invalid!!!");
    }
  }
};

checkout = () => {
  console.log("Create bill");
  let checkInDate = new Date(this.customer.checkInDate);
  this.customer.checkOutDate = new Date();
  const totalBill = this.generateBill(
    this.customer.uniqueKey,
    checkInDate,
    this.customer.checkOutDate
  );
  console.log(totalBill);
};
generateBill = (uniqueKey, checkInDate, checkOutDate) => {
  const docObj = JSON.parse(
    fs.readFileSync("G:/HotelManagement/json/customer.json")
  );
  const docObj2 = JSON.parse(
    fs.readFileSync("G:/HotelManagement/json/data.json")
  );
  let sum = 0;
  let stay = 0;
  let diff = checkOutDate.getHours() - checkInDate.getHours();
  docObj.forEach((element) => {
    if (element.uniqueKey === uniqueKey) {
      sum += element.price;
    }
  });
  docObj2.forEach((element) => {
    if (element.uniqueKey === uniqueKey) {
      stay = element.stayOfDays;
    }
  });
  if (diff < 12) {
    return (sum += 500);
  } else {
    return (sum += stay * 1000);
  }
};

//  customer orders read-write data in json
writeOrders = (order) => {
  try {
    const docObj = JSON.parse(
      fs.readFileSync("G:/HotelManagement/json/customer.json")
    );
    docObj.push(order);
    fs.writeFileSync(
      "G:/HotelManagement/json/customer.json",
      JSON.stringify(docObj)
    );
  } catch {
    let docArray = new Array();
    docArray.push(order);
    fs.writeFileSync(
      "G:/HotelManagement/json/customer.json",
      JSON.stringify(docArray)
    );
  }
};

getJsonObj = (inputFile) => {
  let stringJson = fs.readFileSync(inputFile);
  let jsonObj = JSON.parse(stringJson);
  return jsonObj;
};
jsonToXlsx = (jsonFile, xlsxFile, sheetName) => {
  let jsonObj = this.getJsonObj(jsonFile);
  let workBook = JsonToXlsx.utils.book_new();
  let workSheet = JsonToXlsx.utils.json_to_sheet(jsonObj);
  JsonToXlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
  JsonToXlsx.writeFile(workBook, xlsxFile);
};

module.exports = CustomerUtility;

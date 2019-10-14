function Employee(name) {
  this.name = name;
  this.department = "general";
}


function Manager(name, reports) {
  //name, department inherited - plus reports
  this.name = name;
  this.reports = reports;
}

Manager.prototype = new Employee();
Manager.prototype.constructor = Manager;


function WorkBee(name, projectName) {
  //name, department inherited - plus projectName
  this.name = name;
  this.projectName = projectName;
}

WorkBee.prototype = new Employee();
WorkBee.prototype.constructor = WorkBee;


function SalesPerson(name, revenue) {
  //name, department and projectName inherited - plus revenue
  this.name = name;
  this.department = "sales";
  this.revenue = revenue;
}

SalesPerson.prototype = new WorkBee("", "internal");
SalesPerson.prototype.constructor = SalesPerson;


function SoftwareEngineer(name, techSkills, projectName) {
  //name, department and projectName inherited - plus techSkills
  this.name = name;
  this.department = "tech";
  this.techSkills = techSkills;
  this.projectName = projectName;
}

SoftwareEngineer.prototype = new WorkBee("", "internal");
SoftwareEngineer.prototype.constructor = SoftwareEngineer;


var John = new Manager("John Doe", [{name: "Q1"}, {name: "Q2"}]);

console.log(John.department); // General
console.log(John.name) // John Doe
console.log(John.reports) // [{name: "Q1", "statistics": ...}, {name: "Q2", statistics: ...}]

var Michael = new SalesPerson("Michael T", 2540);

console.log(Michael.department); // sales
console.log(Michael.name) // Michael T
console.log(Michael.projectName); // internal
console.log(Michael.revenue); // 2540

var Joseph = new SoftwareEngineer("Joseph K. Ellis", ["Javascript", "HTML"], "App-ComplyAdvantage");

console.log(Joseph.department); // tech
console.log(Joseph.name) // Joseph K. Ellis
console.log(Joseph.projectName); // App-ComplyAdvantage
console.log(Joseph.techSkills); // ["Javascript", "HTML"]

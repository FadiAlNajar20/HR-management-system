'use strict';
let allData = [];

let formEl = document.getElementById('formID');
formEl.addEventListener('submit', handleForm);

function Employee(id, fullName, department, level, imageURL, salary) {
    this.id = id;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageURL = imageURL;
    this.salary = salary;
    allData.push(this);
}

let employee1 = new Employee(1000, 'Ghazi Samer', 'Administration', 'Senior', './assets/Ghazi.jpg');
let employee2 = new Employee(1001, 'Lana Ali', 'Finance', 'Senior', './assets/Lana.jpg');
let employee3 = new Employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior', './assets/Tamara.jpg');
let employee4 = new Employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior', './assets/Safi.jpg');
let employee5 = new Employee(1004, 'Omar Zaid', 'Development', 'Senior', './assets/Omar.jpg');
let employee6 = new Employee(1005, 'Rana Saleh', 'Development', 'Junior', './assets/Rana.jpg');
let employee17 = new Employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior', './assets/Hadi.jpg');

Employee.prototype.calculateSalary = function () {
    let levelSalary;
    switch (this.level) {
        case 'Junior': levelSalary = getRandomSalary(500, 1000);
            break;
        case 'Mid-Senior': levelSalary = getRandomSalary(1000, 1500);
            break;
        case 'Senior': levelSalary = getRandomSalary(1500, 2000);
            break;
        default:
            break;
    }
    this.salary = levelSalary;
    const netSalary = this.salary - this.salary * 0.075;
    return (this.salary = netSalary);
}

Employee.prototype.render = function () {
    let adminEl = document.getElementById('adminSection');
    let financeEl = document.getElementById('finance');
    let marketingEl = document.getElementById('marketing');
    let developmentEl = document.getElementById('development');

    adminEl.innerHTML = '';
    financeEl.innerHTML = '';
    marketingEl.innerHTML = '';
    developmentEl.innerHTML = '';

    allData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const imageURL = document.createElement('img');
        imageURL.src = item.imageURL;

        const title = document.createElement('h3');
        title.textContent = `Name: ${item.fullName} - ID: ${item.id}`;

        const body = document.createElement('h5');
        body.textContent = `Department: ${item.department} - Level: ${item.level}`;

        const salary = document.createElement('p');
        salary.textContent = `Salary: ${item.calculateSalary()}`;

        switch (item.department) {
            case 'Administration':
                adminEl.appendChild(card);
                break;
            case 'Marketing':
                marketingEl.appendChild(card);
                break;
            case 'Development':
                developmentEl.appendChild(card);
                break;
            case 'Finance':
                financeEl.appendChild(card);
                break;
        }

        card.appendChild(imageURL);
        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(salary);
    });
};


function renderAll() {
    for (let i = 0; i < allData.length; i++) {
        allData[i].render();
    }
}

renderAll();

Employee.prototype.generateID = function () {
    let number = 0;
    for (let i = 0; i < allData.length; i++) {
        number = allData[i].id + 1
    }
    return number;
}

function getRandomSalary(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let result = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    return result;
}

function handleForm(e) {
    e.preventDefault();
    let employeeName = e.target.fullName.value;
    let slesctDepartment = e.target.department.value;
    let slesctLevel = e.target.level.value;
    let employeeImage = e.target.imageURL.value;
    let id = Employee.prototype.generateID();
    let newEmloyee = new Employee(id, employeeName, slesctDepartment, slesctLevel, employeeImage);
    console.log(newEmloyee);
    console.log(allData);
    newEmloyee.calculateSalary();
    newEmloyee.render();
    saveData(allData);
}

function saveData(data) {
    let stringfiyData = JSON.stringify(data);
    localStorage.setItem('employee', stringfiyData);
}

function getData() {
    let getDataFromLocalStorage = localStorage.getItem('employee');
    let parsedData = JSON.parse(getDataFromLocalStorage);
    console.log('this is parsed data: ', parsedData);

    if (parsedData !== null) {
        allData = parsedData.map(employeeData => {
            let employee = new Employee(
                employeeData.id,
                employeeData.fullName,
                employeeData.department,
                employeeData.level,
                employeeData.imageURL,
                employeeData.salary
            );
            employee.calculateSalary();
            return employee;
        });
        renderAll();
    }
}

getData();
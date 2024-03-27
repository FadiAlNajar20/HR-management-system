'use strict';
let allData = []

let person = new Employee(1000, 'Ghazi Samer', 'Administration', 'Senior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&usqp=CAU');
let person2 = new Employee(1001, 'Lana Ali', 'Finance', 'Senior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZlAcC_1n7gulS21qRrKRo-FYLW4xLt9y2eA&usqp=CAU');
let person3 = new Employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&usqp=CAU');
let person4 = new Employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&usqp=CAU');
let person5 = new Employee(1004, 'Omar Zaid', 'Development', 'Senior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&usqp=CAU');
let person6 = new Employee(1005, 'Rana Saleh', 'Development', 'Junior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZlAcC_1n7gulS21qRrKRo-FYLW4xLt9y2eA&usqp=CAU');
let person7 = new Employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&usqp=CAU');



Employee.prototype.calculateSalary = function () {
    let min, max;

    switch (this.level) {
        case 'Junior':
            min = 500;
            max = 1000;
            break;
        case 'Mid-Senior':
            min = 1000;
            max = 1500;
            break;
        case 'Senior':
            min = 1500;
            max = 2000;
            break;
        default:
            break;
    }

    this.salary = getRandomSalary(min, max);

    const netSalary = this.salary - this.salary * 0.075;

    return netSalary;
}

function getRandomSalary(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let result = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    // console.log('From the random: ',result);
    return result;
}

function Employee(id, fullName, department, level, imageURL, salary) {
    this.id = id;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageURL = imageURL;
    this.salary = salary;
    allData.push(this);
}

Employee.prototype.render = function(){
    let TEl = document.getElementById('data');
    let result = `
        <table>
            <tr>
                <th>Employee ID</th>
                <th>Full name</th>
                <th>Department</th>
                <th>Level</th>
                <th>Image</th>
                <th>Salary</th>
            </tr>`;
    allData.map((item) => {
        result += `
            <tr>
                <td>${item.id}</td>
                <td>${item.fullName}</td>
                <td>${item.department}</td>
                <td>${item.level}</td>
                <td><img src=${item.imageURL}</td>
                <td>${item.salary}</td>
            </tr>`;
    });
    result += `</table>`;
    TEl.innerHTML = result;
}


for (let employee of allData) {
    employee.calculateSalary();
   employee.render();
 }
 console.log(allData);

 

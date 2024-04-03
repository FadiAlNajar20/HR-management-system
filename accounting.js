'use strict';

let tableEl = document.getElementById('tableEl');
let footerEl = document.getElementById('footer');

function render() {
    let getDataFromLocalStorage = localStorage.getItem('employee');
    let dataInfo = JSON.parse(getDataFromLocalStorage);

    if (dataInfo === null || dataInfo.length === 0) {
        return;
    }

    let selectDepartment = [...new Set(dataInfo.map(employee => employee.department))];
    let totalEmployees = 0;
    let totalSalary = 0;

    for (let department of selectDepartment) {
        let tr = document.createElement('tr');

        let departmentName = document.createElement('td');
        departmentName.textContent = department;
        tr.appendChild(departmentName);

        let numberOfEmployee = document.createElement('td');
        let employeesCount = countDepartment(dataInfo, department);
        numberOfEmployee.textContent = employeesCount;
        tr.appendChild(numberOfEmployee);

        totalEmployees += employeesCount;

        let avg = document.createElement('td');
        let departmentAvgSalary = calculateAvgDepartment(dataInfo, department);
        avg.textContent = departmentAvgSalary;
        tr.appendChild(avg);

        let total = document.createElement('td');
        let departmentTotalSalary = calculateTotalSalary(dataInfo, department);
        total.textContent = departmentTotalSalary;
        tr.appendChild(total);

        totalSalary += departmentTotalSalary;

        tableEl.appendChild(tr);
    }

    let footerRow = document.createElement('tr');
    let td1 = document.createElement('td');
    footerRow.appendChild(td1);
    footerRow.style.backgroundColor = '#416D19';
    footerRow.style.color = 'white';
    
    let totalDepartment = document.createElement('td');
    totalDepartment.textContent = 'Total Employee';
    footerRow.appendChild(totalDepartment);

    let avgSalary = document.createElement('td');
    avgSalary.textContent = 'Avrage Salary';
    footerRow.appendChild(avgSalary);

    let allSalary = document.createElement('td');
    allSalary.textContent = 'Total Salary';
    footerRow.appendChild(allSalary);
    footerEl.appendChild(footerRow);

    let footerRow2 = document.createElement('tr');
    let td2 = document.createElement('td');
    footerRow2.appendChild(td2);

    let totalEmployeesCell = document.createElement('td');
    totalEmployeesCell.textContent = totalEmployees;
    footerRow2.appendChild(totalEmployeesCell);

    let totalSalaryCell = document.createElement('td');
    totalSalaryCell.textContent = totalSalary;
    footerRow2.appendChild(totalSalaryCell);

    let totalAvgCell = document.createElement('td');
    let totalAvgSalary = totalSalary / totalEmployees;
    totalAvgCell.textContent = Math.floor(totalAvgSalary);
    footerRow2.appendChild(totalAvgCell);
    footerEl.appendChild(footerRow2);

}

function countDepartment(data, department) {
    return data.filter(employee => employee.department === department).length;
}

function calculateAvgDepartment(data, department) {
    let departmentEmployees = data.filter(employee => employee.department === department);
    let totalSalary = departmentEmployees.reduce((sum, employee) => sum + employee.salary, 0);
    return Math.floor(totalSalary / departmentEmployees.length);
}

function calculateTotalSalary(data, department) {
    let departmentTotalSalary = data.filter(employee => employee.department === department)
        .reduce((sum, employee) => sum + employee.salary, 0);
    return Math.floor(departmentTotalSalary);
}

render();

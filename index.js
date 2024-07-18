// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(' ');

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });

  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(' ');

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(e => e.date === date);
  let timeOut = employee.timeOutEvents.find(e => e.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

const allWagesFor = function (employee) {
  const eligibleDates = employee.timeInEvents.map(e => e.date);

  const payable = eligibleDates.reduce((memo, d) => {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
};

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, record) => {
    return total + allWagesFor(record);
  }, 0);
}
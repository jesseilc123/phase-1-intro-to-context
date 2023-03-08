// Your code here
function createEmployeeRecord([firstName, familyName, title, rate]){
    let obj = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: rate,
        timeInEvents: [],
        timeOutEvents: []
    };
    return obj
};

function createEmployeeRecords(arrays){
    let newArr = arrays.map(createEmployeeRecord)
    return newArr
};


function createTimeInEvent(record, stamp){
    let timeInEventsContents = {
        type: "TimeIn",
        hour: parseInt(stamp.slice(11, 15)),
        date: stamp.slice(0, 10)
    };
    record.timeInEvents.push(timeInEventsContents);
    return record;
};

function createTimeOutEvent(record, stamp){
    let timeOutEventsContents = {
        type: "TimeOut",
        hour: parseInt(stamp.slice(11, 15)),
        date: stamp.slice(0, 10)
    };
    record.timeOutEvents.push(timeOutEventsContents);
    return record;
}

function hoursWorkedOnDate(record, date){
   const timeIn =  record.timeInEvents.filter(obj => obj.date === date);
   const timeOut = record.timeOutEvents.filter(obj => obj.date === date);

   let hoursworked = (parseInt(timeOut[0].hour) - parseInt(timeIn[0].hour)) / 100;
   return hoursworked;
}

function wagesEarnedOnDate(record, date){
    let hours = hoursWorkedOnDate(record, date);
    let rate = record.payPerHour;

    let totalPay = parseInt(hours * rate);
    return totalPay;
}

function allWagesFor(record){
    let money = [];
    for(let item of record.timeInEvents){
        money.push(wagesEarnedOnDate(record, item.date))
    };
    let total = money.reduce(function (acc, element){
        return element + acc
    });
    return total;
};

function calculatePayroll(record){
    let money = [];
    for(let element of record){
        for(let item of element.timeInEvents){
            money.push(wagesEarnedOnDate(element, item.date))
        };
    };
    let total = money.reduce(function (acc, element){
        return element + acc
    });
    return total;
};
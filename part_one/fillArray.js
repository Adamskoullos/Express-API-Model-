const fillArray = (rawData, currentWeek) => {
  // step 1: sort by week
  const sortedByWeek = rawData.sort((a, b) => {
    return a.week - b.week;
  });

  // step 2: add missing weeks
  const washedData = [];
  let activeWeek = 1;

  const washData = (activeWeek) => {
    if (activeWeek > currentWeek) {
      return;
    }
    let tempArr = [];
    sortedByWeek.forEach((period) => {
      if (period.week == activeWeek) {
        tempArr.push(period.hours);
      }
    });
    if (tempArr.length) {
      washedData.push(tempArr[0]);
    } else {
      washedData.push(0);
    }
    activeWeek++;
    washData(activeWeek);
  };

  washData(activeWeek);

  return washedData;
};

// Example simple test case
const source = [
  { week: 1, hours: 17 },
  { week: 3, hours: 44 },
  { week: 2, hours: 7 },
];

const result = fillArray(source, 3);
console.group("Set1");
console.log("result ==>", result);
console.log("target ==>", [17, 7, 44]);
console.groupEnd();

// Example more advanced test case
const source1 = [
  { week: 5, hours: 17 },
  { week: 3, hours: 44 },
  { week: 2, hours: 7 },
];

const result1 = fillArray(source1, 8);
console.group("Set2");
console.log("result ==>", result1);
console.log("target ==>", [0, 7, 44, 0, 17, 0, 0, 0]);
console.groupEnd();

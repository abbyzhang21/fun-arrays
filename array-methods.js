var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;
hundredThousandairs = dataset.bankBalances.filter(
  (element, index, array) => dataset.bankBalances[index].amount > 100000
);
/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;
datasetWithRoundedDollar = dataset.bankBalances.map(element => {
  return {
    amount: element.amount,
    state: element.state,
    rounded: Math.round(element.amount)
  };
});

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;

datasetWithRoundedDime = dataset.bankBalances.map(element => {
  return {
    amount: element.amount,
    state: element.state,
    roundedDime: Math.round(element.amount * 10) / 10
  };
});
// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;
var a = dataset.bankBalances.map(element => parseFloat(element.amount));
sumOfBankBalances = a.reduce(
  (previousVal, currentVal) =>
    Math.round((previousVal + currentVal) * 100) / 100
);
// console.log("sum:", sumOfBankBalances);
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;
// console.log("ex4:", dataset.bankBalances);
sumOfInterests = dataset.bankBalances
  .filter(elem => {
    return (
      elem.state === "WI" ||
      elem.state === "IL" ||
      elem.state === "WY" ||
      elem.state === "OH" ||
      elem.state === "GA" ||
      elem.state === "DE"
    );
  })
  .map(element => parseFloat(element.amount))
  .map(num => Math.round(num * 0.189 * 100) / 100)
  .reduce(
    (previousVal, currentVal) =>
      Math.round((previousVal + currentVal) * 100) / 100
  );

// console.log("test", sumOfInterests);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = null;
stateSums = {};
dataset.bankBalances.forEach(element => {
  if (!stateSums.hasOwnProperty(element.state)) {
    stateSums[element.state] = Number(element.amount);
  } else {
    stateSums[element.state] =
      Math.round((stateSums[element.state] + Number(element.amount)) * 100) /
      100;
  }
});
// console.log("stateSums:", stateSums);
/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;
let sumOfState = {};
let highInterest = [];
dataset.bankBalances
  .filter(elem => {
    return (
      elem.state !== "WI" &&
      elem.state !== "IL" &&
      elem.state !== "WY" &&
      elem.state !== "OH" &&
      elem.state !== "GA" &&
      elem.state !== "DE"
    );
  })
  .forEach(elem => {
    if (!sumOfState.hasOwnProperty(elem.state)) {
      sumOfState[elem.state] = Number(elem.amount);
    } else {
      sumOfState[elem.state] += Number(elem.amount);
    }
  });
let stateValue = Object.values(sumOfState);
stateValue.forEach(elem => {
  elem = Math.round(elem * 0.189 * 100) / 100;
  if (elem > 50000) {
    highInterest.push(elem);
  }
});
sumOfHighInterests = highInterest.reduce((pre, cur) => {
  return Math.round((pre + cur) * 100) / 100;
});
console.log("sumhightInterest:", sumOfHighInterests);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;
lowerSumStates = [];
Object.entries(stateSums)
  .filter(elem => elem[1] < 1000000)
  .forEach(elem => lowerSumStates.push(elem[0]));
console.log(lowerSumStates);
/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */

var higherStateSums = null;
let higherStateValue = [];
Object.entries(stateSums)
  .filter(elem => elem[1] > 1000000)
  .forEach(elem => higherStateValue.push(elem[1]));
higherStateSums = higherStateValue.reduce((pre, cur) => pre + cur);
console.log("test:", higherStateSums);
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;
areStatesInHigherStateSum = Object.entries(stateSums)
  .filter(elem => {
    return (
      elem[0] === "WI" ||
      elem[0] === "IL" ||
      elem[0] === "WY" ||
      elem[0] === "OH" ||
      elem[0] === "GA" ||
      elem[0] === "DE"
    );
  })
  .every(elem => elem[1] > 2550000);

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;
anyStatesInHigherStateSum = Object.entries(stateSums)
  .filter(elem => {
    return (
      elem[0] === "WI" ||
      elem[0] === "IL" ||
      elem[0] === "WY" ||
      elem[0] === "OH" ||
      elem[0] === "GA" ||
      elem[0] === "DE"
    );
  })
  .some(elem => elem[1] > 2550000);
console.log("last:", anyStatesInHigherStateSum);
module.exports = {
  hundredThousandairs: hundredThousandairs,
  datasetWithRoundedDollar: datasetWithRoundedDollar,
  datasetWithRoundedDime: datasetWithRoundedDime,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};

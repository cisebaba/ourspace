// FIGURING OUT THE LOGIC FOR RATINGS
// rating variable needs to == average of
// diversity, balance, parental_leave, flexibility

// get the numbers of diversity, balance,
// parental_leave, flexibility for EACH REVIEW
// calculate the average of those numbers
// those numbers will equal rating variable

// also need to get average of all reviews(avg rating)
// for EACH COMPANY

/// what i think this is doing is getting all of the values that match the
/// key and putting them into an array
function getValues(data, key) {
  let values = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].hasOwnProperty(key)) {
      values.push(data[i][key]);
    }
  }
  return values;
}

//generic average function - to be used for companies too
function Average(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i];
  }
  let average = sum / list.length;
  return average;
}

// Average for one REVIEW Key
function SingleKeyAverage(data, key) {
  let values = getValues(data, key);
  let average = AverageRating(values);
  return average;
}

// To-do:
//      -total average function
//      -figure out how to get our data
//      -figure out how to display on page
//      -finish reviews form
//      -figure out how to nest reviews list and form together

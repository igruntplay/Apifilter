// Definition API..
const endpoint = "http://localhost:3000/person?";

// DOM selection..
const form = document.getElementById("searchForm");
const nameInp = document.getElementById("name");
const ageInp = document.getElementById("minage");
const caseChk = document.getElementById("caseSensitive");
const partialChk = document.getElementById("partial");
const resultsContainer = document.getElementById("results");

// Eventhandler submit in the form which triggers the search..
form.addEventListener("submit", ev => {

  ev.preventDefault();

  // building the query string according to the filters found..
  let query = "";

  if (nameInp.value) query += `&name=${nameInp.value}`;
  if (ageInp.value) query += `&minage=${ageInp.value}`;
  if (caseChk.checked) query += `&case=true`;
  if (partialChk.checked) query += `&partial=true`;


  // here i reset the forms..
  form.reset();
  resultsContainer.innerHTML = "";

  // I make AJAX, 2nd parameter i use a CallBack..
  fetchData(endpoint + query, showResults);

})


// ajax with the url provided w a callback..
function fetchData(url, callback) {

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.addEventListener("load", function() {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      return callback(data);
    }
  });

  xhr.send();

}

// showersults function..
function showResults(data) {

  if (data.length == 0) {

    // if the array is empty notify..
    resultsContainer.innerText = "No records were found that meet the conditions.";
  
  } else {

    let resultsList = document.createElement("ul");

    data.forEach(person => {
      let li = document.createElement("li");
      li.innerText = `${person.name}, ${person.age}`;
      resultsList.append(li);
    });

    // show the ul..
    resultsContainer.append(resultsList);

  }

}

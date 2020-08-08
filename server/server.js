const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const root = path.join(__dirname, "../client/");

// Middleware static assets..
app.use(express.static(root));

// root endpoint..
app.get("/", (req, res) => {

  // render index html..
  res.status(200).sendFile(path.join(root, "index.html"));
});

// get endpoint person..
app.get("/person", (req, res) => {

  // I initialize the result with the complete list..
  // If there are no filters, it will be returned as is..
  // si no hay filtros se retorna asi nomas..
  let results = getPersonList();

  let isCaseSensitive = req.query.case === "true" ? true : false;
  let isPartialSearch = req.query.partial === "true" ? true : false;

  // If a filter name arrived, the result is performed and updated..
  if (req.query.name) {

    results = results.filter(person => {
        // case sensitive filtering..
      let personName = isCaseSensitive ? person.name : person.name.toUpperCase();
      let nameFilter = isCaseSensitive ? req.query.name : req.query.name.toUpperCase();

      // partial matching..
      if (isPartialSearch) return personName.includes(nameFilter);

      // else this other return..
      return personName === nameFilter;

    });

  }

  // age filtering and update results..
  if (req.query.minage) {

    results = results.filter(person => person.age > parseInt(req.query.minage));

  }

  //enviar la respuesta
  res.json(results);

});

app.listen(port, () => {

  console.log("Port listening.. " + port);
  
});



function getPersonList() {

  return [
    {
      name: "Jeanne",
      age: 1
    },
    {
      name: "John",
      age: 33
    },
    {
      name: "Fernando",
      age: 24
    },
    {
      name: "Fernanda",
      age: 42
    },
    {
      name: "Juana",
      age: 16
    },
    {
      name: "Lucía",
      age: 22
    },
    {
      name: "Alfred",
      age: 67
    },
    {
      name: "Gustavo",
      age: 50
    }
  ];

}


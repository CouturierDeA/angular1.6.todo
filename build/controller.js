const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const session = require('express-session');

module.exports = function (app) {

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'MY_SECRET'
  }));


  app.use(bodyParser.urlencoded({
    'extended': 'true'
  }));

  app.use(bodyParser.json());

  app.use(bodyParser.json({
    type: 'application/vnd.api+json'
  }));

  // // Controllers
  // if (process.env.NODE_ENV === 'demo') {
  //   app.get('*', (req, res) => {
  //     res.sendFile(path.join(__dirname + '/../dist/index.html'));
  //   });
  // }


  function getPersonsController(req, res) {
    const content = fs.readFileSync(path.join(__dirname + '/../data/persons.json'));
    const jsonContent = JSON.parse(content);
    res.json(jsonContent);
  }

  function hasId(files, uniqueId) {
    files.some(function (obj) {
      return obj.id == uniqueId;
    });
  }

  function createId(json, uniqueId) {
    const notUnique = hasId(json, !uniqueId || uniqueId === 0 ? 1 : uniqueId);
    if (notUnique) {
      console.log(`${id} allready exists`)
      createId(json, uniqueId++);
    }
    else {
      return uniqueId
    }
  }

  function putPersonController(req, res) {
    // const content = fs.readFileSync(path.join(__dirname + '/../data/persons.json'));

    let status = 200;

    let fileName = path.join(__dirname + '/../data/persons.json');
    let file = require(fileName);


    const item = req.body.person;

    if (!item) {
      return res.status(304).send(`req.body.person is required`);
    }
    const id = item.id;

    if (typeof id !== 'undefined' && id !== null) {
      let alreadyExist = false;
      file.map((u, i) => {
        if (id && (u.id == id)) {
          alreadyExist = u;
        }
      });

      if (alreadyExist) {

        const index = file.indexOf(alreadyExist);
        if (index !== -1) {
          file[index] = item

        } else {
          console.warn('Error: cant find already existing item')
          return res.status(304).send(`Error: cant find already existing item ${item}`);
        }

      }
    }
    else {

      const newId = createId(file, file.length + 1);
      item.id = newId;

      file.unshift(item);

      console.log(`new item with id ${newId}`);
    }

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function (error) {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    });
    return res.status(200).send(file);
  }

  function deletePersonController(req, res) {
    let status = 500;
    let message = 'Something went wrong...';

    const id = req.body.id;
    console.log('req.body', req.body);
    let fileName = path.join(__dirname + '/../data/persons.json');
    let file = require(fileName);

    let item = file.find(function (el) {
      return el.id == id;
    });

    if (typeof id === 'undefined' || id === null) {
      status = 304;
      message = `No item with id ${id}`;
      console.log(message);
      return res.status(status).send(message);

    } else {


      const index = file.indexOf(item);
      file.splice(index, 1);
      console.log('deleteTaskController index', index);

      fs.writeFile(fileName, JSON.stringify(file, null, 2), function (error) {
        if (error) {
          console.error(error);
          status = 500;
          message = error;
        }
      });
      status = 200;
      message = `Item deleted ${id}`;
    }

    return res.status(200).send(file);
  }

  app.get('/getPersons', getPersonsController);
  app.put('/putPerson', putPersonController);
  app.put('/deletePerson', deletePersonController);

};
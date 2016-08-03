var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});



app.delete('/items/:id', jsonParser, function(req, res) {
    var id = req.params.id;
    
    if (!req.body) {
        return res.sendStatus(404);
    }

    var item = storage.items[id];
    storage.items.splice(id, 1);
    res.status(200).json(item);
});

app.put('/items/:id', jsonParser, function(request, response) {
    var putID = parseInt(request.params.id);
    var putName = request.body.name;

// screens for requests with empty strings set for name
  if (putName !== "") {
    // loops through the items array and checks to see if there is an item for the requested id; if so, updates item name.
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id === putID) {
            storage.items[i].name = putName;
            return response.status(200).json(storage.items[i]);
        }
    }
    var item = storage.addByID(putName, putID);
    return response.status(201).json(item);
  }else {
    return response.sendStatus(400);
  }
});

app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;

var http = require('http');
var request = require('request');
var fs = require('fs');

var TRELLO_URL = "https://api.trello.com/1";

var getBoards = function(onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var TOKEN = JSON.parse(data).trello.token;
		var KEY = JSON.parse(data).trello.accesskey;
		var options = {
			url: TRELLO_URL + "/members/me/boards?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var getBoard = function(boardId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/boards/" + boardId + "?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var setWebhook = function(name, boardId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/tokens/" + TOKEN + "/webhooks/?key=" + KEY,
			method: 'POST',
			headers:{
				'Content-Type' : 'application/json'
			},
			json:{
				description: 'A new webhook',
				callbackURL: 'http://76.238.172.173/' + name,
				idModel: boardId
			}
		};
		request(options, function(error, response, body){
			console.log(body);
		});
	});
};

// Need get all cards in list
var getLists = function(boardId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/boards/" + boardId + "/lists/?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var getCardsInList = function(listId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/lists/"+listId+"/cards/?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var getChecklistByCard = function(cardId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/cards/"+cardId+"/checklists/?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var getCardsInBoard = function(boardId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/boards/"+boardId+"/cards/?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
}

var moveCardToList = function(cardId, listId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/cards/"+cardId+"/idList/?token=" + TOKEN + "&key=" + KEY,
			method: 'PUT',
			headers:{
				'Content-Type' : 'application/json'
			},
			json:{
				value: listId
			}
		};
		request(options, function(err, response, body){
			onComplete(body);
		});
	});
}

var checkCheckbox = function(cardId, checklistId, checkitemId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/cards/" + cardId + "/checklist/"+checklistId+"/checkItem/"+checkitemId+"/state/?key=" + KEY + "&token=" + TOKEN,
			method: 'PUT',
			headers:{
				'Content-Type' : 'application/json'
			},
			json:{
				value: 'complete'
			}
		};
		request(options, function(error, response, body){
			console.log(body);
		});
	});
}

var getChecklist = function(checklistId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/checklists/"+checklistId+"/?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
}

module.exports = {
	getBoards: getBoards,
	getBoard: getBoard,
	setWebhook: setWebhook,
	getLists: getLists,
	getCardsInList: getCardsInList,
	getChecklistByCard: getChecklistByCard,
	getCardsInBoard: getCardsInBoard,
	moveCardToList: moveCardToList,
	checkCheckbox: checkCheckbox,
	getChecklist: getChecklist
}
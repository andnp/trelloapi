var trelloapi = require('../API/trelloapi/trelloapi');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var getCardsInList = function(boardName, listName, onComplete){
	var boardId, listId;
	trelloapi.getBoards(function(boards){
		for(var i = 0; i < boards.length; i++){
			 var board = boards[i];
			 if(board.name === boardName){
			 	boardId = board.id;
			 	break;
			 }
		}
		trelloapi.getLists(boardId, function(lists){
			for(var i = 0; i < lists.length; i++){
				var list = lists[i];
				if(list.name === listName){
					listId = list.id;
					break;
				}
			}
			trelloapi.getCardsInList(listId, onComplete);
		});
	});
};

var moveCardToList = function(cardId, listName, boardName, onComplete){
	var boardId, listId;
	trelloapi.getBoards(function(boards){
		for(var i = 0; i < boards.length; i++){
			 var board = boards[i];
			 if(board.name === boardName){
			 	boardId = board.id;
			 	break;
			 }
		}
		trelloapi.getLists(boardId, function(lists){
			for(var i = 0; i < lists.length; i++){
				var list = lists[i];
				if(list.name === listName){
					listId = list.id;
					break;
				}
			}
			trelloapi.moveCardToList(cardId, listId, onComplete);
		});
	});
};

module.exports = {
	getCardsInList : getCardsInList,
	moveCardToList: moveCardToList
}
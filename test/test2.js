'use strict';
var Parser = require('web-htmlparser');
var parse = function($){
	var isFirst = true;
	var table = $('#tblreslist>tr').map(function() {
		// $(this) is used more than once; cache it for performance.
		var $row = $(this);			
		if(isFirst){
			isFirst = false;
			return null;
		}
		if($row.children().length < 11) return null;
		// For each row that's "mapped", return an object that
		//  describes the first and second <td> in the row.
		return {
			symbol: $row.find(':nth-child(4)').text().replace(/\(.+\)/g,"").replace(" ",""),
			miRNA: $row.find(':nth-child(5)').text(),
			score: $row.find(':nth-child(7)').text()
		};
	}).get();
	Parser.printTable(table);
	return table;
};
Parser.craw('test.html',parse);

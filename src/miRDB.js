'use strict';
var Parser = require('web-htmlparser');
var mirnaUtils = require('./utils/mirna');
var organismUtils = require('./utils/organism');
module.exports = function(mol, org, molType){
	org = org || "Human";
	molType = molType || "miRNA";
	org = organismUtils.format(org);
	if(molType === "miRNA") mol = mirnaUtils.format(mol, org);
		
	var key = org.abbr+".miRNA_target.miRDB";
	var parse = function($){
		var table = $('#table1 tr[bgcolor!="#CCFFFF"]').map(function() {
			// $(this) is used more than once; cache it for performance.
			var $row = $(this);			
			// For each row that's "mapped", return an object that
			//  describes the first and second <td> in the row.
			return {
				symbol: $row.find(':nth-child(5)').text(),
				miRNA: $row.find(':nth-child(4)').text(),
				score: $row.find(':nth-child(3)').text()
			};
		}).get();
		return table;
	};

	Parser.crawPostFormData("http://mirdb.org/cgi-bin/search.cgi", {
		species:org.word,
		searchBox: mol,
		searchType: molType
	}, parse, key);

};

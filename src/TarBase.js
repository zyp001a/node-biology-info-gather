'use strict';
var Parser = require('web-htmlparser');
var mirnaUtils = require('./utils/mirna');
var organismUtils = require('./utils/organism');
module.exports = function(mol, org, molType){
	org = org || "Human";
	molType = molType || "miRNA";
	org = organismUtils.format(org);
	if(molType === "miRNA") mol = mirnaUtils.format(mol, org);
		
	var key = org.abbr+".miRNA_target."+mol+"miRDB";
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
		return table;
	};
	Parser.craw("http://diana.imis.athena-innovation.gr/DianaTools/index.php?r=tarbase/index&mirnas="+mol, parse, key);

};

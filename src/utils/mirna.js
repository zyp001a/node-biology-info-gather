module.exports.format = function(mol, org){
	if(mol.substring(0,3) != org.abbr) mol = org.abbr+"-"+mol;
	var type = mol.substring(4,7);
	if(type != 'let' && type != 'miR'){
		console.log("Wrong miRNA name: " + mol );
		process.exit(0);
	}
	return mol;
};

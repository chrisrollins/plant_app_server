
//not tested yet
const disallowed = `[]{}()-=+;:.,'"!&?/\\`;
const sanitize = function(queryString){
	let result = "";
	let skip = false;
	const warnings = [];
	for(let char of queryString){
		for(let dis of disallowed){
			if(char === dis){
				skip = true;
				warnings.push(char);
				break;
			}
		}
		console.log(skip);
		if(!skip)
			result += char;
		skip = false;
	}

	return {query: result, warnings: warnings};
};

module.exports = sanitize;
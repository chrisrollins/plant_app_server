
//not tested yet
module.exports = function(queryString){
	for(let i = 0; i < queryString.length; i++){
		const charCode = queryString.charCodeAt(0);
		if( (charCode > 57 && charCode < 64) || charCode === 34 || charCode === 51 || charCode === 52){
			return false;
		}
	}

	return true;
}
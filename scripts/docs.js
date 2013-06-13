//js tablefilter/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('tablefilter/tablefilter.html', {
		markdown : ['tablefilter']
	});
});
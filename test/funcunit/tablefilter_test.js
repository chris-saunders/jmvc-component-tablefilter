steal("funcunit", function(){
	module("tablefilter test", { 
		setup: function(){
			S.open("//tablefilter/tablefilter.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})
// load('tablefilter/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("tablefilter/tablefilter.html","tablefilter/out")
});

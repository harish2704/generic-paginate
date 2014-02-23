var paginate = function( args ){
    var count = args.count;
    var resultsPerPage = args.size;
    var pageNumber = args.page || 1;
    var listLength = args.listLength || 3;

    var range = {};
    var carry = 0;
    var pageCount = Math.ceil(count / resultsPerPage);
    var start = pageNumber - listLength ;
    if (start < 1 ){
        start = 1;
        carry = listLength - pageNumber + 1;
    }
    var end =  (pageNumber + listLength  + carry);
    if (end > pageCount  ){
        carry = pageNumber + listLength  - pageCount;
        end = pageCount;
        start = (start - carry ) < 1 ? 1 : (start - carry);
    }
    for (var i = start; i <= end ; i++) {
        range[i] = "paginator";
    }
    range[pageNumber] = "paginator" + " disabled";
    var out = {};
    out.page = pageNumber;
    out.range = range;
    out.total = pageCount; 
    out.start = ( (pageNumber-1)*resultsPerPage ) + 1 
    return out;
}
module.exports = paginate;

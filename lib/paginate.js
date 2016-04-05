var Paginator = function( options ){
    options = options || {};
    options.defaults = options.defaults || {};
    this.activeClass = options.activeClass || 'active';
    this.inactiveClass = options.inactiveClass || '';
    this.defaults = {};
    this.defaults.listLength = options.defaults.listLength || 2;
    this.defaults.size = options.defaults.size || 10;
};

Paginator.prototype.paginate = function( args ){
    var count = args.count;
    var resultsPerPage = args.size || this.defaults.size;
    var pageNumber = parseInt( args.page,10) || 1;
    var listLength = args.listLength || this.defaults.listLength;

    var range = {};
    var carry = 0, i;
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
    for ( i = start; i <= end ; i++) {
        range[i] = this.inactiveClass;
    }
    range[pageNumber] = this.activeClass;
    var out = {};
    out.next = pageNumber < pageCount ? pageNumber + 1 : null;
    out.prev = pageNumber > 1 ? pageNumber - 1 : null;
    out.page = pageNumber;
    out.range = range;
    out.total = pageCount;
    out.size = resultsPerPage;
    out.start = ( (pageNumber-1)*resultsPerPage ) + 1 ;
    return out;
};

module.exports = function( args ){
    return new Paginator( args );
};


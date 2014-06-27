Generic-paginate
================

A simple Javascript class for calculating pagination data that can be easily used in template file.

Usage
-----

Usage in controller
```js
var options = {
    activeClass: 'active',
    inactiveClass: '',
    defaults: {
        size: 2,        // Result per page
        listLength: 2,  // Length pagination Result.
        // eg:  listLength = 2; ==>  <<  5, 6, 7, 8, 9  >>
        //      listLength = 1; ==>  <<  6, 7, 8  >>
    }
};
var Paginator = require('generic-paginate');
var paginator = Paginator( options );
return Mango.count( conditions, function( err, count ){
    var paginationParams = {};
    paginationParams.count = count;
    paginationParams.page = req.query.page;     // Page number
    paginationParams.size = req.query.size;     // Result per page
    var pagination = paginator.paginate( paginationParams );
    return Mango.find(conditions)
    .sort( sort )
    .skip(pagination.start-1)
    .limit ( pagination.size )
    .exec(function( err, mangoes ){
        var data = {
            mangoes: mangoes,
        pagination: pagination
        };
        return res.render('mangoes/index', data );
    });
});

/*
 * pagination = {
 *     page: 6,
 *     range: { '3': '', '4': '', '5': '', '6': 'active', '7': '' },
 *     total: 7,
 *     size: 2,
 *     start: 11
 * };
 */

```

and the template for Ect.Js is 
```html
<ul class="pagination">
    <li><a href="/mangoes?page=1">&laquo;</a></li>
    <% for page, className of @pagination.range : %>
    <li class="<%= className %>"><a href="/mangoes?page=<%= page %>"><%= page %></a></li>
    <% end %>
    <li><a href="/mangoes?page=<%= @pagination.total %>">&raquo;</a></li>
</ul>
```
## Class Paginator ## 

### Initialization ###
```js
var paginator = Paginator( options )
```
### @arg options ###
* Type: Object
* Structure:
    * ```activeClass```     : class name used for current page
    * ```inactiveClass```   : class name used for all other pages
    * ```defaults```        : Object. Used as default vule for instance.paginate function.
        * ```size```        : Results per page. Default=10
        * ```listLength```  : number of pages listed in both sides of centre item Default=2

## Methods ##

### paginate ###
calculate pagination data.

#### Usage ####
```js
var pagination = paginator.paginate( options );
```

#### @arg options ####
* options   : Structure
    * ```count```       : Total number of items.
    * ```page```        : current page. Default = 1
    * ```size```        : overides Initialization param defaults.size
    * ```listLength```  : overides Initialization param defaults.listLength

#### returns ####
* Type: Object
    * ```page```  : current page
    * ```range``` : a map of pagenumer to its className.
    * ```total``` : total number of pages
    * ```size```  : Result per pages.
    * ```start``` : starting number of results


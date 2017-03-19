# generic-paginate

A simple Javascript function for calculating pagination data which can be easily integrated into any view-layer

## Usage
```
npm i generic-paginate -S
```
this module exports a single function called `paginate`

#### paginate(total, skip, limit, opts) ⇒ paginationData
Calculate pagination data using given params

##### Arguments
| Param | Type | Default | Description |
| --- | --- | --- | --- |
| total | <code>Number</code> |  | Total number of records |
| skip | <code>Number</code> |  | Number of records to be skiped. AKA offset |
| [limit] | <code>Number</code> | <code>10</code> | Number of items per page |
| [opts] | <code>Object</code> | <code>{}</code> | additional options |
| [opts.buttonCount] | <code>Number</code> | <code>5</code> | length of pagination button list.  <b>Eg:</b>  <ul>    <li>      < 2, *3*, 4, >  -> Means buttonCount=3    </li>    <li>      < 2, *3*, 4, 5, 6 >  -> Means buttonCount=5    </li>    <li>      < 2, *3*, 4, 5, 6, 7, 9 >  -> Means buttonCount=7    </li>  </ul> |
| [opts.activeClass] | <code>string</code> | <code>&quot;active&quot;</code> | HTML class attribute to be applied for button other than current page button |
| [opts.inactiveClass] | <code>string</code> | <code>&quot;inactive&quot;</code> | HTML class attribute to be applied for current page button |


##### Properties of output paginationData
| Name | Type | Description |
| --- | --- | --- |
| next | <code>Number</code> \| <code>undefined</code> | next page number. `undefined` if there is no next page |
| prev | <code>Number</code> \| <code>undefined</code> | previous page number. `undefined` if there is no previous page |
| currentPage | <code>Number</code> | current page number |
| totalPages | <code>Number</code> | total number of pages |
| totalItems | <code>Number</code> | total number of items |
| limit | <code>Number</code> | items per page. copied from argument |
| skip | <code>Number</code> | no of skipped records. copied from argument |
| buttons | <code>Array.&lt;Object&gt;</code> | array of buttons in the pagination list |
| buttons[].page | <code>Number</code> | page number of button |
| buttons[].class | <code>string</code> | html class of button.<br> current page will have `opts.inactiveClass` and all others will have `opts.activeClass` |


### Example ( Nodejs )

```javascript
var Paginate = require('generic-paginate');

// 37 total items,
// 10 items/page,
// skipping first 20 => current page is 3

var paginationData = Paginate( 37, 20, 10 );
console.log( paginationData );

/*
Output will be
{ next: 4,
  prev: 2,
  currentPage: 3,
  buttons:
   [ { page: 1, class: 'inactive' },
     { page: 2, class: 'inactive' },
     { page: 3, class: 'active' },
     { page: 4, class: 'inactive' } ],
  totalPages: 4,
  totalItems: 37,
  limit: 10,
  skip: 20 }
*/
```

### Example ( Browser )

```html
<script src="https://unpkg.com/generic-paginate" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
  var pagintionData = GenericPaginate( 37, 20, 10 );
  console.log( pagintionData );
  /*
  Output will be
  { next: 4,
    prev: 2,
    currentPage: 3,
    buttons:
     [ { page: 1, class: 'inactive' },
       { page: 2, class: 'inactive' },
       { page: 3, class: 'active' },
       { page: 4, class: 'inactive' } ],
    totalPages: 4,
    totalItems: 37,
    limit: 10,
    skip: 20 }
  */
</script>
```

##### A sample AngularJs tempalte will be like this

```html
<ul class="pagination">
    <li ng-enable="pagination.prev" >
      <a href="/mangoes?page={{ pagination.prev }}">&laquo;</a>
    </li>
    <li ng-repeat="button in pagination.buttons" ng-class="{{ button.class }}">
      <a href="/mangoes?page={{ button.page }}">{{ button.page }}</a>
    </li>
    <li ng-enable="pagination.next">
      <a href="/mangoes?page={{ pagination.next }}">&raquo;</a>
    </li>
</ul>
<span>Showing page: {{ pagination.currentPage}}/{{pagination.totalPages}} </span>
<span>Total items: {{ pagination.totalItems}}</span>
```


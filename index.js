'use strict';
/**
 * @typedef {Object} PaginationData
 * @property {( Number|undefined )} next - next page number. `undefined` if there is no next page
 * @property {( Number|undefined )} prev - previous page number. `undefined` if there is no previous page
 * @property {Number} currentPage - current page number
 * @property {Number} totalPages - total number of pages
 * @property {Number} totalItems - total number of items
 * @property {Number} limit - items per page. copied from argument
 * @property {Number} skip - no of skipped records. copied from argument
 * @property {Array<Object>} buttons - array of buttons in the pagination list
 * @property {Number} buttons[].page - page number of button
 * @property {string} buttons[].class - html class of button.<br> current page will have `opts.inactiveClass` and all others will have `opts.activeClass`
 */

/**
 * Calculate pagination data using given params
 *
 * @param {Number} total - Total number of records
 * @param {Number} skip - Number of records to be skiped. AKA offset
 * @param {Number} [ limit=10 ] - Number of items per page
 * @param {Object} [ opts={} ] - additional options
 * @param {Number} [ opts.buttonCount=5 ] - length of pagination button list.
 <b>Eg:</b>
 <ul>
   <li>
     < 2, *3*, 4, >  -> Means buttonCount=3
   </li>
   <li>
     < 2, *3*, 4, 5, 6 >  -> Means buttonCount=5
   </li>
   <li>
     < 2, *3*, 4, 5, 6, 7, 9 >  -> Means buttonCount=7
   </li>
 </ul>
 * @param {string} [ opts.activeClass=active ] - HTML class attribute to be applied for button other than current page button
 * @param {string} [ opts.inactiveClass=inactive ] - HTML class attribute to be applied for current page button
 * @returns {PaginationData}
 */
function paginate( total, skip, limit, opts ){

  var pageNumber,
    buttonCount,
    activeClass,
    inactiveClass,
    buttons = [],
    carry = 0,
    pageCount ,
    start,
    end,
    i;

  total = parseInt(total);
  skip = parseInt(skip);
  limit = parseInt(limit) || 10;
  opts = opts || {};
  buttonCount = opts.buttonCount || 5;
  activeClass = opts.activeClass || 'active';
  inactiveClass = opts.activeClass || 'inactive';

  pageNumber = Math.floor( skip/limit )+1;
  buttonCount = Math.floor( buttonCount/2 );
  pageCount = Math.ceil( total/limit );
  start = pageNumber - buttonCount;

  if ( start < 1 ){
    start = 1;
    carry = buttonCount - pageNumber + 1;
  }

  end = ( pageNumber + buttonCount  + carry );

  if ( end > pageCount  ){
    carry = pageNumber + buttonCount - pageCount;
    end = pageCount;
    start = ( start - carry ) < 1 ? 1 : ( start - carry );
  }

  for ( i=start; i <= end ; i++) {
    buttons.push({
      page: i,
      class: i === pageNumber? activeClass : inactiveClass,
    });
  }

  return {
    next : ( pageNumber < pageCount ? pageNumber + 1 : null ),
    prev : ( pageNumber > 1 ? pageNumber - 1 : null ),
    currentPage : pageNumber,
    buttons : buttons,
    totalPages : pageCount,
    totalItems : total,
    limit : limit,
    skip : skip,
  };
}

module.exports = paginate;

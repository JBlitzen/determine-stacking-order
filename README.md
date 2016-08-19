# determine-stacking-order
Javascript class to determine vertical stacking order of elements on a document.

Stacking order is similar to, but distinct from, the z-index CSS property of an element.  Stacking order is the actual Z order that all elements on the page are painted in, so the background of the body element should have the lowest value if any, and the topmost visible element should have the highest.  This painting order is influenced by z-index properties but not directly correlated to them.

***CURRENTLY REQUIRES JQUERY*** for .offset() and removeAttribute(), but you can replace these with vanillaJS if you like.  Wrote the thing in three hours.


USAGE
-----

    class_stacking_order.process_dom(root_document, root_node);

I don't default those parameters.  If you want to run on the body of a normal document, try:

    var root_node = document.getElementsByTagName("body")[0];
    var root_document = document;
    class_stacking_order.process_dom(root_document, root_node);


RETURN VALUE
------------

A result message which is also sent to console.log if available.


RESULT
------

The stacking order for each element will appear in a "data-stacking-order" attribute on that element.  You can modify the code to change or add to that behavior.  The stacking order values are not necessarily sequential, and do not necessarily begin or end at clear numbers, but they are properly ordered.  So the sequence may go "6, 8, 9, 10, 21", but 6 will be the lowest element and 21 the highest.


METHOD
------

At the suggestion of user the8472 on http://stackoverflow.com/questions/39005080/determine-effective-z-index-vertical-stack-position-of-each-element-in-the-dom, the code traverses and transforms every element under root_node such that it's positioned at coordinate (1, 1).  It also removes any top left border radius as it goes.  And it changes block display elements to inline-block to enable transform.  All three changes saved to data attributes on the element for later reset.

Then it loops "document.elementFromPoint(1,1)" calls, returning the topmost stacked element each time, down to the root_node specified, deiterating a counter as it goes and assigning that counter to the data-stacking-order attribute.  The element is then transformed to coordinate (10000, 10000) to get it out of the way.

Once all elements have been processed or a guard counter has been hit, the code traverses the elements again, resets their transform, display, and top left radius properties to their original settings, removes the utility attributes that were added in the process, and returns a simple report of what it did.



This has been tested on somewhat complex pages, but it stands to reason something will break it.  Please test carefully on any page you intend to use it on.

For more reading on how stacking order works in CSS, take a look at these two links:

https://www.w3.org/TR/CSS21/zindex.html
http://vanseodesign.com/css/css-stack-z-index/

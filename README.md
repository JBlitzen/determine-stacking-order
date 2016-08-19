# determine-stacking-order
Javascript class to determine vertical stacking order of elements on a document.  This is distinct from but similar to the z-index CSS properties of each element.  Stacking order is the actual Z order that all elements on the page are painted in, so the background of the <body> element should have the lowest value, if any, and the topmost visible element should have the highest.

To execute, call:

    class_stacking_order.process_dom(root_document, root_node);

I don't default those parameters.  If you want to run on the body of a normal document, try:

    var root_node = document.getElementsByTagName("body")[0];
    var root_document = document;
    class_stacking_order.process_dom(root_document, root_node);

A document parameter was necessary as I used the library within an iframe, and it relies on "document.elementFromPoint" and thus is document-specific.

Returns a result message and shows it in console.

The stacking order for each element will appear in a "data-stacking-order" attribute on that element.  You can modify the code to add a class as well to make them easily found if desired.

This has been tested on somewhat complex pages, but it stands to reason something will break it.  Please test carefully on any page you intend to use it on.

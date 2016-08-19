/*
MIT License

Copyright (c) 2016 Jeffrey Richman, Github "JBlitzen", http://www.jcrichman.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var class_stacking_order = {
	stacking_order: 0,
	stacking_order_elem_count: 0,
	root_document: null,
	root_node: null,
	process_dom: function(root_document, root_node) {
		class_stacking_order.root_node = root_node;
		class_stacking_order.root_document = root_document;
		class_stacking_order.stacking_order_init_function(root_node, false, 1);
		class_stacking_order.stacking_order = class_stacking_order.stacking_order_elem_count;
		class_stacking_order.stacking_order_scan_all_elements();
		class_stacking_order.stacking_order_init_function(root_node, true, 1);

		var result_message = "Processed " + class_stacking_order.stacking_order_elem_count + " elements, results are in 'data-stacking-order' attributes.";
		if (console && console.log)
		{
			console.log(result_message);
		}
		return result_message;
	},
	stacking_order_init_function: function(node, reset, depth) {
		var children = node.childNodes;
		var child_it = 0;
		for (child_it = 0; child_it < children.length; child_it++)
		{
			var child_raw = children[child_it];
			var child = $(child_raw);
			if (child_raw.nodeType == 1)
			{
				if (!reset)
				{
					var pos = child.offset();

					child.attr("data-stacking-order-element", "1");

					var old_transform = "" + child.css("transform").trim();
					if (old_transform == "") old_transform == "none";
					child.attr("data-stacking-order-transform", old_transform).css("transform", "none").css("-ms-transform", "none").css("-webkit-transform", "none");

					var old_topleftradius = "" + child_raw.style.borderTopLeftRadius.trim();
					if (old_topleftradius == "") old_topleftradius == "0px";
					child.attr("data-stacking-order-topleftradius", old_topleftradius).css("border-top-left-radius", "0px");

					var old_display = "" + child_raw.style.display.trim();
					if (old_display == "block")
					{
						child.attr("data-stacking-order-display", "block").css("display", "inline-block");
					}
					else
					{
						child.attr("data-stacking-order-display", "");
					}

					class_stacking_order.stacking_order_elem_count++;
					var new_transform = "translate(" + (1 - pos.left) + "px, " + (1 - pos.top) + "px)";
					child.css("transform", new_transform);
				}
				else
				{
					var old_transform = "" + child.attr("data-stacking-order-transform");
					var old_topleftradius = "" + child.attr("data-stacking-order-topleftradius");
					child.css("transform", old_transform).css("-ms-transform", old_transform).css("-webkit-transform", old_transform).css("border-top-left-radius", old_topleftradius);

					child.removeAttr("data-stacking-order-element").removeAttr("data-stacking-order-transform").removeAttr("data-stacking-order-topleftradius")

					var old_display = "" + child.attr("data-stacking-order-display");
					if (old_display == "block")
					{
						child.css("display", "block");
					}
					child.removeAttr("data-stacking-order-display");
				}
			}
		}
		for (child_it = 0; child_it < children.length; child_it++)
		{
			var child = children[child_it];
			if (child.nodeType == 1)
			{
				var child_tag = child.tagName.toLowerCase();
				if (child_tag != "svg")
				{
					class_stacking_order.stacking_order_init_function(child, reset, depth + 1);
				}
			}
		}
	},
	stacking_order_scan_all_elements: function() {
		var elem = class_stacking_order.root_document.elementFromPoint(1, 1);
		while (
			elem
			&& (class_stacking_order.stacking_order >= 0)
			&& (elem != class_stacking_order.root_node)
			&& (elem.tagName.toLowerCase() != "body")
		)
		{
			while (
				elem
				&& (elem != class_stacking_order.root_node)
				&& (elem.tagName.toLowerCase() != "body")
				&& (("" + elem.getAttribute("data-stacking-order-element")) != "1")
			)
			{
				elem = elem.parentNode;
			}
			if (
				elem
				&& (elem != class_stacking_order.root_node)
				&& (elem.tagName.toLowerCase() != "body")
			)
		 	{
				elem.setAttribute("data-stacking-order", class_stacking_order.stacking_order);
				elem.style.transform = "translate(30000px, 3000px)";
				class_stacking_order.stacking_order--;
			}
			elem = class_stacking_order.root_document.elementFromPoint(1, 1);
		}
	}
};

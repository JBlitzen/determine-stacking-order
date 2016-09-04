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
	root_node_align: null,
	root_node_padding_top: null,
	root_node_padding_left: null,
	root_node_margin_top: null,
	root_node_margin_left: null,
	root_node_border_width_top: null,
	root_node_border_width_left: null,
	tags_to_not_enter: [
		"embed",
		"iframe",
		"video",
		"canvas",
		"object",
		"applet",
		"audio",
		"area",
		"frameset",
		"frame",
		"map",
		"area",
		"marquee",
		"meter",
		"progress",
		"svg"
	],
	process_dom: function(root_document, root_node) {
		class_stacking_order.root_node_init(false);
		class_stacking_order.root_node = root_node;
		class_stacking_order.root_document = root_document;
		class_stacking_order.stacking_order_init_function(root_node, false, 1);
		class_stacking_order.stacking_order = class_stacking_order.stacking_order_elem_count;
		class_stacking_order.stacking_order_scan_all_elements();
		class_stacking_order.stacking_order_init_function(root_node, true, 1);
		class_stacking_order.root_node_init(true);

		var result_message = "Processed " + class_stacking_order.stacking_order_elem_count + " elements, results are in 'data-stacking-order' attributes.";
		if (console && console.log)
		{
			console.log(result_message);
		}
		return result_message;
	},
	root_node_init: function(reset) {
		var root_element = $(class_import_html.root_node);
		if (!reset)
		{
			class_import_html.root_node_align = root_element.css("text-align");
			class_import_html.root_node_padding_top = root_element.css("padding-top");
			class_import_html.root_node_padding_left = root_element.css("padding-left");
			class_import_html.root_node_margin_top = root_element.css("margin-top");
			class_import_html.root_node_margin_left = root_element.css("margin-left");
			class_import_html.root_node_border_width_top = "" + root_element.css("border-top-width");
			class_import_html.root_node_border_width_left = "" + root_element.css("border-left-width");
			root_element
				.css("text-align", "left")
				.css("padding-top", "0px")
				.css("padding-left", "0px")
				.css("margin-top", "0px")
				.css("margin-left", "0px")
				.css("border-top-width", "0px")
				.css("border-left-width", "0px");
		}
		else
		{
			root_element
				.css("text-align", class_import_html.root_node_align)
				.css("padding-top", class_import_html.root_node_padding_top)
				.css("padding-left", class_import_html.root_node_padding_left)
				.css("margin-top", class_import_html.root_node_margin_top)
				.css("margin-left", class_import_html.root_node_margin_left)
				.css("border-top-width", class_import_html.root_node_border_width_top)
				.css("border-left-width", class_import_html.root_node_border_width_left);
		}
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
					child.attr("data-stacking-order-element", "1");

					var old_transform = "" + child.css("transform").trim();
					if (old_transform == "") old_transform == "";
					child.attr("data-stacking-order-transform", old_transform).css("transform", "").css("-ms-transform", "").css("-webkit-transform", "");

					var old_topleftradius = "" + child_raw.style.borderTopLeftRadius.trim();
					if (old_topleftradius == "") old_topleftradius == "0px";
					child.attr("data-stacking-order-topleftradius", old_topleftradius).css("border-top-left-radius", "0px");

					var old_display = "" + child_raw.style.display.trim();
					var tag_name = child_raw.tagName.toLowerCase();
					if (
						(
							(old_display == "block")
							|| (old_display == "flex")
							|| (old_display == "table")
						)
						|| (
							(
								(old_display == "")
								|| (old_display == "initial")
							)
							&& (
								(tag_name == "address")
								|| (tag_name == "article")
								|| (tag_name == "aside")
								|| (tag_name == "blockquote")
								|| (tag_name == "canvas")
								|| (tag_name == "dd")
								|| (tag_name == "div")
								|| (tag_name == "dl")
								|| (tag_name == "fieldset")
								|| (tag_name == "figcaption")
								|| (tag_name == "figure")
								|| (tag_name == "footer")
								|| (tag_name == "form")
								|| (tag_name == "h1")
								|| (tag_name == "h2")
								|| (tag_name == "h3")
								|| (tag_name == "h4")
								|| (tag_name == "h5")
								|| (tag_name == "h6")
								|| (tag_name == "header")
								|| (tag_name == "hgroup")
								|| (tag_name == "hr")
								|| (tag_name == "li")
								|| (tag_name == "main")
								|| (tag_name == "nav")
								|| (tag_name == "noscript")
								|| (tag_name == "ol")
								|| (tag_name == "output")
								|| (tag_name == "p")
								|| (tag_name == "pre")
								|| (tag_name == "section")
								|| (tag_name == "table")
								|| (tag_name == "tbody")
								|| (tag_name == "thead")
								|| (tag_name == "td")
								|| (tag_name == "tr")
								|| (tag_name == "tfoot")
								|| (tag_name == "ul")
								|| (tag_name == "video")
							)
						)
					)
					{
						child.attr("data-stacking-order-display", old_display).css("display", "inline-block");
						child.attr("data-stacking-order-block", "1");

						var old_position = child.css("position");
						child.attr("data-stacking-order-position", old_position).css("position", "absolute");

						var old_top = child.css("top");
						child.attr("data-stacking-order-top", old_top).css("top", "0px");

						var old_left = child.css("left");
						child.attr("data-stacking-order-left", old_left).css("left", "0px");
					}
					else
					{
						child.attr("data-stacking-order-display", "");
					}

					class_stacking_order.stacking_order_elem_count++;
					var pos = child.offset();
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
					var old_block = "" + child.attr("data-stacking-order-block");
					if ((old_display == "block") || (old_block == "1"))
					{
						child.css("display", old_display);
						if (old_block == "1")
						{
							var old_position = child.attr("data-stacking-order-position");
							child.css("position", old_position);

							var old_top = child.attr("data-stacking-order-top");
							child.css("top", old_top);

							var old_left = child.attr("data-stacking-order-left");
							child.css("left", old_left);

							child.removeAttr("data-stacking-order-position").removeAttr("data-stacking-order-top").removeAttr("data-stacking-order-left");
						}
					}
					child.removeAttr("data-stacking-order-display").removeAttr("data-stacking-order-block");
				}
			}
		}
		for (child_it = 0; child_it < children.length; child_it++)
		{
			var child = children[child_it];
			if (child.nodeType == 1)
			{
				var child_tag = child.tagName.toLowerCase();
				var child_display = child.style.display;
				if (
					!(
						(child_tag == "svg")
						|| ($.inArray(child_tag, class_stacking_order.tags_to_not_enter) > -1)
					)
				)
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

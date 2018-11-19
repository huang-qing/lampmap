/*!
 * lampmap v1.0.0 - jQuery plug 
 *
 * Includes jquery.js
 * Includes Snap.js
 * 
 * Copyright © 2018-2019 huangqing
 * Released under the MIT license
 *
 * Date: 2018-11-14
 */

/* global jQuery Snap */

(function ($, Snap, window, console) {
    function LampMap(options) {
        var _options = {
            container: null,
            data: [],
            config: {
                classAttr: {
                    '-webkit-touch-callout': 'none',
                    '-webkit-user-select': 'none',
                    '-khtml-user-select': 'none',
                    '-moz-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none'
                },
                offset: {
                    x: 80,
                    y: 80
                },
                node: {
                    default: {
                        stroke: '#1E1E1E',
                        strokeWidth: 3,
                        fill: '#ADADAD',
                        r: 14
                    },
                    normal: {
                        fill: '#2ED756'
                    },
                    alert: {
                        fill: '#F5DE19',
                        light: true
                    },
                    delay: {
                        fill: '#ED3E3E',
                        light: true
                    },
                    delayFinished: {
                        fill: '#333333'
                    },
                    normalFinished: {
                        fill: '#ADADAD'
                    },
                    open: {
                        'stroke-dasharray': 0
                    },
                    close: {
                        'stroke-dasharray': [8, 2]
                    }
                },
                text: {
                    default: {
                        fill: '#1E1E1E',
                        'text-anchor': 'middle',
                        'font-size': 12
                    },
                    normal: {
                        fill: '#1E1E1E'
                    },
                    alert: {
                        fill: '#1E1E1E'
                    },
                    delay: {
                        fill: '#1E1E1E'
                    },
                    delayFinished: {
                        fill: '#FFFFFF'
                    },
                    normalFinished: {
                        fill: '#1E1E1E'
                    }
                },
                line: {
                    default: {
                        stroke: '#1E1E1E',
                        'stroke-width': 2,
                        fill: 'none',
                        'marker-end': 'url(#arrow)'
                    }
                },
                arrow: {
                    default: {
                        fill: '#1E1E1E',
                        'stroke-width': 1,
                        stroke: '#1e1e1e'
                    }
                },
                fieldMap: {
                    normal: 'normal',
                    alert: 'alert',
                    delay: 'delay',
                    delayFinished: 'delayFinished',
                    normalFinished: 'normalFinished'
                },
                className: {
                    container: 'lamp-map',
                    children: 'lamp-map-children'
                },
                event: {
                    click: function (e, item) {
                        // console.log('click');
                        // console.dir(item);
                    },
                    dbclick: function (e, item) {
                        // console.log('dbclick');
                        // console.dir(item);
                    }
                }
            }
        };

        this.options = $.extend(true, {}, _options, options);
        this.container = $(this.options.container);
        this.data = this.options.data;
        this.config = this.options.config;
        this.paper;
        this.clickType = null;
    }

    LampMap.prototype.load = function (data) {
        this.data = data;
    };

    LampMap.prototype.render = function () {
        var r = this.config.node.default.r;

        if (this.container.length === 0 && this.data.length < 1) {
            return;
        }

        this.container.addClass(this.config.className.container)
            .css(this.config.classAttr);

        if (!this.paper) {
            this.paper = Snap();
            this.container.append(this.paper.node);
        }
        else {
            this.paper.clear();
        }
        this.renderArrow();
        this.renderMap(this.data, r * 2, r * 4);
        this.resize();
    };

    LampMap.prototype.renderArrow = function () {
        var arrow;

        arrow = this.paper.path('M0,0 L0,6 L9,3 z').attr(this.config.arrow.default);

        arrow.marker(0, 0, 3, 3, 8, 3).attr({
            id: 'arrow',
            viewBox: '0 0 6 6'
        });
    };

    LampMap.prototype.renderMap = function (data, x, y, parentNode) {
        var x1 = x,
            y1 = y,
            item,
            offsetX,
            node,
            prevNode,
            subNode,
            list = [];


        for (var i = 0, len = data.length; i < len; i++) {
            item = data[i];
            offsetX = (this.config.offset.x + this.config.node.default.r) * i;
            x1 = x + offsetX;

            node = this.renderNode(x1, y1, item.id, item.text, item.state || '');
            this.bindNodeEvent(node, item);

            if (i === 0 && parentNode) {
                list.push(this.renderBrokenLine(parentNode, node));
            }
            else if (prevNode) {
                list.push(this.renderStraightLine(prevNode, node));
            }
            prevNode = node;

            if (item.children && item.children.length > 0) {
                offsetX = (this.config.offset.x + this.config.node.default.r) * (i + 1) - this.config.offset.x / 2;
                subNode = this.renderMap(item.children, x + offsetX, y1 + this.config.offset.y, node);
                if (subNode) {
                    subNode.attr({ 'class': this.config.className.children });
                    node.attr('data-hasSubNode', true);
                    node = this.paper.g(node, subNode);
                }
            }

            list.push(node);
        }

        return this.paper.g.apply(this.paper, list);

    };

    LampMap.prototype.renderNode = function (x, y, id, text, state) {
        var circleEl,
            textEl,
            attr,
            node;

        state = this.config.fieldMap[state];

        attr = $.extend({}, this.config.node.default, this.config.node[state] || {});
        circleEl = this.paper.circle(x, y, this.config.node.default.r).attr(attr);

        attr = $.extend({}, this.config.text.default, this.config.text[state] || {});
        textEl = this.paper.text(x, y + this.config.text.default['font-size'] / 2 - 2, text).attr(attr);

        node = this.paper.g(circleEl, textEl).attr({
            id: id,
            cursor: 'pointer'
        });

        this.nodeAnimate(node, state);

        return node;
    };

    LampMap.prototype.nodeAnimate = function (node, state) {
        var config = this.config.node[state] || {};

        if (config.light) {
            this.flashLight(node, 2, 0.3);
        }
    };

    LampMap.prototype.renderStraightLine = function (fromNode, toNode) {
        var fromBBox = fromNode.getBBox(),
            toNodeBBox = toNode.getBBox(),
            x1 = fromBBox.cx + fromBBox.r1,
            y1 = fromBBox.cy,
            x2 = toNodeBBox.cx - toNodeBBox.r1,
            y2 = y1,
            path;

        path = this.paper.path(['M', x1, ' ', y1, 'L', x2, ' ', y2].join(''))
            .attr(this.config.line.default);

        $(path.node).attr('marker-end', 'url(#arrow)');

        return path;
    };

    LampMap.prototype.renderExpand = function (node) {
        var hasSubNode = node.attr('data-hasSubNode'),
            expand,
            childrenNode;

        if (!hasSubNode) {
            return;
        }

        expand = node.attr('data-expand') || 'open';
        childrenNode = node.parent().select('.' + this.config.className.children);

        if (expand === 'open') {
            $(childrenNode.node).hide();
            node.attr(this.config.node.close);
        }
        else {
            $(childrenNode.node).show();
            node.attr(this.config.node.open);
        }

        node.attr('data-expand', expand === 'open' ? 'close' : 'open');
    };

    LampMap.prototype.bindNodeEvent = function (node, item) {
        var self = this;
        node.click(function (e) {
            if (self.clickType === null) {
                self.clickType = 'click';
                setTimeout(function () {
                    if (self.clickType === 'click') {
                        self.bindNodeClick(e, node, item);
                    }
                    else {
                        self.bindNodeDbClick(e, node, item);
                    }
                    self.clickType = null;
                }, 250);
            } else if (self.clickType === 'click') {
                self.clickType = 'dbclick';
            }
        });
    };

    LampMap.prototype.bindNodeClick = function (e, node, item) {
        this.config.event.click.call(node, e, item);
    };

    LampMap.prototype.bindNodeDbClick = function (e, node, item) {
        this.renderExpand(node);
        this.config.event.dbclick.call(node, e, item);
    };

    LampMap.prototype.renderBrokenLine = function (fromNode, toNode) {
        var fromBBox = fromNode.getBBox(),
            toBBox = toNode.getBBox(),
            x1 = fromBBox.cx,
            y1 = fromBBox.cy,
            x2 = '',
            y2 = '',
            x3 = '',
            y3 = '',
            x4 = toBBox.cx,
            y4 = toBBox.cy,
            path,
            offsetY = this.config.offset.y;

        if (y1 === y2) {
            y1 = y1 - fromBBox.r;

            x2 = x1;
            y2 = y1 - offsetY;

            x3 = x4;
            y3 = y2;

            y4 = y1;

            path = ['M', x1, ' ', y1, 'L', x2, ' ', y2, 'L', x3, ' ', y3, 'L', x4, ' ', y4].join('');
        }
        else if (y1 < y4) {
            y1 = y1 + fromBBox.r1;

            x2 = x1;
            y2 = y4;

            x3 = x4 - toBBox.r1;
            y3 = y4;

            path = ['M', x1, ' ', y1, 'L', x2, ' ', y2, 'L', x3, ' ', y3].join('');
        }
        else if (y1 > y4) {
            x1 = x1 + fromBBox.r1;

            x2 = x4;
            y2 = y1;

            x3 = x4;
            y3 = y4 - toBBox.r1;

            path = ['M', x1, ' ', y1, 'L', x2, ' ', y2, 'L', x3, ' ', y3].join('');
        }

        path = this.paper.path(path)
            .attr(this.config.line.default);
        $(path.node).attr('marker-end', 'url(#arrow)');

        return path;
    };

    LampMap.prototype.flashLight = function (node, from, to) {
        var self = this;
        Snap.animate(from, to, function (val) {
            node.attr({
                opacity: val
            });

        }, 2000, null, function () {
            self.flashLight(node, to, from);
        });
    };

    LampMap.prototype.resize = function () {
        var bbox,
            r = this.config.node.default.r;

        bbox = this.paper.getBBox();

        this.paper.attr({
            width: bbox.width + r * 2,
            height: bbox.height + r * 4
        });
    };

    window.LampMap = LampMap;

}(jQuery, Snap, window, console));
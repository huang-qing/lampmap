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
                    x: 130,
                    y: 50,
                    expandX: 14,
                    lineX: 20
                },
                node: {
                    default: {
                        //stroke: '#1E1E1E',
                        //strokeWidth: 3,
                        //fill: '#b7b7b7',
                        fill: 'url(#gradient-default)',
                        gradient: {
                            stop1: '#878586',
                            stop2: '#b7b7b7'
                        },
                        r: 25
                    },
                    normal: {
                        //fill: '#1cdf8f',
                        fill: 'url(#gradient-normal)',
                        gradient: {
                            stop1: '#01c944',
                            stop2: '#1cdf90'
                        }
                    },
                    alter: {
                        //fill: '#ffd851',
                        fill: 'url(#gradient-alter)',
                        gradient: {
                            stop1: '#febd01',
                            stop2: '#ffd851'
                        },
                        light: true
                    },
                    delay: {
                        //fill: '#ff5a5a',
                        fill: 'url(#gradient-delay)',
                        gradient: {
                            stop1: '#ff0101',
                            stop2: '#ff5a5a'
                        },
                        light: true
                    },
                    delayFinished: {
                        //fill: '#4c4c4c',
                        fill: 'url(#gradient-delayFinished)',
                        gradient: {
                            stop1: '#000000',
                            stop2: '#4c4c4c'
                        }
                    },
                    normalFinished: {
                        fill: 'url(#gradient-normalFinished)',
                        gradient: {
                            stop1: '#878586',
                            stop2: '#b7b7b7'
                        }
                    },
                    expand: {
                        gradient: {
                            stop1: '#0867dd',
                            stop2: '#57a4ea'
                        }
                    },
                    open: {
                        'stroke-dasharray': 0
                    },
                    close: {
                        'stroke-dasharray': [8, 3]
                    }
                },
                text: {
                    default: {
                        fill: '#FFFFFF',
                        'text-anchor': 'middle',
                        'font-size': 24,
                        'font-weight': 'bolder',
                        'font-family': ' 微软雅黑'
                    },
                    normal: {
                        fill: '#FFFFFF'
                    },
                    alter: {
                        fill: '#FFFFFF'
                    },
                    delay: {
                        fill: '#FFFFFF'
                    },
                    delayFinished: {
                        fill: '#FFFFFF'
                    },
                    normalFinished: {
                        fill: '#FFFFFF'
                    }
                },
                line: {
                    default: {
                        stroke: '#666666',
                        'stroke-width': 2,
                        fill: 'none',
                        'marker-end': 'url(#arrow)'
                    }
                },
                expand: {
                    default: {
                        background: {
                            stroke: '#6eb1ef',
                            strokeWidth: 0,
                            //fill: '#6eb1ef',
                            fill: 'url(#gradient-expand)',
                            width: 30,
                            height: 30,
                            r: 6
                        },
                        frontground: {
                            stroke: '#ffffff',
                            'stroke-width': 2,
                            fill: 'none',
                        }
                    }
                },
                arrow: {
                    default: {
                        fill: '#666666',
                        'stroke-width': 1,
                        stroke: '#666666'
                    }
                },
                fieldMap: {
                    normal: 'normal',
                    alter: 'alter',
                    delay: 'delay',
                    delayFinished: 'delayFinished',
                    normalFinished: 'normalFinished'
                },
                className: {
                    container: 'lamp-map',
                    node: 'lamp-map-node',
                    children: 'lamp-map-children'
                },
                event: {
                    click: function (e, item) {
                        //console.log('click');
                        // console.dir(item);
                    },
                    dbclick: function (e, item) {
                        //console.log('dbclick');
                        // console.dir(item);
                    }
                }
            }
        };

        this.options = $.extend(true, {}, _options, options);
        this.container = $(this.options.container);
        this._data = this.options.data;
        this.data = this._data.concat();
        this.hash = {};
        this.config = this.options.config;
        this.clickType = null;
        this.enableFlashLight = true;
        this.paper;
    }

    LampMap.prototype.load = function (data) {
        this.data = data;
    };

    LampMap.prototype.render = function () {
        var r = this.config.node.default.r,
            gradients,
            gradient,
            i;

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

        gradients = this.config.node;
        for (i in gradients) {
            gradient = gradients[i].gradient;
            if (gradient) {
                this.renderLinearGradient('gradient-' + i, gradient.stop1, gradient.stop2);
            }
        }

        this.renderMap(this.data, r * 2, r * 4);
        this.resize();
    };

    LampMap.prototype.clear = function () {
        this.paper.clear();
        this.hash = {};
    };

    LampMap.prototype.renderArrow = function () {
        var arrow;

        arrow = this.paper.path('M0,0 L0,6 L3,3 z').attr(this.config.arrow.default);

        arrow.marker(0, 0, 6, 6, 3, 3).attr({
            id: 'arrow',
            viewBox: '0 0 6 6'
        });
    };

    LampMap.prototype.renderLinearGradient = function (id, start, end) {
        this.paper.gradient('l(0%, 0%, 0%, 80%)' + start + '-' + end)
            .attr({ id: id });
    };

    LampMap.prototype.renderMap = function (data, x, y, parentNode) {

        var x1 = x,
            y1 = y,
            x2,
            y2,
            y3,
            y4,
            y5,
            n,
            bbox,
            item,
            offsetX = this.config.offset.x + this.config.node.default.r * 2 + this.config.expand.default.background.width + this.config.offset.expandX,
            offsetY = this.config.offset.y + this.config.node.default.r,
            node,
            currentNode,
            prevNode,
            prevNodeBbox,
            subNode,
            subNodeBbox,
            list = [],
            path = [],
            parentId,
            index,
            m,
            length;


        for (var i = 0, len = data.length; i < len; i++) {
            item = data[i];
            //设置当前节点折叠状态
            if (typeof item.expand === 'undefined') {
                item.expand = true;
            }
            //初始化当前节点的后续任务
            if (item.nextItems) {
                item.nextItems = [];
            }

            y1 = y;
            //判断上一个兄弟节点是否存在子节点，调整当前节点的位置
            if (subNode) {
                subNodeBbox = subNode.getBBox();
                y1 = subNodeBbox.y + subNodeBbox.height + offsetY;
            } else if (prevNode) {
                prevNodeBbox = prevNode.getBBox();
                y1 = prevNodeBbox.cy + prevNodeBbox.r1 + offsetY;
            }
            //绘制当前节点
            node = this.renderNode(x1, y1, item);
            //记录当前节点相关信息
            item.x = x1;
            item.y = y1;
            item.index = index;
            this.hash[item.id] = item;
            path.push(i + 1);
            index = path.join('-');
            node.attr({
                'data-index': index,
                'data-expand': item.expand
            });
            //当前节点折叠状态
            if (!item.expand) {
                node.attr(this.config.node.close);
            }

            if (parentNode) {
                parentId = parentNode.attr('id');
                node.attr({
                    'data-parentId': parentId
                });
                item.parentId = parentId;
            }

            prevNode = node;
            currentNode = node;

            this.bindNodeEvent(node, item);

            //递归下级节点
            if (item.children && item.children.length > 0 && item.expand) {
                length = item.children.length;
                subNode = this.renderMap(item.children, x + offsetX, y1, node);

                if (subNode) {
                    //父节点垂直居中

                    m = new Snap.Matrix();
                    n = subNode[length - 1];
                    n = n.hasClass(this.config.className.node) ? n : n.select('.' + this.config.className.node);
                    bbox = n.getBBox();
                    y2 = bbox.y + bbox.height;

                    n = subNode[0];
                    n = n.hasClass(this.config.className.node) ? n : n.select('.' + this.config.className.node);
                    bbox = n.getBBox();
                    y4 = bbox.y;

                    y5 = y4 - node.getBBox().y;
                    m.translate(0, (y2 - y4) / 2 - this.config.node.default.r + y5);
                    node.transform(m);
                    //绘制连线
                    this.renderLines(node, subNode);
                    //放入组中
                    subNode.attr({ 'class': this.config.className.children });
                    node = this.paper.g(node, subNode);
                }
            }
            else {
                subNode = null;
            }

            list.push(node);
        }

        return this.paper.g.apply(this.paper, list);
    };

    LampMap.prototype.renderLines = function (parentNode, children) {
        var i,
            child;

        if (parentNode && children) {
            i = 0;

            while (children[i]) {
                child = children[i];
                this.renderBrokenLine(parentNode, child, true);
                i++;
            }
        }
    };

    LampMap.prototype.renderContent = function (x, y, id, text, state) {
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

    LampMap.prototype.renderExpand = function (x, y, id, expand) {
        var backgroundAttr,
            frontgoundAttr,
            rect,
            path1,
            path2,
            path3,
            innerOffset = 6,
            node,
            x1,
            y1,
            outerWidth,
            innerWidth;

        backgroundAttr = $.extend({}, this.config.expand.default.background);
        frontgoundAttr = $.extend({}, this.config.expand.default.frontground);
        outerWidth = backgroundAttr.width;
        innerWidth = outerWidth - innerOffset * 2;
        x1 = x;
        y1 = y - backgroundAttr.height / 2;

        rect = this.paper.rect(x1, y1, backgroundAttr.width, backgroundAttr.height, backgroundAttr.r).attr(backgroundAttr);
        path1 = this.paper.path([
            'M', x1 + innerOffset, ' ', y1 + innerOffset, 'h', innerWidth, ' ', 'v', innerWidth, ' ', 'h', -innerWidth, 'z',
        ].join('')).attr(frontgoundAttr);
        path2 = this.paper.path([
            'M', x1 + innerOffset * 1.5, ' ', y1 + backgroundAttr.height / 2, 'h', innerWidth - innerOffset
        ].join('')).attr(frontgoundAttr);
        path3 = this.paper.path([
            'M', x1 + backgroundAttr.width / 2, ' ', y1 + innerOffset * 1.5, 'v', innerWidth - innerOffset,
        ].join('')).attr(frontgoundAttr);

        node = this.paper.g(rect, path1, path2, path3).attr({
            id: id,
            cursor: 'pointer',
            'data-expand': expand
        });

        return node;
    };

    LampMap.prototype.renderNode = function (x, y, item) {
        var content,
            expandBgAttr = this.config.expand.default.background,
            id = item.id,
            text = item.text,
            state = item.state || '',
            expand = item.expand,
            g;

        expand = this.renderExpand(x, y, id, expand);
        x = x + expandBgAttr.width + this.config.offset.expandX + this.config.node.default.r;
        content = this.renderContent(x, y, id, text, state);

        g = this.paper.g(expand, content);
        g.attr({ 'class': this.config.className.node });
        return g;
    };

    LampMap.prototype.translateXNode = function (node, x) {
        node.select('circle').attr('cx', x);
        node.select('text').attr('x', x);
    };

    LampMap.prototype.translateYNode = function (node, y) {
        node.select('circle').attr('cy', y);
        node.select('text').attr('y', y);
    };

    LampMap.prototype.nodeAnimate = function (node, state) {
        var config = this.config.node[state] || {};

        if (config.light) {
            this.flashLight(node, 2, 0.3);
        }
    };

    LampMap.prototype.renderBrokenLine = function (fromNode, toNode, hasArrow) {
        var fromBBox = fromNode.getBBox(),
            toBBox = toNode.getBBox(),
            offsetX = this.config.offset.lineX,
            x1 = '',
            y1 = '',
            x2 = '',
            y2 = '',
            x3 = '',
            y3 = '',
            x4 = '',
            y4 = '',
            path;

        // x1 = fromBBox.cx + fromBBox.r1;
        // y1 = fromBBox.cy;
        x1 = fromBBox.x + fromBBox.width + offsetX;
        y1 = fromBBox.cy;

        x2 = x1 + (toBBox.x - x1 - offsetX) / 2;
        y2 = y1;

        x3 = x2;
        y3 = toBBox.cy;

        x4 = toBBox.x - offsetX;
        y4 = y3;

        path = ['M', x1, ' ', y1, 'L', x2, ' ', y2, 'L', x3, ' ', y3, 'L', x4, ' ', y4].join('');

        path = this.paper.path(path)
            .attr(this.config.line.default);

        if (hasArrow) {
            $(path.node).attr('marker-end', 'url(#arrow)');
        }

        return path;
    };

    // LampMap.prototype.renderExpand = function (node) {
    //     var hasSubNode = node.attr('data-hasSubNode'),
    //         expand,
    //         childrenNode;

    //     if (!hasSubNode) {
    //         return;
    //     }

    //     expand = node.attr('data-expand') || 'open';
    //     childrenNode = node.parent().select('.' + this.config.className.children);

    //     if (expand === 'open') {
    //         $(childrenNode.node).hide();
    //         node.attr(this.config.node.close);
    //     }
    //     else {
    //         $(childrenNode.node).show();
    //         node.attr(this.config.node.open);
    //     }

    //     node.attr('data-expand', expand === 'open' ? 'close' : 'open');
    // };

    LampMap.prototype.changeExpand = function (node) {
        var id = node.attr('id'),
            expand = node.attr('data-expand') === 'true' ? false : true,
            item = this.hash[id],
            hasSubNode = item.children && item.children.length;

        if (!hasSubNode) {
            return;
        }

        item.expand = expand;
        node.attr('data-expand', expand);
        if (expand) {
            node.attr(this.config.node.open);
        }
        else {
            node.attr(this.config.node.close);
        }

        this.clear();
        this.render();
    };

    LampMap.prototype.bindNodeEvent = function (node, item) {
        var self = this;
        node.click(function (e) {
            if (self.clickType === null) {
                self.clickType = 'click';
                setTimeout(function () {
                    var type = self.clickType;
                    self.clickType = null;

                    if (type === 'click') {
                        self.bindNodeClick(e, node, item);
                    }
                    else {
                        self.bindNodeDbClick(e, node, item);
                    }

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
        this.config.event.dbclick.call(node, e, item);
        this.changeExpand(node);
    };

    LampMap.prototype.flashLight = function (node, from, to) {
        return;
        var self = this;

        if (!this.enableFlashLight) {
            return;
        }

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
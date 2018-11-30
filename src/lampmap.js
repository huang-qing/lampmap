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
                    y: 30
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
                    alter: {
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
                        'stroke-dasharray': [8, 3]
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
                    alter: {
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
                    alter: 'alter',
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

    LampMap.prototype.clear = function () {
        this.paper.clear();
        this.hash = {};
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
            x2,
            y2,
            item,
            offsetX = this.config.offset.x + this.config.node.default.r,
            offsetY = this.config.offset.y + this.config.node.default.r,
            node,
            prevNode,
            prevNodeBbox,
            subNode,
            subNodeBbox,
            nextItems,
            list = [],
            path = [],
            parentId,
            index,
            preposeNode,
            preposeItem;


        for (var i = 0, len = data.length; i < len; i++) {
            item = data[i];
            //前置节点未显示不渲染当前节点
            preposeItem = this.hash[item.prepose];
            if (item.prepose && !preposeItem) {
                continue;
            }
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
            node = this.renderNode(x1, y1, item.id, item.text, item.state || '');
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

            //绘制连线
            if (preposeItem) {
                if (!preposeItem.nextItems) {
                    preposeItem.nextItems = [];
                }
                //前置任务是同级兄弟节点且为折叠状态Y位置计算
                if (preposeItem.parentId === item.parentId && !preposeItem.expand) {
                    nextItems = preposeItem.nextItems;

                    if (nextItems.length === 0) {
                        y2 = preposeItem.y;
                    }
                    else {
                        y2 = nextItems[nextItems.length - 1].y + offsetY;
                    }
                    this.translateYNode(node, y2);

                    item.y = y2;
                    preposeItem.nextItems.push(item);
                }

                preposeNode = this.paper.select('[id="' + preposeItem.id + '"]');
                x2 = preposeItem.x + offsetX;
                item.x = x2;
                this.translateXNode(node, x2);

                list.push(this.renderBrokenLine(preposeNode, node, true));
            } else if (parentNode) {
                list.push(this.renderBrokenLine(parentNode, node));
            }

            this.bindNodeEvent(node, item);

            //递归下级节点
            if (item.children && item.children.length > 0 && item.expand) {
                subNode = this.renderMap(item.children, x + offsetX, y1, node);
                if (subNode) {
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
            x1 = '',
            y1 = '',
            x2 = '',
            y2 = '',
            x3 = '',
            y3 = '',
            x4 = '',
            y4 = '',
            path;

        x1 = fromBBox.cx + fromBBox.r1;
        y1 = fromBBox.cy;

        x2 = x1 + ((toBBox.cx - toBBox.r1) - (fromBBox.cx + fromBBox.r1)) / 2;
        y2 = y1;

        x3 = x2;
        y3 = toBBox.cy;

        x4 = toBBox.cx - toBBox.r1;
        y4 = y3;

        path = ['M', x1, ' ', y1, 'L', x2, ' ', y2, 'L', x3, ' ', y3, 'L', x4, ' ', y4].join('');

        path = this.paper.path(path)
            .attr(this.config.line.default);

        if (hasArrow) {
            $(path.node).attr('marker-end', 'url(#arrow)');
        }

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
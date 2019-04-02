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

(function($, Snap, window, console) {
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
                    lineX: 20,
                    preposeX: 40,
                    pointX: 20
                },
                shadows: {
                    defalut: {
                        fill: '#909090'
                    },
                    normal: {
                        fill: '#16b271'
                    },
                    alter: {
                        fill: '#cdac41'
                    },
                    'alter-light': {
                        fill: '#cc8600'
                    },
                    delay: {
                        fill: '#ce4849'
                    },
                    'delay-light': {
                        fill: '#be3032'
                    },
                    delayFinished: {
                        fill: '#3d3d3d'
                    },
                    normalFinished: {
                        fill: '#909090'
                    },
                    expand: {
                        fill: '#4584ba'
                    }
                },
                gradients: {
                    defalut: {
                        stop1: '#878586',
                        stop2: '#b7b7b7'
                    },
                    normal: {
                        stop1: '#01c944',
                        stop2: '#1cdf90'
                    },
                    alter: {
                        stop1: '#febd01',
                        stop2: '#ffd851'
                    },
                    'alter-light': {
                        stop1: '#ff8a00',
                        stop2: '#ffe695'
                    },
                    delay: {
                        stop1: '#ff0101',
                        stop2: '#ff5a5a'
                    },
                    'delay-light': {
                        stop1: '#ec0000',
                        stop2: '#ffaaaa'
                    },
                    delayFinished: {
                        stop1: '#000000',
                        stop2: '#4c4c4c'
                    },
                    normalFinished: {
                        stop1: '#878586',
                        stop2: '#b7b7b7'
                    },
                    expand: {
                        stop1: '#0867dd',
                        stop2: '#57a4ea'
                    }
                },
                node: {
                    default: {
                        fill: 'url(#gradient-default)',
                        filter: 'url(#shadow-default)',
                        r: 25
                    },
                    normal: {
                        fill: 'url(#gradient-normal)',
                        filter: 'url(#shadow-normal)'
                    },
                    alter: {
                        fill: 'url(#gradient-alter)',
                        filter: 'url(#shadow-alter)',
                        light: true
                    },
                    'alter-light': {
                        fill: 'url(#gradient-alter-light)',
                        filter: 'url(#shadow-alter-light)'
                    },
                    delay: {
                        fill: 'url(#gradient-delay)',
                        filter: 'url(#shadow-delay)',
                        light: true
                    },
                    'delay-light': {
                        fill: 'url(#gradient-delay-light)',
                        filter: 'url(#shadow-delay-light)'
                    },
                    delayFinished: {
                        fill: 'url(#gradient-delayFinished)',
                        filter: 'url(#shadow-delayFinished)'
                    },
                    normalFinished: {
                        fill: 'url(#gradient-normalFinished)',
                        filter: 'url(#shadow-normalFinished)'
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
                            fill: 'url(#gradient-expand)',
                            filter: 'url(#shadow-expand)',
                            width: 30,
                            height: 30,
                            r: 6
                        },
                        frontground: {
                            stroke: '#ffffff',
                            'stroke-width': 2,
                            fill: 'none'
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
                point: {
                    default: {
                        fill: 'none',
                        'stroke-width': 3,
                        stroke: '#666666',
                        width: 75
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
                    expand: 'lamp-map-node-expand',
                    text: 'lamp-map-node-text',
                    children: 'lamp-map-children',
                    lines: 'lamp-map-lines',
                    prepose: 'lamp-map-node-prepose',
                    point: 'lamp-map-node-point'
                },
                event: {
                    click: function(e, item) {
                        //console.log('click');
                        // console.dir(item);
                    },
                    dbclick: function(e, item) {
                        //console.log('dbclick');
                        // console.dir(item);
                    },
                    expand: function(e, item) {
                        //console.log('expand');
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

    LampMap.prototype.load = function(data) {
        this.data = data;
    };

    LampMap.prototype.render = function() {
        var r = this.config.node.default.r;

        if (this.container.length === 0 && this.data.length < 1) {
            return;
        }

        this.container
            .addClass(this.config.className.container)
            .css(this.config.classAttr);

        if (!this.paper) {
            this.paper = Snap();
            this.container.append(this.paper.node);
        } else {
            this.paper.clear();
        }

        this.renderArrow();
        this.renderLinearGradients();
        this.renderShadows();

        this.init();
        this.renderMap(this.data, r * 2, r * 4);
        this.resize();
    };

    LampMap.prototype.init = function() {
        this.initNodeHash(this.data);
    };

    LampMap.prototype.initNodeHash = function(data) {
        var item;
        if (data instanceof Array) {
            for (var i = 0, len = data.length; i < len; i++) {
                item = data[i];
                this.hash[item.id] = {
                    id: item.id,
                    text: item.text,
                    state: item.state
                };
                this.initNodeHash(item.children);
            }
        }
    };

    LampMap.prototype.clear = function() {
        this.paper.clear();
        this.hash = {};
    };

    LampMap.prototype.renderArrow = function() {
        var arrow;

        arrow = this.paper
            .path('M0,0 L0,6 L3,3 z')
            .attr(this.config.arrow.default);

        arrow.marker(0, 0, 6, 6, 3, 3).attr({
            id: 'arrow',
            viewBox: '0 0 6 6'
        });
    };

    LampMap.prototype.renderLinearGradients = function() {
        var gradients, gradient, i;

        gradients = this.config.gradients;
        for (i in gradients) {
            gradient = gradients[i];
            if (gradient) {
                this.renderLinearGradient(
                    'gradient-' + i,
                    gradient.stop1,
                    gradient.stop2
                );
            }
        }
    };

    LampMap.prototype.renderLinearGradient = function(id, start, end) {
        this.paper
            .gradient('l(0%, 0%, 0%, 80%)' + start + '-' + end)
            .attr({ id: id });
    };

    LampMap.prototype.renderShadows = function() {
        var shadows, shadow, i;

        shadows = this.config.shadows;
        for (i in shadows) {
            shadow = shadows[i];
            if (shadow) {
                this.renderShadow('shadow-' + i, shadow.fill);
            }
        }
    };

    LampMap.prototype.renderShadow = function(id, color) {
        var filstr = [
            //'<filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">',
            '   <feComponentTransfer in=SourceAlpha>',
            '       <feFuncA type="table" tableValues="1 0" />',
            '   </feComponentTransfer>',
            //'   <feGaussianBlur stdDeviation="3"/>',
            '   <feOffset dx="0" dy="-5" result="offsetblur"/>',
            '   <feFlood flood-color="',
            color,
            '" result="color"/>',
            '   <feComposite in2="offsetblur" operator="in"/>',
            '   <feComposite in2="SourceAlpha" operator="in" />',
            '   <feMerge>',
            '       <feMergeNode in="SourceGraphic" />',
            '       <feMergeNode />',
            '   </feMerge>'
            //'</filter> '
        ].join('');

        this.paper.filter(filstr).attr({
            id: id,
            x: '-50%',
            y: '-50%',
            width: '200%',
            height: '200%'
        });
    };

    LampMap.prototype.renderMap = function(data, x, y, parentNode) {
        var x1 = x,
            y1 = y,
            item,
            width =
                this.config.node.default.r * 2 +
                this.config.expand.default.background.width +
                this.config.offset.expandX,
            offsetX = this.config.offset.x + width,
            offsetY = this.config.offset.y + this.config.node.default.r,
            node,
            prevNode,
            prevNodeBbox,
            subNode,
            subNodeBbox,
            preposeNode,
            lines,
            list = [],
            path = [],
            parentId,
            index,
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
            //test
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

            this.bindNodeEvent(node, item);

            //递归下级节点
            if (item.children && item.children.length > 0 && item.expand) {
                length = item.children.length;
                subNode = this.renderMap(item.children, x + offsetX, y1, node);

                if (subNode) {
                    this.adjustParntNode(node, subNode, length);
                    //绘制连线
                    lines = this.renderLines(node, subNode);
                    //放入组中
                    subNode.attr({ class: this.config.className.children });
                    node = this.paper.g(node, lines, subNode);
                }
            } else {
                subNode = null;
            }

            //前置节点指示
            if (
                (!item.children || item.children.length === 0) &&
                item.prepose
            ) {
                preposeNode = this.renderPreposeNode(
                    x + width + this.config.offset.preposeX,
                    y1,
                    this.hash[item.prepose]
                );

                node = this.paper.g(node, preposeNode);
            }

            list.push(node);
        }

        return this.paper.g.apply(this.paper, list);
    };

    LampMap.prototype.adjustParntNode = function(parentNode, subNode, count) {
        var bbox, y1, y2, y3;

        if (subNode) {
            //父节点垂直居中
            bbox = this.getMainNodeBBox(subNode[count - 1]);
            y1 = bbox.y + bbox.height;

            bbox = this.getMainNodeBBox(subNode[0]);
            y2 = bbox.y;

            y3 = y2 - parentNode.getBBox().y;

            this.translate(
                parentNode,
                0,
                (y1 - y2) / 2 - this.config.node.default.r + y3
            );
        }
    };

    LampMap.prototype.renderLines = function(parentNode, children) {
        var i,
            child,
            node = this.paper.g(),
            offsetX = 10,
            line;

        if (parentNode && children) {
            i = 0;

            while (children[i]) {
                child = children[i];
                child = this.findMainNode(child);

                //只存在一个子节点，特殊处理
                if (i === 0 && !children[i + 1]) {
                    offsetX = 0;
                }

                if (i === 0) {
                    //绘制父节点连线
                    line = this.renderStartLine(
                        parentNode,
                        child,
                        false,
                        offsetX
                    );
                    node.add(line);
                }

                if (
                    (i === 0 && children[i + 1]) ||
                    (!children[i + 1] && i !== 0)
                ) {
                    //绘制到首、尾节点的折线
                    line = this.renderBrokenLine(parentNode, child, true);
                    node.add(line);
                } else {
                    //绘制除首、尾子节点的连线
                    line = this.renderEndLine(parentNode, child, true, offsetX);
                    node.add(line);
                }

                i++;
            }
        }

        return node.attr({
            class: this.config.className.lines
        });
    };

    LampMap.prototype.translate = function(node, dx, dy) {
        var m;
        m = new Snap.Matrix();
        m.translate(dx, dy);
        node.transform(m);
    };

    LampMap.prototype.findMainNode = function(node) {
        return node.hasClass(this.config.className.node)
            ? node
            : node.select('.' + this.config.className.node);
    };

    LampMap.prototype.getMainNodeBBox = function(node) {
        node = this.findMainNode(node);
        return node.getBBox();
    };

    LampMap.prototype.renderContent = function(x, y, id, text, state) {
        var circleEl,
            textEl,
            attr,
            //f = this.paper.filter(Snap.filter.shadow(2, -2, 0.3)),
            node;

        state = this.config.fieldMap[state];

        attr = $.extend(
            {},
            this.config.node.default,
            this.config.node[state] || {}
        );
        circleEl = this.paper
            .circle(x, y, this.config.node.default.r)
            .attr(attr);

        attr = $.extend({}, this.config.text.default, this.config.text[state], {
            // filter:f
        });
        textEl = this.paper
            .text(
                x,
                y - 2 + this.config.text.default['font-size'] / 2 - 2,
                text
            )
            .attr(attr);

        node = this.paper.g(circleEl, textEl).attr({
            id: id,
            cursor: 'pointer',
            class: this.config.className.text
        });

        this.nodeAnimate(node, state);

        return node;
    };

    LampMap.prototype.renderNode = function(x, y, item) {
        var content,
            expandBgAttr = this.config.expand.default.background,
            id = item.id,
            text = item.text,
            state = item.state || '',
            expand = item.expand,
            g;

        expand = this.renderExpand(x, y, id, expand);
        if (!item.children || item.children.length === 0) {
            expand.attr({ opacity: 0 });
        }
        x =
            x +
            expandBgAttr.width +
            this.config.offset.expandX +
            this.config.node.default.r;
        content = this.renderContent(x, y, id, text, state);

        g = this.paper.g(expand, content);
        g.attr({ class: this.config.className.node });
        return g;
    };

    LampMap.prototype.renderPreposeNode = function(x, y, item) {
        var content,
            pointAttr = this.config.point.default,
            id = item.id,
            text = item.text,
            state = item.state || '',
            point,
            g;

        point = this.renderPointNode(x, y);

        x =
            x +
            pointAttr.width +
            this.config.offset.pointX +
            this.config.node.default.r;
        content = this.renderContent(x, y, id, text, state);

        g = this.paper.g(point, content);
        g.attr({ class: this.config.className.prepose });
        return g;
    };

    LampMap.prototype.renderPointNode = function(x, y) {
        var attr = this.config.point.default,
            r = this.config.node.default.r,
            offsetX = 20,
            offsetY = 16,
            x1,
            y1,
            x2,
            y2,
            y3,
            x4,
            y4,
            x5,
            y5,
            path1,
            path2,
            path3,
            g;

        x1 = x;
        x2 = x1 + offsetX;

        y1 = y - r;
        y2 = y;
        y3 = y1 + 2 * r;

        x4 = x1 + offsetX / 2 - 2;
        x5 = x1 + attr.width;

        y4 = y1 + offsetY;
        y5 = y3 - offsetY;

        path1 = [
            'M',
            x2,
            ' ',
            y1,
            'L',
            x4,
            ' ',
            y4,
            'Q',
            x1,
            ' ',
            y2,
            ',',
            x4,
            ' ',
            y5,
            'L',
            x2,
            ' ',
            y3
        ].join('');
        path1 = this.paper.path(path1).attr(attr);

        path2 = ['M', x4, ' ', y4, 'L', x5, ' ', y4].join('');
        path2 = this.paper.path(path2).attr(attr);

        path3 = ['M', x4, ' ', y5, 'L', x5, ' ', y5].join('');
        path3 = this.paper.path(path3).attr(attr);

        g = this.paper.g(path1, path2, path3);
        g.attr({ class: this.config.className.point });
        return g;
    };

    LampMap.prototype.translateXNode = function(node, x) {
        node.select('circle').attr('cx', x);
        node.select('text').attr('x', x);
    };

    LampMap.prototype.translateYNode = function(node, y) {
        node.select('circle').attr('cy', y);
        node.select('text').attr('y', y);
    };

    LampMap.prototype.nodeAnimate = function(node, state) {
        var config = this.config.node[state] || {};
        node = node.select('circle');
        if (config.light) {
            this.flashLight(node, state, true);
        }
    };

    LampMap.prototype.renderBrokenLine = function(fromNode, toNode, hasArrow) {
        var fromBBox = fromNode.getBBox(),
            toBBox = toNode.getBBox(),
            offsetX = this.config.offset.lineX,
            offsetY2 = 10,
            offsetX2 = 10,
            x1 = '',
            y1 = '',
            x2 = '',
            y2 = '',
            x3 = '',
            y3 = '',
            x4 = '',
            y4 = '',
            path;

        x1 = fromBBox.x + fromBBox.width + offsetX;
        y1 = fromBBox.cy;

        x2 = x1 + (toBBox.x - x1 - offsetX) / 2;
        y2 = y1;

        x3 = x2;
        y3 = toBBox.cy;

        x4 = toBBox.x - offsetX;
        y4 = y3;

        offsetY2 = y3 - y2 > 0 ? offsetY2 : -offsetY2;

        path = [
            'M',
            x2,
            ' ',
            y2,
            'L',
            x3,
            ' ',
            y3 - offsetY2,
            'Q',
            x3,
            ' ',
            y3,
            ' ',
            x3 + offsetX2,
            ' ',
            y3,
            'L',
            x4,
            ' ',
            y4
        ].join('');

        path = this.paper.path(path).attr(this.config.line.default);

        if (hasArrow) {
            $(path.node).attr('marker-end', 'url(#arrow)');
        }

        return path;
    };

    LampMap.prototype.renderStartLine = function(
        fromNode,
        toNode,
        hasArrow,
        spaceX
    ) {
        var fromBBox = fromNode.getBBox(),
            toBBox = toNode.getBBox(),
            offsetX = this.config.offset.lineX,
            x1 = '',
            y1 = '',
            x2 = '',
            y2 = '',
            path;

        x1 = fromBBox.x + fromBBox.width + offsetX;
        y1 = fromBBox.cy;

        x2 = x1 + (toBBox.x - x1 - offsetX) / 2;
        y2 = y1;

        path = ['M', x1, ' ', y1, 'L', x2 - spaceX, ' ', y2].join('');

        path = this.paper.path(path).attr(this.config.line.default);

        if (hasArrow) {
            $(path.node).attr('marker-end', 'url(#arrow)');
        }

        return path;
    };

    LampMap.prototype.renderEndLine = function(
        fromNode,
        toNode,
        hasArrow,
        spaceX
    ) {
        var fromBBox = fromNode.getBBox(),
            toBBox = toNode.getBBox(),
            offsetX = this.config.offset.lineX,
            x1 = '',
            x2 = '',
            x3 = '',
            y3 = '',
            x4 = '',
            y4 = '',
            path;

        x1 = fromBBox.x + fromBBox.width + offsetX;

        x2 = x1 + (toBBox.x - x1 - offsetX) / 2;

        x3 = x2;
        y3 = toBBox.cy;

        x4 = toBBox.x - offsetX;
        y4 = y3;

        path = ['M', x3 + spaceX, ' ', y3, 'L', x4, ' ', y4].join('');

        path = this.paper.path(path).attr(this.config.line.default);

        if (hasArrow) {
            $(path.node).attr('marker-end', 'url(#arrow)');
        }

        return path;
    };

    LampMap.prototype.renderExpand = function(x, y, id, expand) {
        var backgroundAttr,
            frontgoundAttr,
            rect,
            path1,
            path2,
            path3,
            innerOffset = 7,
            offsetY = 2,
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

        rect = this.paper
            .rect(
                x1,
                y1,
                backgroundAttr.width,
                backgroundAttr.height,
                backgroundAttr.r
            )
            .attr(backgroundAttr);
        //框
        path1 = this.paper
            .path(
                [
                    'M',
                    x1 + innerOffset,
                    ' ',
                    y1 + innerOffset - offsetY,
                    'h',
                    innerWidth,
                    ' ',
                    'v',
                    innerWidth,
                    ' ',
                    'h',
                    -innerWidth,
                    'z'
                ].join('')
            )
            .attr(frontgoundAttr);
        //横
        path2 = this.paper
            .path(
                [
                    'M',
                    x1 + innerOffset * 1.5,
                    ' ',
                    y1 + backgroundAttr.height / 2 - offsetY,
                    'h',
                    innerWidth - innerOffset
                ].join('')
            )
            .attr(frontgoundAttr);
        //竖
        path3 = this.paper
            .path(
                [
                    'M',
                    x1 + backgroundAttr.width / 2,
                    ' ',
                    y1 + innerOffset * 1.5 - offsetY,
                    'v',
                    innerWidth - innerOffset
                ].join('')
            )
            .attr(frontgoundAttr);

        if (expand) {
            path3.attr({ opacity: 0 });
        }
        node = this.paper.g(rect, path1, path2, path3).attr({
            id: id,
            cursor: 'pointer',
            'data-expand': expand,
            class: this.config.className.expand
        });

        return node;
    };

    LampMap.prototype.changeExpand = function(node) {
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
        } else {
            node.attr(this.config.node.close);
        }

        this.clear();
        this.render();
    };

    LampMap.prototype.bindNodeEvent = function(node, item) {
        var self = this;
        node.click(function(e) {
            if (self.clickType === null) {
                self.clickType = 'click';
                setTimeout(function() {
                    var type = self.clickType;
                    self.clickType = null;

                    if (type === 'click') {
                        self.bindNodeClick(e, node, item);
                    } else {
                        self.bindNodeDbClick(e, node, item);
                    }
                }, 250);
            } else if (self.clickType === 'click') {
                self.clickType = 'dbclick';
            }
        });

        node.select('.' + this.config.className.expand).click(function(e) {
            self.bindExpandClick(e, this, item);
        });
    };

    LampMap.prototype.bindNodeClick = function(e, node, item) {
        this.config.event.click.call(node, e, item);
    };

    LampMap.prototype.bindNodeDbClick = function(e, node, item) {
        this.config.event.dbclick.call(node, e, item);
    };

    LampMap.prototype.bindExpandClick = function(e, node, item) {
        this.config.event.expand.call(node, e, item);
        this.changeExpand(node);
    };

    LampMap.prototype.flashLight = function(node, state, light) {
        var self = this,
            from = this.config.node[state] || {},
            to = this.config.node[state + '-light'] || {},
            attr = light ? to : from;

        if (!this.enableFlashLight || !attr) {
            return;
        }

        node.attr({
            fill: attr.fill,
            filter: attr.filter
        });
        node.animate({}, 1000, null, function() {
            self.flashLight(node, state, !light);
        });
    };

    LampMap.prototype.resize = function() {
        var bbox,
            offset = 10,
            r = this.config.node.default.r;

        bbox = this.paper.getBBox();

        this.paper.attr({
            width: bbox.width + r * 2 + offset,
            height: bbox.height + r * 4 + offset
        });
    };

    window.LampMap = LampMap;
})(jQuery, Snap, window, console);

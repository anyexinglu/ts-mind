"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var TSM_node = /** @class */ (function () {
    function TSM_node(sId, iIndex, sTopic, oData, bIsRoot, oParent, eDirection, bExpanded) {
        if (oData === void 0) { oData = {}; }
        if (eDirection === void 0) { eDirection = __1.TSMindDirectionMap.right; }
        if (bExpanded === void 0) { bExpanded = true; }
        var _this = this;
        this.id = "";
        this.index = 0;
        this.topic = "";
        this.data = {};
        this.isroot = true;
        this.direction = __1.TSMindDirectionMap.left;
        this.expanded = true;
        this.children = [];
        this.expands = {};
        this.width = 0;
        this.height = 0;
        this.view_data = {
            element: null,
            expander: null,
            abs_x: 0,
            abs_y: 0,
            width: 0,
            height: 0,
            _saved_location: {
                x: 0,
                y: 0
            }
        };
        this.layout_data = {
            direction: __1.TSMindDirectionMap.right,
            side_index: 0,
            offset_x: 0,
            offset_y: 0,
            outer_height: 0,
            left_nodes: [],
            right_nodes: [],
            outer_height_left: 0,
            outer_height_right: 0,
            visible: true,
            _offset_: {
                x: 0,
                y: 0
            }
        };
        this.get_location = function () {
            var vd = _this.view_data;
            return {
                x: vd.abs_x || 0,
                y: vd.abs_y || 0
            };
        };
        this.get_size = function () {
            var vd = _this.view_data;
            return {
                w: vd.width || 0,
                h: vd.height || 0
            };
        };
        this.id = sId;
        this.index = iIndex;
        this.topic = sTopic;
        this.data = oData;
        this.isroot = bIsRoot;
        this.parent = oParent;
        this.direction = eDirection;
        this.expanded = bExpanded;
    }
    TSM_node.inherited = function (pnode, node) {
        if (!!pnode && !!node) {
            if (pnode.id === node.id) {
                return true;
            }
            if (pnode.isroot) {
                return true;
            }
            var pid = pnode.id;
            var p = node;
            while (!p.isroot) {
                p = p.parent;
                if (p.id === pid) {
                    return true;
                }
            }
        }
        return false;
    };
    TSM_node.compare = function (node1, node2) {
        // '-1' is alwary the last
        var r = 0;
        var i1 = node1.index;
        var i2 = node2.index;
        if (i1 >= 0 && i2 >= 0) {
            r = i1 - i2;
        }
        else if (i1 === -1 && i2 === -1) {
            r = 0;
        }
        else if (i1 === -1) {
            r = 1;
        }
        else if (i2 === -1) {
            r = -1;
        }
        else {
            r = 0;
        }
        // logger.debug(i1+' <> '+i2+'  =  '+r);
        return r;
    };
    return TSM_node;
}());
exports.TSM_node = TSM_node;
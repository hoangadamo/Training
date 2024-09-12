"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
var world = 'world';
function hello(who) {
    if (who === void 0) { who = world; }
    return "Hello ".concat(who, "! ");
}

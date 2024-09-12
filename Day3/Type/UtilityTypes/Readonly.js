// Readonly: Set tất cả thuộc tính của Type thành readonly 
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function updatePerson3(person, fieldsUpdate) {
    return __assign(__assign({}, person), fieldsUpdate);
}
var person3 = { name: 'truong' };
person3.name = 'long';
var person4 = { name: 'truong' };
person4.name = 'long';

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
function updatePerson1(person, fieldsUpdate) {
    return __assign(__assign({}, person), fieldsUpdate);
}
var person1 = { name: 'truong' };
var person2 = { name: 'truong' }; // báo lỗi
var person3 = { name: 'truong', age: 12, gender: 'male' }; // ok

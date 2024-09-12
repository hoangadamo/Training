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
function updatePerson(person, fieldsUpdate) {
    return __assign(__assign({}, person), fieldsUpdate);
}
var person = {
    name: 'truong',
    age: 22,
    gender: 'male'
};
var personUpdate = {
    age: 18
};
updatePerson(person, personUpdate);
console.log(updatePerson(person, personUpdate));

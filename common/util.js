const toJSON = (_class) => {
    const jsonObj = Object.assign({}, _class);
    const proto = Object.getPrototypeOf(_class);
    for (const key of Object.getOwnPropertyNames(proto)) {
        const desc = Object.getOwnPropertyDescriptor(proto, key);
        const hasGetter = desc && typeof desc.get === 'function';
        if (hasGetter) {
            jsonObj[key] = _class[key];
        }
    }
    return jsonObj;
}

module.exports = {
    toJSON
}
export const hasError = (formData) => {
    let hasError = false;
    for (let key in formData) {
        if (formData[key].errors && formData[key].errors.length > 0) {
            hasError = true;
            break;
        }
    }
    return hasError;
}


const _identity = x => x;

export const getFormData = (formData, formDef) => {
    const result = {};
    for (let key in formData) {
        if (formDef[key].ignore)
            continue;
        result[key] = (formDef[key].transform || _identity)(formData[key].value);
    }
    return result;
}
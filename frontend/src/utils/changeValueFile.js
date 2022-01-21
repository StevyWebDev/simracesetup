/**
 * Change le contenue du label des input image
 * @param {String} value
 * @param {String} selector
 */
const changeValueFile = (value, selector) => {
    const p = document.querySelector(selector);

    p.textContent = value;
};

export default changeValueFile;

export default (element = null, text = null) => {
    if (element)
        element.forEach((value) => {
            document.querySelector(value).value = '';
        });

    if (text)
        text.forEach((value) => {
            document.querySelector(value).textContent = 'Aucune image...';
        });
};

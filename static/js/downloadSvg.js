document.addEventListener('DOMContentLoaded', () => {
    const svgElement = document.querySelector('.downloadSvgIcon');

    svgElement.addEventListener('click', (event) => {
        event.preventDefault();

        const svgCode = new XMLSerializer().serializeToString(svgElement);
        const link = document.createElement('a');

        link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCode)}`;
        link.download = 'image.svg';
        link.click();
    });
});





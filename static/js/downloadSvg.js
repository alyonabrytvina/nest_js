document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.downloadSvgButton');

    button.addEventListener('click', (event) => {
        event.preventDefault();

        const svgElement = document.querySelector('svg');
        console.log(svgElement, 'svgElement');
        const svgCode = new XMLSerializer().serializeToString(svgElement);

        const link = document.createElement('a');
        link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCode)}`;
        link.download = 'image.svg';
        link.click();
    });
});





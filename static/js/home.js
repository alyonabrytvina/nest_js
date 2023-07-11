document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('svgForm')
        .addEventListener('submit', (event) => {
            event.preventDefault();

            function displayErrorMessage(message) {
                const errorMessageElement = document.querySelector('.error-message');
                errorMessageElement.textContent = message;
            }

            const svgCode = event.target.elements.content.value;

            if (!svgCode) {
                displayErrorMessage('The field cannot be empty. Please enter SVG code.');
                return;
            }

            const svgRegex = /^<svg[\s\S]*<\/svg>$/i;

            if (!svgRegex.test(svgCode)) {
                displayErrorMessage('Invalid SVG code. Please try again.');
                return;
            }

            window
                .axios({
                    method: 'POST',
                    url: '/api/svgs',
                    data: {
                        content: svgCode,
                    },
                })
                .then(() => {
                    window.location.reload();
                });
        });

    Array.from(document.getElementsByClassName('removeSvgButton')).forEach(
        (element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();

                window
                    .axios({
                        method: 'DELETE',
                        url: `/api/svgs/${ element.dataset.id }`,
                    })
                    .then(() => {
                        window.location.reload();
                    });
            });
        }
    );

    Array.from(document.getElementsByClassName('likeSvgButton')).forEach(
        (element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();

                window
                    .axios({
                        method: 'PUT',
                        url: `/api/svgs/${ element.dataset.id }`,
                        data: {
                            isLiked: !!element.dataset.like,
                        },
                    })
                    .then(() => {
                        window.location.reload();
                    });
            });
        }
    );
});

const App_openOrClose = (display_value, app_id) => {
    if (display_value) {
        let value_to_check = ["block", "none"];
        if (value_to_check.includes(display_value)) {
            if (app_id) {
                let app = document.getElementById(app_id);

                if (app.style.display === "block") {
                    app.classList.add("hide");
                    setTimeout(() => {
                        app.style.display = display_value;
                        app.classList.remove("hide");
                    }, 80); // Adjust the timeout to match the animation time (0.2s)
                } else {
                    app.classList.add("show");
                    app.style.display = display_value;
                }
            }
        }
    }
};

const fullScreen = (elementId) => {
    let element = document.querySelector(elementId);

    if (element.style.width !== "90%") {
        // Store the current styles in a data attribute
        element.dataset.defaultStyles = JSON.stringify({
            width: element.style.width,
            height: element.style.height,
            top: element.style.top,
            right: element.style.right,
            left: element.style.left
        });

        // Apply fullscreen styles
        element.style.width = "90%";
        element.style.height = "80vh";
        element.style.top = '60px';
        element.style.right = '0';
        element.style.left = '110px';
    } else {
        // Revert to default styles
        const defaultStyles = JSON.parse(element.dataset.defaultStyles || '{}');
        element.style.width = defaultStyles.width || '';
        element.style.height = defaultStyles.height || '';
        element.style.top = defaultStyles.top || '';
        element.style.right = defaultStyles.right || '';
        element.style.left = defaultStyles.left || '';
    }
};


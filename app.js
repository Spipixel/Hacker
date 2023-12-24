let isDragging = false;
let dragStartX;
let dragStartY;

function moveAppOnNavHover(navId, appId) {
    const nav = document.getElementById(navId);
    const app = document.getElementById(appId);

    nav.addEventListener('mousedown', (e) => {
        isDragging = true;

        // Set the initial position based on the current position of the app
        const appRect = app.getBoundingClientRect();
        dragStartX = e.clientX - appRect.left;
        dragStartY = e.clientY - appRect.top;

        // Ensure the app stays within the window boundaries
        const maxX = window.innerWidth - appRect.width;
        const maxY = window.innerHeight - appRect.height;

        const clampedX = Math.min(Math.max(appRect.left, 0), maxX);
        const clampedY = Math.min(Math.max(appRect.top, 0), maxY);

        app.style.transition = 'none'; // Temporarily disable transition for smooth movement
        app.style.left = `${clampedX}px`;
        app.style.top = `${clampedY}px`;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newAppX = e.clientX - dragStartX;
            const newAppY = e.clientY - dragStartY;

            // Ensure the app stays within the window boundaries
            const maxX = window.innerWidth - app.clientWidth;
            const maxY = window.innerHeight - app.clientHeight;

            const clampedX = Math.min(Math.max(newAppX, 0), maxX);
            const clampedY = Math.min(Math.max(newAppY, 0), maxY);

            app.style.transition = 'none'; // Temporarily disable transition for smooth movement
            app.style.left = `${clampedX}px`;
            app.style.top = `${clampedY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        app.style.transition = ''; // Re-enable transition
    });
}

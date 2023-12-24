$(function () {
    let isUpdateInProgress = false;

    $('.terminal').on('click', function () {
        $('#input').focus();
    });

    $('#input').on('keydown', function (e) {
        if (e.keyCode == 13) {
            const command = $(this).val();

            // Disable input during the update process
            if (isUpdateInProgress) {
                return;
            }

            // Append the command to the history with color markup
            const currentPath = 'Spipixel@kali';
            const formattedCommand = `<span style="color: var(--green-color);">${currentPath}</span><span style="color: var(--red-color);margin-right:10px;">:~</span>${command}`;
            $('#history').append(`${formattedCommand}<br/>`);

            // Process the command and display the output
            const output = processCommand(command);
            if (output !== '') {
                $('#history').append(output + '<br/><br>');
            }

            // Clear the input
            $(this).val('');

            // Scroll to the bottom of the terminal
            $('.terminal').scrollTop($('.terminal')[0].scrollHeight);
        }
    });

    function processCommand(command) {
        let title = document.querySelector("#current-path");

        if (command.trim() === 'sudo apt-get update') {
            isUpdateInProgress = true;
            disableInput();

            const updateOutput = `
                Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease
                Get:2 http://archive.ubuntu.com/ubuntu focal-updates InRelease [114 kB]
                Get:3 http://archive.ubuntu.com/ubuntu focal-backports InRelease [101 kB]
                Get:4 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]
                Fetched 329 kB in 1s (310 kB/s)
                Reading package lists... Done
                Building dependency tree       
                Reading state information... Done
                3 packages can be upgraded. Run 'apt list --upgradable' to see them.
            `;

            const lines = updateOutput.split('\n');
            let output = '';

            function processLine(index) {
                if (index < lines.length) {
                    const currentLine = lines[index].trim(); // Remove extra spaces

                    setTimeout(() => {
                        $('#history').append(currentLine + '<br>');
                        $('.terminal').scrollTop($('.terminal')[0].scrollHeight);
                        processLine(index + 1);
                    }, 1000 + Math.floor(Math.random() * 3000)); // Random delay between 1 and 4 seconds
                } else {
                    // Update process is complete, enable input
                    isUpdateInProgress = false;
                    enableInput();
                }
            }

            processLine(0);

            return ''; // Returning an empty string as the final output
        } else if (command.trim() === 'clear') {
            $('#history').html('');
            return '';
        } else if (command.trim() === "uname -a") {

            return `Linux Ash 4.15.0-29-generic #31 -Ubuntu SMP ${new Date()} 2023 x86_64 GNU/Linux`
        } else if (command.trim() === 'exit') {
            let app = document.getElementById("terminal-app");

            app.classList.add("hide");
            setTimeout(() => {
                app.style.display = 'none';
                app.classList.remove("hide");
            }, 95);
            return '';
        } else if (command.trim() === 'ls') {
            // const currentPath = $('#path').text().replace('C:/Users/Spipixel/', '');
            return `
                Desktop
                Documents
                Downloads
                Music
                Pictures
                Videos
            `;
        } else if (command.trim() === 'help') {
            return `
                        CD     - Displays the name of or changes the current directory.<br>
                        CLEAR  - Clears the screen.<br>
                        EXIT   - Quits the terminal.<br>
                        HELP   - Provides Help information for Windows commands.<br>
                        TIME   - Displays or sets the system time.<br>
                        Uname  - use <code>uname -a</code> to view system information.<br>
                        LS     - List of directories.<br>
                        ECHO   - [agru..] &nbsp;&nbsp;&nbsp;&nbsp;
                        cowsay - [argu..] &nbsp;&nbsp;&nbsp;&nbsp;
                        let    - [vari..] ['='] [argu..] <br>
                        SUDO APT-GET UPDATE - To Update Packages.

                    `;
        } else if (command.trim() === 'time') {
            const currentTime = new Date().toLocaleTimeString();
            return `Current time: ${currentTime}`;
        } else if (command.startsWith('echo')) {
            let echoArgument = command.replace('echo', '').trim();

            if (echoArgument !== '') {
                // Check if the argument is an arithmetic expression
                if (/^[0-9+\-*/().\s]+$/.test(echoArgument)) {
                    try {
                        // Use eval to perform the arithmetic operation
                        let result = eval(echoArgument);
                        return result;
                    } catch (error) {
                        return 'Error in arithmetic expression.';
                    }
                } else {
                    return echoArgument;
                }
            } else {
                return 'No argument provided with echo command.<br> echo [argument]';
            }
        } else if (command.startsWith('#')) {
            return '';
        } else if (command.startsWith('cd ')) {
            const destination = command.substring(3).trim();

            const validDestinations = ["desktop", "document", "downloads", "music", "videos"];

            if (validDestinations.includes(destination)) {
                const newPath = `Spipixel@kali<span style="color: var(--red-color);">:~</span> ${destination}&nbsp;`;
                const styledPath = `<span style="color: var(--green-color);">${newPath}</span>`;
                title.textContent = `Spipixel@kali:~ ${destination}`;
                $('#path').html(styledPath);
                return '';
            } else {
                return 'The system cannot find the path specified.';
            }
        } else if (command.trim() === '') {
            return '';
        } else if (command === "[special] kali") {
            return `
            <pre>
 ____________________________________________________________________
|                                                                    |
|        //   //        ////       //           //////////////       |
|        //  //        //  //      //                 //             |
|        // //        //    //     //                 //             |
|        ////        //      //    //                 //             |
|        // //      ////////////   //                 //             |
|        //  //    //          //  //                 //             |
|        //   //  //            // ///////////  //////////////       |
|____________________________________________________________________|
            </pre>
            `;
        } else if (command.startsWith('cowsay')) {
            let words = command.replace('cowsay', '');

            return `
            ${words}
<pre>   
       \\
        \\
         \\ 
            ^___^
            (O O)\\________
            (___)\\        )/\\/
                ||------w |
                ||       ||

            </pre>
            `
        }
        return `'${command}' is not recognized as an internal or external command, <br> operable program or batch file. <br><br> Type "help" for available commands `;
    }
    function disableInput() {
        $('#input').prop('disabled', true);
        let line = document.querySelector(".line");
        line.style.display = 'none';
    }

    function enableInput() {
        $('#input').prop('disabled', false);
        let line = document.querySelector(".line");
        line.style.display = 'block'; // or 'inline' depending on your styling
    }

});



// Other js


let alert_msg = document.getElementById("alert");
let hide;

// For seach bar

function searchOnEnter(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Get the value of the input field
        let searchQuery = document.getElementById("search-query").value;

        // Encode the search query to include in the Google search URL
        let encodedSearchQuery = encodeURIComponent(searchQuery);

        // Construct the Google search URL
        let searchURL = `https://www.bing.com/search?q=${encodedSearchQuery}`;

        let bodies = document.getElementsByClassName('google-body');

        // Loop through all elements with the class 'google-body'
        for (let i = 0; i < bodies.length; i++) {
            let body = bodies[i];

            // Hide each element with the class 'google-body'
            body.style.display = 'none';
        }

        // Create a new iframe element
        let frame = document.createElement('iframe');

        // Set the iframe styles
        frame.style.width = '100%';
        frame.style.height = '100%';
        frame.style.border = 'none';
        frame.style.outline = 'none';

        // Set the source attribute of the iframe
        frame.setAttribute('src', searchURL);
        frame.setAttribute('id', 'main-frame')

        // Get the element with the class 'chrome-body' (assuming you want to append it there)
        let chrome = document.getElementsByClassName('chrome-body')[0];

        // Append the iframe to the 'chrome-body' element
        chrome.appendChild(frame);

        let search_url = document.getElementById('URL');
        search_url.value = searchURL;
    }
}

// For URL tob of window

function Search(event) {
    if (event.keyCode !== 13) {
        return;
    }

    let base_url_query = document.getElementById('URL');
    let url = base_url_query.value.replace(/\s/g, ''); // Replace spaces globally

    if (url.length > 1) {
        let searchURL = `https://www.bing.com/search?q=${encodeURIComponent(base_url_query.value)}`;
        let input = document.getElementById('URL');
        let main_window = document.getElementById('google-body');
        let frame = document.getElementById('main-frame') || createIframe();

        main_window.style.display = 'none';

        if (url === 'https://Chrome/NewTab') {
            input.value = '';
            frame.contentWindow.location.replace('about:blank');
            frame.style.display = 'none';
            main_window.style.display = 'block';
            input.value = url;
        } else if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('file:///')) {
            if (frame.style.display === 'block') {
                frame.contentWindow.location.replace('about:blank');
            }
            frame.setAttribute('src', url);
            input.value = url;
        } else {
            frame.contentWindow.location.replace('about:blank');
            frame.setAttribute('src', searchURL);
            input.value = searchURL;
        }
    }
}

function createIframe() {
    let frame = document.createElement('iframe');
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.border = 'none';
    frame.style.outline = 'none';
    frame.setAttribute('id', 'main-frame');
    let chrome = document.getElementsByClassName('chrome-body')[0];
    chrome.appendChild(frame);
    return frame;
}




setTimeout(() => {
    alert_msg.style.display = 'block';
    alert_msg.classList.add("show");
    hide = true
    if (hide = true) {
        setTimeout(() => {
            alert_msg.classList.add('hide');
            setTimeout(() => {
                alert_msg.style.display = 'none';
            }, 95);
            console.log("s")
        }, 5000);
    }
}, 2000);

const fullScreenMode = () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        setTimeout(() => {
            alert_msg.classList.add('hide');
            setTimeout(() => {
                alert_msg.style.display = 'none';
            }, 85);
            console.log("s")
        }, 1500);
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
        setTimeout(() => {
            alert_msg.classList.add('hide');
            setTimeout(() => {
                alert_msg.style.display = 'none';
            }, 85);
            console.log("s")
        }, 1500);
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
        setTimeout(() => {
            alert_msg.classList.add('hide');
            setTimeout(() => {
                alert_msg.style.display = 'none';
            }, 85);
            console.log("s")
        }, 1500);
    }

}


const options_open = (id, dropdownClassName, appBody) => {
    let element = document.getElementById(id);
    let dropdown_elements = document.getElementsByClassName(dropdownClassName);
    let body = document.getElementById(appBody);

    if (body) {
        body.addEventListener('click', function () {
            if (element.style.display === 'block') {
                // Hide the main element
                element.classList.add('hide');
                setTimeout(() => {
                    // Show the main element
                    element.classList.remove('hide');
                    element.style.display = 'none';
                }, 80);
            } else {
                return
            }
        })
    } else {
        console.error("Error: body not found");
    }

    // Check if the element exists and is hidden
    if (element && element.style.display === 'none') {
        // Iterate through each dropdown element
        for (let i = 0; i < dropdown_elements.length; i++) {
            let dropdown_element = dropdown_elements[i];

            // Check if the dropdown element is visible
            if (dropdown_element.style.display === 'block') {
                // Hide the dropdown element
                dropdown_element.style.display = 'none';
                element.classList.remove('hide');
                element.classList.add('show');
                setTimeout(() => {
                    // Show the main element
                    element.style.display = 'block';
                }, 85);
            } else {
                // Show the main element
                element.classList.remove('hide');
                element.classList.add('show');
                setTimeout(() => {
                    // Show the main element
                    element.style.display = 'block';
                }, 85);
            }
        }
    } else {
        // Hide the main element
        element.classList.remove('show');
        element.classList.add('hide');
        setTimeout(() => {
            // Show the main element
            element.style.display = 'none';
        }, 85);
    }
};

const chrome_home = () => {
    let frame = document.getElementById('main-frame');
    let body = document.getElementById('google-body');
    let search_bar = document.getElementById('search-query');

    let bodies = document.getElementsByClassName('google-body');
    let input = document.getElementById('URL');

    if (frame) {
        frame.style.display = 'none';
        frame.remove();

        // Loop through all elements with the class 'google-body'
        for (let i = 0; i < bodies.length; i++) {
            let body = bodies[i];

            // Hide each element with the class 'google-body'
            body.style.display = 'block';
        }
        input.value = 'https://Chrome/NewTab';
        search_bar.value = '';
    } else {

        body.style.display = 'none';
        setTimeout(() => {

            body.style.display = 'block';
        }, 100);
        input.value = 'https://Chrome/NewTab';
    }
}

// Function to set caching headers for images
async function setCacheHeadersForImages() {
    // Set the caching duration in seconds (e.g., 1 week)
    const cacheDuration = 7 * 24 * 60 * 60;

    // Get all image elements on the page
    const images = document.querySelectorAll('img');

    // Set caching headers for each image
    for (const image of images) {
        const imageUrl = image.src;

        // Append a timestamp or version number to the image URL to force a cache refresh when needed
        const cacheBustedUrl = imageUrl + '?v=1'; // You can use a timestamp or version number

        try {
            // Fetch the image to get the response headers
            const response = await fetch(cacheBustedUrl);

            if (response.ok) {
                // Clone the headers and set the caching header
                const headers = new Headers(response.headers);
                headers.set('Cache-Control', `public, max-age=${cacheDuration}`);

                // Use the cloned headers in the original fetch call
                const cachedResponse = new Response(response.body, { headers });

                // Replace the original response in the browser's cache
                await caches.open('images').then((cache) => {
                    cache.put(cacheBustedUrl, cachedResponse);
                });
            }
        } catch (error) {
            console.error('Error fetching or caching image:', error);
        }
    }
}

function rotateScreen() {
    if (window.innerWidth < 900) {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape-primary').catch(error => {
                console.error('Could not rotate the screen:', error);
            });
        } else if (screen.lockOrientation) {
            screen.lockOrientation('landscape-primary');
        }
    }
}

// Call the function initially and on window resize
rotateScreen();
window.addEventListener('resize', rotateScreen);


// Call the function when the page loads
window.onload = setCacheHeadersForImages;


// Attach the function to the input field's keyup event
document.getElementById("search-query").addEventListener("keyup", searchOnEnter);

// Call the function periodically to check for iframe existence and update the URL
setInterval(updateUrlFromIframe, 1000); // You can adjust the interval as needed

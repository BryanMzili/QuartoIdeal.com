var lateral = document.querySelector("#lateral");

handleResize();

function handleResize() {
    var lateral = document.querySelector("#lateral");
    if (screen.height <= 1000) {
        lateral.style.height = '1000px';
    } else if (screen.height > 1000) {
        lateral.style.height = screen.height + 'px';
    }
}

window.addEventListener('resize', handleResize);

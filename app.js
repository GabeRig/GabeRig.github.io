const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
	track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxMouseDelta = window.innerWidth / 2;

    const percentage = ((mouseDelta / maxMouseDelta) * -100);
    // Ensure nextPercentage stays within the desired range
	const nextPercentage = Math.max(Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0), -65);

	track.dataset.percentage = nextPercentage;
    console.info(track.dataset.percentage);

    // Apply the translation to the track
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 2000, fill: "forwards" });

    // Apply translation to individual images
    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            transform: `translateX(${3 * nextPercentage}%)`,
            objectPosition: `${100 + nextPercentage}% 50%`
        }, { duration: 2400, fill: "forwards" }); 
    }
}

// // Add scroll wheel functionality
// window.addEventListener("wheel", e => {
//     if (track.dataset.scrollPercentage === "0") return;

//     const scrollDir = Math.sign(e.deltaY);
//     const maxDelta = window.innerWidth / 2;

//     track.dataset.scrollPercentage = track.dataset.prevPercentage - scrollDir;
//     //(scrollDelta / maxDelta) * -100;
//     // Ensure nextPercentage stays within the desired range
//     const nextPercentage = Math.max(Math.min(parseFloat(track.dataset.prevPercentage) - track.dataset.scrollPercentage, 0), -88);

//     track.dataset.percentage = nextPercentage;
//     console.info(track.dataset.percentage);

//     // Apply the translation to the track
//     track.animate({
//         transform: `translate(${nextPercentage}%, -50%)`
//     }, { duration: 1200, fill: "forwards" });

//     // Apply translation to individual images
//     for (const image of track.getElementsByClassName("image")) {
//         image.animate({
//             objectPosition: `${100 + nextPercentage}% center`
//         }, { duration: 1200, fill: "forwards" }); 
//     }
// });

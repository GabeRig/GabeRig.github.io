const track = document.getElementById("image-track");
const pageNumber = document.getElementById("page-number");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
	track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if ( track.dataset.mouseDownAt === "0" ) return;

    let mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    let maxMouseDelta = window.innerWidth / 2;

    let percentage = ( ( mouseDelta / maxMouseDelta ) * -100 );
    // Ensure nextPercentage stays within the desired range
    let nextPercentage= Math.max( Math.min( parseFloat( track.dataset.prevPercentage ) + percentage, 0 ), track.dataset.percentageMax);

	track.dataset.percentage = nextPercentage;
    //console.info(track.dataset.percentage);

    // Apply the translation to the track
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 2000, fill: "forwards" });

    // Apply translation to individual images
    for ( const image of track.getElementsByClassName( "image" ) ) {
        image.animate(
            {
                transform: `translateX(${3 * nextPercentage}%)`,
                objectPosition: `${100 + nextPercentage}% 50%`
            },
            {
                duration: 2400,
                fill: "forwards",
                easing: "ease"
            });
    }

    // Maths for number translation
    const trackAbsolutePercentage = ( Math.round( ( track.dataset.percentage / track.dataset.percentageMax ) * 100) ) / 100;
    const imageIndex = Math.round( trackAbsolutePercentage * 7 );
    const translatePx = imageIndex * -30

    pageNumber.animate(
        {
            transform: `translateY( ${translatePx}px )`
        },
        {
            duration: 2000,
            easing: "ease-out"
        }
    ).onfinish = () => {
        // This function will be called when the animation finishes
        pageNumber.style.transform = `translateY( ${translatePx}px )`;
    };
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

//     // Apply the translation to the image-track
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
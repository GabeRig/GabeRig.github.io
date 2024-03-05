const track = document.getElementById("image-track");
const trackArray = Array.prototype.slice.call( document.getElementById('image-track').children );

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

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxMouseDelta = window.innerWidth / 2;

    const percentage = ( ( mouseDelta / maxMouseDelta ) * -100);
    // Ensure nextPercentage stays within the desired range
	const nextPercentage = Math.max(Math.min( parseFloat( track.dataset.prevPercentage ) + percentage, 0 ), track.dataset.percentageMax );

	track.dataset.percentage = nextPercentage;
    //console.info(track.dataset.percentage);

    // Apply the translation to the track
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 2000, fill: "forwards" });

    // Apply translation to individual images
    for (const image of track.getElementsByClassName( "image" ) ) {
        image.animate({
            transform: `translateX(${3 * nextPercentage}%)`,
            objectPosition: `${100 + nextPercentage}% 50%`
        }, { duration: 2400, fill: "forwards" });
    }

    updatePageNumber();

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

function getClosestImageToCenter( images ) {
    const viewportCenterX = window.innerWidth / 2;
    let closestImage = null;
    let minDistance = Infinity;

    for ( const image of images ) {
        const imageRect = image.getBoundingClientRect();
        const imageCenterX = ( imageRect.left + imageRect.right ) / 2;
        const distanceToCenter = Math.abs( viewportCenterX - imageCenterX );

        if ( distanceToCenter < minDistance ) {
            minDistance = distanceToCenter;
            closestImage = image;
        }
    }

    return closestImage;
}

const pageNumber = document.getElementById( "page-number" );
let closetImageIndex = 0;
let translatePx = 0;

function updatePageNumber() {

    //function for image closet to center
    const closestImage = getClosestImageToCenter( track.getElementsByClassName( "image" ) );

    if ( closestImage ) {
        // Perform actions for the closest image to the center
        closetImageIndex = trackArray.indexOf( closestImage );
        translatePx = closetImageIndex * -30;
        console.log( closetImageIndex );
    }



    pageNumber.animate(
        {
            transform: `translateY( ${translatePx}px )`
        },
        {
            duration: 2400,
            easing: "ease-in"
        }
    ).onfinish = () => {
        // This function will be called when the animation finishes
        pageNumber.style.transform = `translateY( ${translatePx}px )`;
    };
}
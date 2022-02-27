var myCircle;

function onMouseDrag(event) {
    // The radius is the distance between the position
    // where the user clicked and the current position
    // of the mouse.
    myCircle = new Path.Circle({
        center: event.downPoint,
        radius: (event.downPoint - event.point).length,
        fillColor: 'white',
        strokeColor: 'black'
    });

    // Remove this path on the next drag event:
    // myCircle.removeOnDrag();
};


export const styleMapping = {
    y: {
        t: "top",
        m: "marginTop",
        b: "bottom"
    },
    x: {
        l: "left",
        m: "marginLeft",
        r: "right"
    }
};

function addEvents(events) {
    events.forEach((cb, eventName) => {
        document.documentElement.addEventListener(eventName, cb);
    });
}

function removeEvents(events) {
    events.forEach((cb, eventName) => {
        document.documentElement.removeEventListener(eventName, cb);
    });
}

export {
    removeEvents,
    addEvents
}

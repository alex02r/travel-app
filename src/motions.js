export const motionFadeUp = {
    initial:{
        opacity: 0,
        y: 200
    },
    enter: {
        opacity: 1,
        y: 0,
        transition:{
            duration: 500
        }
    }
}

export const motionFadeLeft = {
    initial:{
        opacity: 0,
        x: -200
    },
    enter: {
        opacity: 1,
        x: 0,
        transition:{
            duration: 500
        }
    }
}
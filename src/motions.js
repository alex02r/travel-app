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
export const motionFadeIn = {
    initial:{
        opacity: 0,
        scale: 0,
        rotate: 180,
    },
    enter: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition:{
            duration: 600
        }
    }
}
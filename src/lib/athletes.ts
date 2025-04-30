
export interface AthleteAssets {
    mobile: string
    desktop: string
}

export const ATHLETE_ASSETS: Record<string, AthleteAssets> = {
    ronaldo123: {
        mobile: '/ronaldo-mobile.jpg',
        desktop: '/ronaldo-desktop.png',
    },
    messi123: {
        mobile: '/messi-mobile.jpg',
        desktop: '/messi-desktop.png',
    },
    lebron123: {
        mobile: '/lebron-mobile.jpg',
        desktop: '/lebron-desktop.png',
    },
    tombrady123: {
        mobile: '/brady-mobile.jpg',
        desktop: '/brady-desktop.png',
    },
    shohei123: {
        mobile: '/shohei-mobile.jpg',
        desktop: '/shohei-desktop.png',
    },
    judge123: {
        mobile: '/judge-mobile.jpg',
        desktop: '/judge-desktop.png',
    },
    mbappe123: {
        mobile: '/mbappe-mobile.jpg',
        desktop: '/mbappe-desktop.png',
    },
    curry123: {
        mobile: '/curry-mobile.jpg',
        desktop: '/curry-desktop.png',
    },
    goku123: {
        mobile: '/goku-mobile.jpg',
        desktop: '/goku-desktop.png',
    },
    yoda123: {
        mobile: '/yoda-mobile.jpg',
        desktop: '/yoda-desktop.png',
    },
    rick123: {
        mobile: '/rick-mobile.jpg',
        desktop: '/rick-desktop.png',
    },
    alucard123: {
        mobile: '/alucard-mobile.jpg',
        desktop: '/alucard-desktop.png',
    },
}

// fallback if somehow the cookie isn't set
export const DEFAULT_ASSETS: AthleteAssets = {
    mobile: '/ronaldo-mobile.jpg',
    desktop: '/ronaldo-desktop.png',
}

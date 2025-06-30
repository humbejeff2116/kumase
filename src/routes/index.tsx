



const basePath = '/student/portal';
const appRoutes = {
    index: '/',
    about: `/about`,
    courses: `/courses`,
    contact: `/contact`,
    terms: `/terms`,
    privacy: `/privacy`,
    signIn: `/sign-in`,
    signUp: `/sign-up`,
    
    home: basePath,
    onboard: `${basePath}/onboard`,
    profile: `${basePath}/profile`,
    notification: `${basePath}/notifications`,
    settings: `${basePath}/settings`,
    signOut: `${basePath}/sign-out`,
    search: `${basePath}/search`,
    courseForm: `${basePath}/course-form`,
    courseReg: `${basePath}/course-reg`,
    account: `${basePath}/account`,
}

export default appRoutes;
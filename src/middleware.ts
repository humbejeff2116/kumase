import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authenticateUser, authenticateAccountToken } from './services/services.http';
import appRoutes from './routes';
// import { cookies } from 'next/headers';
 

export const cookieKey = "loginCookie";

export async function middleware(req: NextRequest) {
  // const cookieStore = await cookies()
  //  const currentUser = cookieStore.get(cookieKey)?.value;
    const currentUser = req.cookies.get(cookieKey)?.value;

    console.log('current user middleware', currentUser);

    if (!currentUser) {
      return NextResponse.redirect(new URL(appRoutes.signIn, req.url))
    }

    // get time in seconds
    const currTime = Math.floor(Date.now()/1000);

    if (currTime > JSON.parse(currentUser).jwtExpireAt) {
      req.cookies.delete(cookieKey);
      // cookieStore.delete(cookieKey)
      const response = NextResponse.redirect(new URL(appRoutes.signIn, req.url));
      response.cookies.delete(cookieKey);
      return response; 
    }

    try {
      const authenticateUserResponse = await authenticateAccountToken(JSON.parse(currentUser));

      // if (!authenticateUserResponse) {
      //   return NextResponse.redirect(new URL(appRoutes.signIn, req.url));
      // }
      
      if (authenticateUserResponse.status !== 200 && !authenticateUserResponse.authenticated) {
        return NextResponse.redirect(new URL(appRoutes.signIn, req.url));
      }
      NextResponse.next();
    } catch(err) {
      console.log(err);
    }
}
 
// current middleware should be run on only student paths;
// TODO... change null to student when ready to use  functionality 
export const config = {
  matcher: '/null/:path*',
}



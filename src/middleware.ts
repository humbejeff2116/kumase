import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authenticateUser, authenticateUserToken } from './services/services.http';
 

export const cookieKey = "loginCookie";

export async function middleware(req: NextRequest) {
    const currentUser = req.cookies.get(cookieKey)?.value;

    if (!currentUser) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // get time in seconds
    const currTime = Math.floor(Date.now()/1000);

    if (currTime > JSON.parse(currentUser).jwtExpireAt) {
      req.cookies.delete(cookieKey);
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete(cookieKey);
      return response; 
    }

    try {
      const authenticateUserResponse = await authenticateUserToken(JSON.parse(currentUser));

      if (!authenticateUserResponse) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      
      if (authenticateUserResponse.status !== 200 && authenticateUserResponse.authenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch(err) {
      console.log(err);
    }
}
 
// current middleware should be run on only home paths;
// TODO... change null to home when ready to use  functionality 
export const config = {
  matcher: '/null/:path*',
}



import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const jwt =
            context.switchToHttp().getRequest().cookies?.Authentication
            || context.switchToHttp().getRequest().headers?.authentication
            || getToken(context.switchToHttp().getRequest().headers?.['set-cookie']);
        console.log('jwtauthguard', jwt)
        if (!jwt) {
            return false;
        }

        return this.authClient.send('authenticate', {
            Authentication: jwt
        })
            .pipe(
                tap((res) => {
                    context.switchToHttp().getRequest().user = res;
                }),
                map(() => true)
            )
    }

}

function getToken(authString: any): string | null {
    if (Array.isArray(authString)) {
        // If it's an array, get the first item
        authString = authString[0];
    }
    
    if (typeof authString === 'string' && authString.startsWith('Authentication=')) {
        return authString.substring('Authentication='.length);
    }
    
    return null;
}
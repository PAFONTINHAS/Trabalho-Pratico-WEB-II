import { HttpInterceptorFn } from "@angular/common/http";

const AUTH_TOKEN_KEY = "auth_token";

export const authInterceptor: HttpInterceptorFn = (req, next) =>{
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if(token){
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return next(cloned);
    }

    return next(req);
}
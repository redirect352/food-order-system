import Cookies from 'js-cookie';

export class CookieService {
  static getCurrentUser() {
    const currentUser = Cookies.get('currentUser');
    if (currentUser) {
       return JSON.parse(currentUser);
    }
    return null;
  }
  static getDefaultMenuPageSize() {
    const pageSizeCookie = Cookies.get('menuPageSize');
    if (pageSizeCookie) {
       const pageSize = JSON.parse(pageSizeCookie);
       if (+pageSize && +pageSize > 0 && +pageSize < 25) {
        return +pageSize;
       }
    }
    Cookies.set('menuPageSize', '10',{expires:new Date(new Date().getTime() + 3600)});
    return 10;
  }
}

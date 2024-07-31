import Cookies from 'js-cookie';

export class CookieService {
  static getCurrentUser() {
    const currentUser = Cookies.get('currentUser');
    if (currentUser) {
       return JSON.parse(currentUser);
    }
    return null;
  }
}

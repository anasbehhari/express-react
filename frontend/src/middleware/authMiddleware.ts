import {LoaderFunctionArgs, redirect} from 'react-router-dom';
import {authApi} from '../api/auth';

export const requireAuth = async ({request}: LoaderFunctionArgs) => {
  try {
    // Check authentication status
    const isAuthenticated = await authApi.getMe();

    if (!isAuthenticated) {
      // Preserve the original URL for redirect after login
      const params = new URLSearchParams();
      params.set('from', new URL(request.url).pathname);

      return redirect('/login?' + params.toString());
    }

    return null;
  } catch (error) {
    return redirect('/login');
  }
};

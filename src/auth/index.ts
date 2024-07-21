export const getToken = () => {
    return localStorage.getItem('access_token');
  };
  
  export const isLoggedIn = () => {
    return !!getToken();
  };
  
  export const login = async (email: string, password: string) => {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('access_token', data.access_token);

      console.log(localStorage.getItem('access_token'))

    } else {
      throw new Error(data.message || 'Login failed');
    }
  };
  
  export const logout = () => {
    localStorage.removeItem('access_token');
  };
  
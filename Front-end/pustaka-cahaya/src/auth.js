export const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email":email, "password":password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      console.log(data.data.token);
      sessionStorage.setItem('token', data.data.token); // Store the token in session storage
      return
    } catch (err) {
      throw err;
    }
  };
  
  export const logout = () => {
    sessionStorage.removeItem('token'); // Remove the token from session storage
  };
  
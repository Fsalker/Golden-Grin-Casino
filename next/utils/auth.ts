const jwtIsValid = (jwt: string | null): boolean => !!jwt; // TODO: Implement actual logging in

export const checkIfUserIsLoggedIn = (): boolean => {
  // if (typeof window === 'undefined') {
  //   // Local Storage might be unavailable (NextJs must first render the page to the clients...)
  //   console.log('Window is undefined - cannot check JWT');
  //   return null;
  // }
  // ^Fixed by using useEffect()

  const jwt: string | null = localStorage.getItem('jwt');
  const validJwt: boolean = jwtIsValid(jwt);

  return jwtIsValid(jwt);
};

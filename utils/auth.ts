const jwtIsValid = (jwt: string | null): boolean => !!jwt;

export const checkIfUserIsLoggedIn = (): boolean => {
  // if (typeof window === 'undefined') {
  //   // Local Storage might be unavailable (NextJs must first render the page to the clients...)
  //   console.log('Window is undefined - cannot check JWT');
  //   return null;
  // }
  // ^Fixed by using useEffect()

  const jwt: string | null = localStorage.getItem("jwt");

  return jwtIsValid(jwt);
};

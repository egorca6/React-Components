export const validateFirstName = (firstName: string) => {
  const firstLetter = firstName.charAt(0);
  return firstLetter === firstLetter.toUpperCase();
};
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const handleValidation = (formData: FormData) => {
  const firstName = formData.get('firstName') as string;
  const email = formData.get('email') as string;
  const errorsObj: { [key: string]: string } = {};

  if (!/^[A-Z]/.test(firstName)) {
    errorsObj.firstName =
      'Please enter a firstName starting with an uppercase letter.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorsObj.email = 'Please enter a valid email address.';
  }

  return true;
};

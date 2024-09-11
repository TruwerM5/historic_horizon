export const useSignInOverlay = () => useState("signinOverlay", () => false);

export function toggleSignInOverlay() {
  useSignInOverlay().value = !useSignInOverlay().value;
}

export const useSignInForm = () =>
  useState("signinForm", (): "login" | "signup" => "login");

export function switchSignInForm(state: "login" | "signup") {
  useSignInForm().value = state;
}

export function validatePasswords(pass1: string, pass2?: string) {
  //check if password < 10 chars or doesn't have number or char
  if (!pass1.match(/(?=.*[a-zA-Z])(?=.*\d).{10,}/)) {
    return "Ненадежный пароль.";
  }
  if (pass2 && pass1 != pass2) {
    return "Пароли не совпадают.";
  }
}

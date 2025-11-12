// src/lib/actionCodeSettings.ts
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const actionCodeSettings = {
  verifyLogin: {
    url: `${APP_URL}/verify-login`,
    handleCodeInApp: true,
  },
  resetPassword: {
    url: `${APP_URL}/new-password`,
    handleCodeInApp: true,
  },
};

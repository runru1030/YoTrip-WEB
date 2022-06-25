import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin, { credential } from "firebase-admin";
const fireConfig = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_PID,
  private_key_id: process.env.NEXT_PUBLIC_PKID,
  private_key: process.env.NEXT_PUBLIC_PK?.replace(/\\n/g, "\n"),
  client_email: process.env.NEXT_PUBLIC_CEMAIL,
  client_id: process.env.NEXT_PUBLIC_CIE,
  auth_uri: process.env.NEXT_PUBLIC_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_AUTH_CERT,
  client_x509_cert_url: process.env.NEXT_PUBLIC_C_CERT,
};

const firebaseApp =
  (global as any).firebaseApp ??
  initializeApp({
    credential: credential.cert(fireConfig as any),
  });

(global as any).firebaseApp = firebaseApp;

export const firebaseAuth = getAuth(firebaseApp);

// export default admin;

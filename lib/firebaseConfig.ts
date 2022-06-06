export const fireConfig = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_PID,
  private_key_id: process.env.NEXT_PUBLIC_PKID,
  private_key: process.env.NEXT_PUBLIC_PK,
  client_email: process.env.NEXT_PUBLIC_CEMAIL,
  client_id: process.env.NEXT_PUBLIC_CIE,
  auth_uri: process.env.NEXT_PUBLIC_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_AUTH_CERT,
  client_x509_cert_url: process.env.NEXT_PUBLIC_C_CERT,
};

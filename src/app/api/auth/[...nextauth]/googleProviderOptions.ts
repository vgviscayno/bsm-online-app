export default function getGoogleProviderCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "Something went wrong in getting google provider credentials"
    );
  }
  return {
    clientId,
    clientSecret,
  };
}

export const phoneCredentialsProviderConfig = {
  credentials: {
    phoneNumber: { label: "Phone Number" },
  },
  async authorize(credentials, req) {
    return null;

    //     // get phone number
    //     // validate phone number, if invalid return null
    //     // send OTP to phone number
    //     // retrieve user using phone number
    //     // return user
  },
};

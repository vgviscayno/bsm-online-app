export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);

  // check if user exists
  // try to find user by phone number

  return Response.json({});
}

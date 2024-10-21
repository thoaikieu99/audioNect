import { serialize } from "cookie";
export default async function (req, res) {
  /* remove cookies from request header */
  res.setHeader("Set-Cookie", [
    serialize("too", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);

  res.writeHead(302, { Location: "/" });
  res.end();
}

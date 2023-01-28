// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
// This function can be marked `async` if using `await` inside
type authRes = {
  status: boolean;
  user: { [k: string]: any };
  message: string;
};

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("6gR265$m_t0k3n")?.value;
    const { status, user, message }: authRes = await fetch(
      "http://localhost:5000/api/v1/user/auth",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "POST",
      }
    ).then(async (res) => {
      if (!res.ok) {
        const { message } = await res.json();
        console.log(`From middleware: ${message}`);
        throw new Error();
      }
      return res.json();
    });
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/checkin", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};

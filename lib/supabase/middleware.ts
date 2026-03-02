import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_ALLOWED_EMAIL = process.env.ADMIN_ALLOWED_EMAIL || "mohcherif2012@gmail.com";

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si Supabase n'est pas configuré (ex. Vercel sans variables), on laisse passer sans auth
  if (!supabaseUrl || !supabaseAnonKey) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims as { email?: string } | undefined;
    const email = claims?.email;

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!email) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (email.toLowerCase() !== ADMIN_ALLOWED_EMAIL.toLowerCase()) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return supabaseResponse;
  } catch {
    // En cas d'erreur (réseau, clé invalide, etc.), on laisse passer pour ne pas bloquer le site
    if (request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next({ request });
  }
}

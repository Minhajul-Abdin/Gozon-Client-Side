import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getUserSession } from "@/lib/core/session";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const user = await getUserSession();

    const formData = await req.formData();
    const price = formData.get("price");
    const title = formData.get("propertyTitle");
    const propertyId = formData.get("propertyId");
    const name = formData.get("name");

    console.log(price, title, propertyId, name);

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: Number(price),
        userId: user.id,
        userEmail: user.email,
        title,
        propertyId,
        name,
      },
      mode: "payment",
      success_url: `${origin}/properties/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

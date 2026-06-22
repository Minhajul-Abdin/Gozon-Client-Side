import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const body = await req.json();
    const { type } = body;

    const user = await getUserSession();

    // Create Checkout Sessions from body params.
    let lineObj;
    let metaObj = {};
    if (type == "payment") {
      lineObj = {
        price_data: {
          currency: "usd",
          unit_amount: body?.ticketPrice * 100,
          product_data: {
            name: body?.eventTitle,
          },
        },
        quantity: 1,
      };
    }

    metaObj = {
      email: user?.email || "",
      userId: user?.id || "",
      propertyId: body?.propertyId,
      paymentType: type,
      propertyTitle: body?.propertyTitle || "",
      amount: parseFloat(body?.price).toFixed(2) * body?.quantity,
      quantity: body?.quantity,
    };

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [lineObj],
      metadata: metaObj,
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

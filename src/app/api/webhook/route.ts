import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createBooking, updateHotelRoom } from '@/libs/apis';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16' as Stripe.LatestApiVersion,
});

// Define a custom type for your metadata structure
interface Metadata {
  adults: string;
  checkinDate: string;
  checkoutDate: string;
  children: string;
  hotelRoom: string;
  numberOfDays: string;
  user: string;
  discount: string;
  totalPrice: string;
}

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("session =>", session);

      // Ensure metadata is not null before proceeding
      const metadata = session.metadata;
      if (!metadata) {
        return new NextResponse('Missing metadata', { status: 400 });
      }

      // Use a type assertion to assert that metadata conforms to the expected structure
      const {
        adults,
        checkinDate,
        checkoutDate,
        children,
        hotelRoom,
        numberOfDays,
        user,
        discount,
        totalPrice,
      } = metadata as Metadata;

      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      // Update hotel Room
      await updateHotelRoom(hotelRoom);

      return NextResponse.json('Booking successful', {
        status: 200,
        statusText: 'Booking Successful',
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}

import { getRoomReviews } from '@/libs/apis';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const roomId = params.id;

  console.log('Received request for room ID:', roomId);

  try {
    const roomReviews = await getRoomReviews(roomId);

    if (!roomReviews || roomReviews.length === 0) {
      return NextResponse.json({ message: 'No reviews found' }, { status: 404 });
    }

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    console.error('Getting Review Failed:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Unable to fetch reviews. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

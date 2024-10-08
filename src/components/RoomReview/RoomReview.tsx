import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';

import { Review } from '@/models/review';
import Rating from '../Rating/Rating';

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  const fetchRoomReviews = async (url: string) => {
    try {
      const { data } = await axios.get<Review[]>(url);
      return data;
    } catch (err) {
      console.error('Error fetching room reviews:', err);
      throw err;
    }
  };

  const { data: roomReviews, error } = useSWR(
    roomId ? `/api/room-reviews/${roomId}` : null,
    fetchRoomReviews
  );

  if (!roomId) {
    return <div>No room selected.</div>;
  }

  if (error) {
    return <div>Failed to load reviews. Please try again later.</div>;
  }

  if (!roomReviews) {
    return <div>Loading...</div>;
  }

  if (roomReviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  return (
    <>
      {roomReviews.map((review) => (
        <div
          className='bg-gray-100 dark:bg-gray-900 p-4 rounded-lg'
          key={review._id}
        >
          <div className='font-semibold mb-2 flex'>
            <p>{review.user.name}</p>
            <div className='ml-4 flex items-center text-tertiary-light text-lg'>
              <Rating rating={review.userRating} />
            </div>
          </div>
          <p>{review.text}</p>
        </div>
      ))}
    </>
  );
};

export default RoomReview;

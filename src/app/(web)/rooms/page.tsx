"use client";

import RoomCard from "@/app/components/RoomCard/RoomCard";
import Search from "@/app/components/Search/Search";
import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Rooms = () => {
    const [roomTypeFilter, setRoomTypeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchParams = useSearchParams();
  
    useEffect(() => {
        const searchQueryParam = searchParams.get('searchQuery');
        const roomTypeParam = searchParams.get('roomType');
    
        if (roomTypeParam) setRoomTypeFilter(roomTypeParam);
        if (searchQueryParam) setSearchQuery(searchQueryParam);
    }, [searchParams]);
  
    async function fetchData() {
        return getRooms(); // Ensure getRooms is implemented to fetch room data
    }
  
    const { data, error, isLoading } = useSWR('get/hotelRooms', fetchData);
    if (error) {
        console.error('Fetch error:', error);
        return <div>Error fetching data</div>; // Display an error message
    }

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    const filterRooms = (rooms: Room[]) => {
        return rooms.filter(room => {
            // Apply room type filter
            if (
                roomTypeFilter &&
                roomTypeFilter.toLowerCase() !== 'all' &&
                room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
            ) {
                return false;
            }

            // Apply search query filter
            if (
                searchQuery &&
                !room.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false;
            }

            return true;
        });
    };

    // Render rooms based on fetched data
    const filteredRooms = filterRooms(data || []);

    return (
        <div className='container mx-auto pt-10'>
            <Search
                roomTypeFilter={roomTypeFilter}
                searchQuery={searchQuery}
                setRoomTypeFilter={setRoomTypeFilter}
                setSearchQuery={setSearchQuery}
            />
            <h1>Rooms</h1>
            <div className="flex mt-20 justify-between flex-wrap">
                {filteredRooms.map(room => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
};

export default Rooms;

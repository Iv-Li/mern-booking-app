import { IHotelRes } from 'server/shared/types';

export const hotels = Array.from({ length: 10 }).fill({
  "_id": "65b91f04f1fc8a8db5beaf7b",
  "userId": "65b8ea30765bc5ecf4e3bf98",
  "name": "name",
  "city": "city",
  "country": "country",
  "description": "description",
  "type": "type",
  "adultCount": 4,
  "childCount": 2,
  "facilities": [
    "jk",
    "jl"
  ],
  "pricePerNight": 5,
  "starRating": 4,
  "imageUrls": [
    "http://res.cloudinary.com/dugwkhap9/image/upload/v1706630916/ias8az6mqntbupscc4fk.png",
    "http://res.cloudinary.com/dugwkhap9/image/upload/v1706630916/pbn7jhvffymgmwuibukk.png"
  ],
  "lastUpdated": 1706631223081,
  "bookings": [],
  "__v": 0
} as IHotelRes) as IHotelRes[]
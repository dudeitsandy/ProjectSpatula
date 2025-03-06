import { kitchens } from './mockData';

export const mockBookings = [
  {
    id: 1,
    userId: '1',
    kitchenId: 1,
    startTime: '2024-03-15T10:00',
    endTime: '2024-03-15T14:00',
    totalPrice: 300,
    status: 'upcoming',
    kitchen: kitchens.find(k => k.id === 1)
  },
  {
    id: 2,
    userId: '1',
    kitchenId: 3,
    startTime: '2024-03-10T09:00',
    endTime: '2024-03-10T12:00',
    totalPrice: 285,
    status: 'completed',
    kitchen: kitchens.find(k => k.id === 3)
  },
  {
    id: 3,
    userId: '1',
    kitchenId: 5,
    startTime: '2024-03-20T15:00',
    endTime: '2024-03-20T19:00',
    totalPrice: 220,
    status: 'upcoming',
    kitchen: kitchens.find(k => k.id === 5)
  },
  {
    id: 4,
    userId: '1',
    kitchenId: 2,
    startTime: '2024-02-28T13:00',
    endTime: '2024-02-28T16:00',
    totalPrice: 135,
    status: 'completed',
    kitchen: kitchens.find(k => k.id === 2)
  },
  {
    id: 5,
    userId: '1',
    kitchenId: 8,
    startTime: '2024-03-25T11:00',
    endTime: '2024-03-25T15:00',
    totalPrice: 340,
    status: 'upcoming',
    kitchen: kitchens.find(k => k.id === 8)
  },
  {
    id: 6,
    userId: '1',
    kitchenId: 4,
    startTime: '2024-02-15T10:00',
    endTime: '2024-02-15T13:00',
    totalPrice: 195,
    status: 'completed',
    kitchen: kitchens.find(k => k.id === 4)
  }
];

// Mock booking service
export const bookingService = {
  getBookings: (userId) => {
    return mockBookings.filter(booking => booking.userId === userId);
  },

  createBooking: (bookingData) => {
    const newBooking = {
      id: mockBookings.length + 1,
      ...bookingData,
      status: 'upcoming',
      kitchen: kitchens.find(k => k.id === bookingData.kitchenId)
    };
    mockBookings.push(newBooking);
    return newBooking;
  }
}; 
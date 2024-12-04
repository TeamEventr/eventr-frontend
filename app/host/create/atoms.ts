import { atom } from 'recoil';


interface DateTime{
    date: string;
    time: string;
}

interface Gallery {
  imageURL: string;
}

interface PriceTier {
    name: string;
    timeSlot: Date;
    price: string;
    totalSeats: string;
}

interface Artist {
    userId: string,
    role: string,
}

export const stepState = atom({
    key: 'stepState',
    default: 1,
});

export const eventDurationState = atom({
    key: 'eventDurationState',
    default: {
        value: '',
        unit: '',
    },
});

export const ticketInputState = atom({
    key: 'ticketInputState',
    default: {
        start: { date: '', time: '' } as DateTime,
        name: '',
        price: '',
        totalSeats: '',
    },
});

export const eventMetadataState = atom({
  key: 'eventMetadataState',
  default: {
    title: '',
    description: '',
    tags: [] as string[],
    category: '',
    venue: '',
    duration: '',
    ageLimit: '',
    bookingOpenTime: { date: '', time: '' } as DateTime,
    bookingCloseTime: { date: '', time: '' } as DateTime,
    priceTiers: [] as PriceTier[],
    thumbnailURL: '',
    coverPictureURL: '',
    gallery: [] as Gallery[],
    artists: [] as Artist[],
  },
});



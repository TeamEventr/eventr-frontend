const EventData = {
    "EventId": 1,
    "EventName": "Sample Music Festival",
    "HostId": 101,
    "Description": "A sample music festival event for testing purposes. This is a dummy event. Join us for an unforgettable experience filled with live music, food stalls, and fun activities. Enjoy performances from top artists and discover new talents. Perfect for music lovers of all ages. Don't miss out on this exciting event!",
    "ThumbnailURL": "https://example.com/thumbnail.jpg",
    "CoverPictureURL": "https://example.com/cover.jpg",
    "BannerURL": "https://example.com/banner.jpg",
    "Visibility": "live",
    "EventTags": ["music", "festival", "live"],
    "Schedule": "onTime",
    "Venue": "Open Grounds",
    "StartingTime": "2024-09-20T18:00:00",
    "EndingTime": "2024-09-20T23:00:00",
    "Duration": "5 hours",
    "AgeLimit": 18,
    "TotalTickets": 1000,
    "CreatedAt": "2024-08-10T10:00:00",
    "UpdatedAt": "2024-08-15T14:00:00",
    "DeletedAt": null,
    "LastCustomNotif": "2024-09-05T12:30:00",
    "Artists": [
    {
        "ArtistId": 201,
        "Role": "Lead Singer"
    },
    {
        "ArtistId": 202,
        "Role": "Guitarist"
    },
    {
        "ArtistId": 203,
        "Role": "Drummer"
    }
    ]
}
  
const ArtistData = {
    "Artists": [
        {
        "ArtistId": 201,
        "Name": "John Doe",
        "Image": "https://example.com/johndoe.jpg"
        },
        {
        "ArtistId": 202,
        "Name": "Jane Smith",
        "Image": "https://example.com/janesmith.jpg"
        },
        {
        "ArtistId": 203,
        "Name": "Michael Lee",
        "Image": "https://example.com/michaellee.jpg"
        }
    ]
}

const EventListData = [
    {
      id: "1",
      title: "Music Fiesta",
      startTime: "2024-12-15T18:30:00Z",
      venue: "Downtown Arena",
      thumbnailURL: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      title: "Tech Conference",
      startTime: "2024-12-20T09:00:00Z",
      venue: "Tech Park Auditorium",
      thumbnailURL: "https://images.unsplash.com/photo-1581091870637-6c811b1b18d5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      title: "Art Exhibition",
      startTime: "2024-12-22T14:00:00Z",
      venue: "City Art Gallery",
      thumbnailURL: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      title: "Food Carnival",
      startTime: "2024-12-25T16:00:00Z",
      venue: "Central Park",
      thumbnailURL: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      title: "Stand-Up Comedy",
      startTime: "2024-12-27T20:00:00Z",
      venue: "Comedy Club",
      thumbnailURL: "https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

export { EventData, ArtistData, EventListData };
import React from 'react';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const events = [
  // {
  //   title: "Tech Conference 2023",
  //   location: "San Francisco, CA",
  //   startTime: "2023-11-05 10:00 AM",
  //   endTime: "2023-11-05 5:00 PM",
  //   description: "Join us for the biggest tech conference of the year, featuring industry experts and the latest in technology trends.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjY1OXwwfDF8c2VhcmNofDEwfHxjb250ZXh0fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
  // },
  // {
  //   title: "UI/UX Design Workshop",
  //   location: "New York, NY",
  //   startTime: "2023-11-12 9:00 AM",
  //   endTime: "2023-11-12 4:00 PM",
  //   description: "A hands-on workshop focusing on UI/UX design principles, trends, and best practices.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  // },
];

export default function Eventspage() {

  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    setModalContent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div
        style={{
          position: 'relative',
          padding: '4rem 0',
          textAlign: 'center',
          background: '#F2F7FD',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '10vw',
            fontWeight: 'bold',
            color: '#0082FC',
            opacity: '0.2',
            position: 'absolute',
            inset: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Ekukhanyeni
        </div>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'sans-serif',
            color: '#2d3748',
            marginBottom: '0.5rem',
          }}
        >
          Events
        </h1>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>
          <span
            style={{ cursor: 'pointer' }}
            onMouseOver={(e) => (e.target.style.color = '#3182ce')}
            onMouseOut={(e) => (e.target.style.color = '#718096')}
          >
            Home
          </span>{' '}
          | <span style={{ fontWeight: '500' }}>Contacts</span>
        </div>
      </div>

      <div>
      {/* <div
        style={{
          position: 'relative',
          padding: '2.5rem 1rem',
          textAlign: 'center',
          background: '#F2F7FD',
          marginBottom: '2rem',
        }}
      >
       
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 justify-center">
        {events.map((event, index) => (
          <Card key={index} className="w-full">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {event.title}
              </Typography>
              <Typography color="gray" className="mb-2">
                {event.location}
              </Typography>
              <Typography className="mb-2">
                {event.startTime} - {event.endTime}
              </Typography>
              <Typography>{event.description}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="outlined"
                className="hover:bg-blue-600 hover:text-white"
                onClick={() => handleOpenModal(event)}
              >
                View More
              </Button>
            </CardFooter>
          </Card>
        ))}       
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-md max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{modalContent.title}</h2>
            <p><strong>Location:</strong> {modalContent.location}</p>
            <p><strong>Start Time:</strong> {modalContent.startTime}</p>
            <p><strong>End Time:</strong> {modalContent.endTime}</p>
            <p><strong>Description:</strong> {modalContent.description}</p>
            <Button className="mt-4" onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import YouTube from 'react-youtube'
import prismadb from '@/lib/prismadb';
import { Button } from '@/components/ui/button';
import ModalToBuy from '@/components/modals/ModalToBuy';
// import { Training } from '@prisma/client';
import Image from "next/image"

interface VideoItem {
    id: string;
    title: string;
    thumbnailUrl: string;
    price: string
}


function extractYouTubeVideoID(url:string) {
    // Regular expression to match the YouTube video ID
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/))([\w-]{11})/;

    // Extract the video ID from the URL using the regular expression
    const match = url.match(regex);

    // Return the video ID or null if not found
    return match ? match[1] : null;
}


const Training: React.FC = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 9;

    useEffect(() => {
        const googleapiKey = "AIzaSyBREZFrvbOLG3rb9ATsQfANL4kT3ryzfT4";
        const channelId = 'UCPiOYHhVeVSmJWqQfSPcCdw';
        const playListId = "PLhYNKksltItMqqDCgKyb-KLpoiVfyi9DX"

        axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                key: googleapiKey,
                channelId: channelId,
                part: 'snippet',
                maxResults: 100,
                order: 'date',
            },
        })
            .then(async (response) => {


                const data = await axios.get(`/api/trainings`)

                const videosData: VideoItem[] = response.data.items.map((item: any) => {
                    const id = item.id.videoId;
                    const title = item.snippet.title;
                    const thumbnailUrl = item.snippet.thumbnails.medium.url;

                    const current = data.data.find((it: any) => {
                        const videoid = extractYouTubeVideoID(it.url)

                        if (videoid == id) {
                            return it
                        }
                    })


                    return {
                        id, title, thumbnailUrl,
                        price: current?.price || 0
                    }
                })
                setVideos(videosData);
            })
            .catch((error) => {
                console.error('Error fetching videos:', error);
            });
    }, []);

    const handleVideoClick = (videoId: string) => {
        setSelectedVideo(videoId);
    };

    // Pagination
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videos.length / videosPerPage); i++) {
        pageNumbers.push(i);
    }


    // for non subscriber 
    const [subscriber, setSubscriber] = useState(false)
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false)


    const handleCardSelect = (price: number, title: string) => {
        if (selectedCards.includes(title)) {
            setSelectedCards((prevSelectedCards) => prevSelectedCards.filter((cardTitle) => cardTitle !== title));
            setTotalPrice((prevTotalPrice) => prevTotalPrice - Number(price));
        } else {
            setSelectedCards((prevSelectedCards) => [...prevSelectedCards, title]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + Number(price));
        }
    };



    return (
        <>
            {subscriber &&
                <>
                    <div className="container mx-auto px-6 md:px-12 pb-12 ">
                        <h1 className="text-3xl font-bold mb-4  py-10">Training Videos</h1>
                        <div className="flex justify-center my-4">
                            {pageNumbers.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={`mr-2 px-3 py-1 rounded-lg ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                        }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                            {currentVideos.map((video) => (
                                <div key={video.id} className="border  border-amber-900 rounded-lg overflow-hidden shadow-md cursor-pointer ">
                                    <Image
                                        width={40}
                                        height={40}
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        className="w-full object-cover"
                                        onClick={() => handleVideoClick(video.id)}
                                    />
                                    <div className="p-4 ">
                                        <h3 className="text-lg font-semibold mb-2">{video?.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
                            <div className="w-4/5 h-3/4">
                                <YouTube videoId={selectedVideo} opts={{ width: '100%', height: '400' }} />
                            </div>
                            <button className="absolute top-4 right-4 text-2xl" onClick={() => setSelectedVideo(null)}>
                                &#10005;
                            </button>
                        </div>
                    )}
                </>
            }

            {!subscriber &&
                <>
                    <section className="py-12 ">
                        <div className="container mx-auto px-6 md:px-12">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-3/4 p-4 md:order-1 order-2">

                                    <div className="flex justify-center my-4">
                                        {pageNumbers.map((pageNumber) => (
                                            <button
                                                key={pageNumber}
                                                className={`mr-2 px-3 py-1 rounded-lg ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                                    }`}
                                                onClick={() => handlePageChange(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        ))}
                                    </div>

                                    {currentVideos.map((card, index) => (
                                        <div
                                            key={index}
                                            className={`border p-4 mt-2 rounded-lg shadow cursor-pointer ${selectedCards.includes(card.title) ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                                            onClick={() => handleCardSelect(+(card.price), card.title)}
                                        >
                                            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                                            <p>Price: {card.price}</p>
                                        </div>
                                    ))}
                                    {/* Add more sample cards here */}
                                </div>
                                <div className="w-full md:w-1/4 p-4 md:order-1 order-1">


                                    <div className="border p-4 py-5 mt-2 rounded-lg shadow">
                                        <div className="flex justify-center">
                                            <Image src="" alt="Profile" width={16} height={16} className="rounded-full border-2 border-white mb-2" style={{ marginTop: "-50px" }} />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 text-center">Farooq Dad</h3>
                                        <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam.</p>
                                    </div>

                                    <div className="border py-4 mt-2 rounded-lg shadow">

                                        <div className="flex justify-center">
                                            <button className=" text-lg font-medium py-2 px-4 rounded-md ">Total</button>
                                            <button className=" text-lg font-medium py-2 px-4 rounded-md ">${totalPrice}</button>
                                        </div>

                                        <hr />


                                        <div className="flex justify-center mt-3">

                                            <Button onClick={() => setIsOpen(true)} variant="outline" className="mt-3 py-4 text-lg font-medium text-center rounded-md">
                                                Book now
                                            </Button>

                                            <ModalToBuy isOpen={isOpen} onClose={() => setIsOpen(false)} />
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    );
};

export default Training;
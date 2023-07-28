"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import YouTube from 'react-youtube'

interface VideoItem {
    id: string;
    title: string;
    thumbnailUrl: string;
}

const Training: React.FC = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 9; // Number of videos to show per page

    useEffect(() => {
        const googleapiKey = "AIzaSyBREZFrvbOLG3rb9ATsQfANL4kT3ryzfT4";
        const channelId = 'UCPiOYHhVeVSmJWqQfSPcCdw';
        const playListId = "PLhYNKksltItMqqDCgKyb-KLpoiVfyi9DX"

        axios
            .get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    key: googleapiKey,
                    channelId: channelId,
                    part: 'snippet',
                    maxResults: 100,
                    order: 'date',
                },
            })
            .then((response) => {
                console.log({ response });

                const videosData: VideoItem[] = response.data.items.map((item: any) => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnailUrl: item.snippet.thumbnails.medium.url,
                }));
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

    // Generate pagination links
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videos.length / videosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
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
                        <div key={video.id} className="border bg-[#1a1a1a] border-white rounded-lg overflow-hidden shadow-md cursor-pointer ">
                            <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="w-full h-40 object-cover"
                                onClick={() => handleVideoClick(video.id)}
                            />
                            <div className="p-4 bg-[#1a1a1a] text-white">
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
    );
};

export default Training;

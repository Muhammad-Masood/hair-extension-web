
"use client"
import ModalToBuy from '@/components/modals/ModalToBuy';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Image } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Appointment {
    id: number;
    title: string;
    desc: string;
    duration: number;
    price: number;
}


async function getData() {
    const res = await fetch('https://api.example.com/...')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Page: React.FC = () => {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([])


    const [isOpen, setIsOpen] = useState(false)


    console.log({ appointmentsData });


    const handleCardSelect = (price: number, title: string) => {
        if (selectedCards.includes(title)) {
            setSelectedCards((prevSelectedCards) => prevSelectedCards.filter((cardTitle) => cardTitle !== title));
            setTotalPrice((prevTotalPrice) => prevTotalPrice - Number(price));
        } else {
            setSelectedCards((prevSelectedCards) => [...prevSelectedCards, title]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + Number(price));
        }
    };


    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/appointments`);
            console.log({ res });

            if (!res.data) return;



            setAppointmentsData(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <section className="py-12 ">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 p-4 md:order-1 order-2">
                        {appointmentsData.map((card, index) => (
                            <div
                                key={index}
                                className={`border p-4 mt-2 rounded-lg shadow cursor-pointer ${selectedCards.includes(card.title) ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                                onClick={() => handleCardSelect(card.price, card.title)}
                            >
                                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                                <p>{card.desc}</p>
                                <p>Duration: {card.duration} mints</p>
                                <p className="font-bold mt-2">${card.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/4 p-4 md:order-1 order-1">


                        <div className="border p-4 py-5 mt-2 rounded-lg shadow">
                            <div className="flex justify-center">
                                <img src="https://pbs.twimg.com/profile_images/1680659910860869632/0YdmM9FN_400x400.jpg" alt="Profile" className="w-16 h-16 rounded-full border-2 border-white mb-2" style={{ marginTop: "-50px" }} />
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
    );
};

export default Page;
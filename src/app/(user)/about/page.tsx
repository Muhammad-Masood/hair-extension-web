import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 py-3">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit bibendum nisi, sit amet mollis est semper
          sit amet. Nulla facilisi. Proin dignissim mi vel lectus finibus, ac tincidunt dui facilisis.
        </p>
        <p>
          Duis eu pharetra justo. Nulla facilisi. Nunc nec sem ac purus maximus rhoncus. Vivamus vitae tellus non justo
          hendrerit dictum.
        </p>
      </section>

      <section className="mb-8 ">
        <h2 className="text-2xl font-bold mb-4 py-3">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border cursor-pointer rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="">Position</p>
            </div>
          </div>
          <div className="border cursor-pointer rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="">Position</p>
            </div>
          </div>
          <div className=" border cursor-pointer rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="">Position</p>
            </div>
          </div>
          <div className="border cursor-pointer rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="">Position</p>
            </div>
          </div>
          <div className="border cursor-pointer rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="">Position</p>
            </div>
          </div>
          <div className="border cursor-pointer rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="">Position</p>
            </div>
          </div>
          <div className="border cursor-pointer rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="">Position</p>
            </div>
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 py-3">Contact Us</h2>
        <p>
          For any inquiries or questions, please contact us using the following information:
        </p>
        <div className="mt-4">
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 000-0000</p>
        </div>
      </section>
    </div>
  );
};

export default About;

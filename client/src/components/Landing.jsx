import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  return (
    <main className="bg-gray-100">
      {/* Hero Section */}
      <div className='bg-[url("/hero.jpg")] h-[500px] md:h-[500px] w-full flex flex-col items-center justify-center text-center bg-cover bg-center'>
        <h2 className="text-7xl md:text-6xl lg:text-8xl text-slate-300 mb-4">Welcome to</h2>
        <h2 className="text-7xl md:text-6xl lg:text-8xl text-purple-300 font-bold font-Aclonica">
          Memories
        </h2>
        <div className="w-[350px] md:w-[500px] h-10 bg-gray-200 rounded-lg mt-8 flex items-center justify-center">
          <p className="text-gray-900 font-sans font-bold text-lg md:text-xl ">Remember More, Worry Less.</p>
        </div>
      </div>

      {/* Why Choose Memories Section */}
      <section className='py-16 px-4 text-center font-sans bg-cover bg-center' style={{ backgroundImage: 'url(/container_bg.jpg)' }}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-600">
            Why Choose Memories
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Discover the features and benefits that make Memories the perfect
            app for organizing and cherishing your moments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Easy to Use",
                description: "Intuitive design and user-friendly interface.",
              },
              {
                title: "Secure",
                description:
                  "Your memories are safe with our top-notch security.",
              },
              {
                title: "Organized",
                description:
                  "Keep your memories neatly organized and easily accessible.",
              },
              {
                title: "Shareable",
                description:
                  "Easily share your moments with friends and family.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-2xl border-2 border-purple-800 transform transition-transform hover:scale-105 bg-white bg-opacity-75"
              >
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </div>
            ))}
          </div>
          <a
            href="#explore"
            className="bg-purple-800 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-900 transition"
          >
            Let's Explore
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-black py-6">
        <div className="container mx-auto text-center bg-gray-800 md:text-white">
          <p>&copy; 2024 Memories. Created by Dev Sharma.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="text-white hover:text-gray-400" size="2x" />
            </a>
            <a href="mailto:example@example.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} className="text-white hover:text-gray-400" size="2x" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="text-white hover:text-gray-400" size="2x" />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className="text-white hover:text-gray-400" size="2x" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;

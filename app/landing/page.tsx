import React from 'react'
import { ThemeSwitch } from '../ThemeSwitch'
import NavigateButton from './NavigateButton'
import ComponentSUBSCRIPTION from '../subscription/_components/App'

const LandingPage = () => {
  return (
    <div className="font-sans transition-colors duration-200 dark:bg-gray-900">
      {/* Sticky ThemeSwitch */}
      <div className="sticky top-0 gap-4 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          <NavigateButton /> <ThemeSwitch />
        </div>
      </div>

      {/* Header */}
      <header className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-pink-500 dark:from-indigo-700 dark:via-fuchsia-800 dark:to-pink-800">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-200 via-white to-pink-200 dark:from-fuchsia-400 dark:via-indigo-400 dark:to-pink-400">
            Connect Moroccan Hearts Worldwide
          </h1>
          <p className="text-2xl text-white mb-8">
            Find your Moroccan soulmate, no matter where you are
          </p>
          <NavigateButton />
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-fuchsia-600 dark:text-fuchsia-400">
            Why Choose Our App
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Global Moroccan Network',
                desc: 'Connect with Moroccans from all corners of the world, expanding your search beyond borders'
              },
              {
                title: 'Cultural Understanding',
                desc: 'Find partners who share your Moroccan heritage and values, no matter where they live'
              },
              {
                title: 'Secure Connections',
                desc: 'Enjoy peace of mind with our advanced security measures and privacy controls'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-fuchsia-600 dark:text-fuchsia-400">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-fuchsia-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-fuchsia-600 dark:text-fuchsia-400">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 'Create Profile',
                desc: 'Sign up and showcase your unique Moroccan identity and personal interests'
              },
              {
                step: 'Connect Globally',
                desc: 'Browse and connect with Moroccan singles from around the world'
              },
              {
                step: 'Unlock Premium Features',
                desc: 'Enhance your experience with our premium plan for more opportunities to find your match'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-fuchsia-600 dark:text-fuchsia-400">{`${
                  index + 1
                }. ${item.step}`}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-fuchsia-600 dark:text-fuchsia-400">
            Success Stories
          </h2>
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
            <p className="text-xl italic mb-4 dark:text-gray-300">
              "Thanks to this app, I found my Moroccan soulmate while living
              abroad. We shared the same values and dreams, and now we're
              happily married!"
            </p>
            <p className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">
              - Fatima and Karim, London and Casablanca
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action with Blurred User Photos */}
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/api/placeholder/1200/600")' }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-70 backdrop-filter backdrop-blur-md"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Moroccan Love Worldwide?
          </h2>
          <NavigateButton />
        </div>
      </section>
      <section className="flex items-center justify-center bg-fuchsia-50 dark:bg-gray-900">
        <ComponentSUBSCRIPTION />
      </section>
    </div>
  )
}

export default LandingPage

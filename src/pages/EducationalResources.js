import React from 'react';
import { FaBook, FaVideo, FaArrowRight } from 'react-icons/fa';

const EducationalResources = () => {
  const resources = [
    {
      type: 'article',
      title: 'Understanding Your Menstrual Cycle: A Complete Guide',
      link: 'https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle'
    },
    {
      type: 'video',
      title: 'How Your Menstrual Cycle Works',
      link: 'https://www.youtube.com/watch?v=WOi2Bwvp6hw'
    },
    {
      type: 'article',
      title: 'PMS & PMDD: Managing Premenstrual Symptoms',
      link: 'https://www.healthline.com/health/premenstrual-syndrome'
    },
    {
      type: 'video',
      title: 'Understanding Hormonal Changes Throughout Your Cycle',
      link: 'https://www.youtube.com/watch?v=vXvyxdk_ios'
    },
    {
      type: 'article',
      title: 'Period Pain: Causes and Management Strategies',
      link: 'https://www.nhs.uk/conditions/period-pain'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 min-h-screen p-8">
      <h2 className="text-3xl font-semibold mb-6 text-white">Educational Resources</h2>
      <div className="grid gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex items-center group"
          >
            <div className="mr-4">
              {resource.type === 'article' ? (
                <FaBook size={32} className="text-blue-600" />
              ) : (
                <FaVideo size={32} className="text-red-600" />
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
              <p className="mt-1 text-gray-600 flex items-center">
                {resource.type === 'article' ? 'Read' : 'Watch'} Now
                <FaArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default EducationalResources;
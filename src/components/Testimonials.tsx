import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      rating: 5,
      content: 'Myra Foods catered our corporate event and the quality was exceptional! The variety of snack boxes impressed all our guests.',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Regular Customer',
      rating: 5,
      content: 'The delivery is always on time and the food is incredibly fresh. Their event-specific boxes made my party a huge success!',
      avatar: '👨‍🍳'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Food Enthusiast',
      rating: 5,
      content: 'Amazing quality and presentation! The variety of products and the secure payment options make ordering so convenient.',
      avatar: '👩‍🌾'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their Myra Foods experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-green-100 to-yellow-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-6">
                <Quote className="h-8 w-8 text-green-700 opacity-60" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
              
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-yellow-200 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 fill-yellow-600 text-yellow-600" />
            <span className="font-semibold text-gray-800">4.9/5 Average Rating</span>
            <span className="text-gray-600">from 1,200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
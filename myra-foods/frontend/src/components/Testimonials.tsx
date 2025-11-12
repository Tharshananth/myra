export default function Testimonials() {
    const testimonials = [
        {
            name: "John Doe",
            review: "Amazing food! Will definitely order again.",
            rating: 5,
        },
        {
            name: "Jane Smith",
            review: "Great service and delicious meals.",
            rating: 4,
        },
        {
            name: "Alice Johnson",
            review: "Loved the variety of options available.",
            rating: 5,
        },
    ];

    return (
        <div className="testimonials">
            <h2>Customer Testimonials</h2>
            <div className="testimonial-list">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.review}</p>
                        <p>Rating: {testimonial.rating} / 5</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
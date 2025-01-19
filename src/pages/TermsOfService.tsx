import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="text-primary hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Agreement to Terms</h2>
        <p>By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Products</h2>
        <p>We make every effort to display our products accurately, but we cannot guarantee that all details and colors are accurate.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Pricing and Payment</h2>
        <p>All prices are in GBP and include VAT where applicable. We reserve the right to modify prices without notice.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Shipping and Delivery</h2>
        <p>We aim to deliver products within the timeframes specified at checkout. Delivery times may vary based on location.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Returns and Refunds</h2>
        <p>Our returns policy complies with the Consumer Rights Act 2015. You have the right to cancel your order within 14 days of receipt.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Intellectual Property</h2>
        <p>All content on this website is our property and is protected by UK and international copyright laws.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Information</h2>
        <p>For any questions about these Terms, please contact us at:</p>
        <p>Email: legal@cozycandlehaven.com</p>
      </div>
    </div>
  );
};

export default TermsOfService;
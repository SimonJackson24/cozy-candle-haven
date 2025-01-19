import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="text-primary hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
        <p>Welcome to Cozy Candle Haven. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Personal Data</h3>
        <p>We may collect personal identification information, including but not limited to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Postal address</li>
          <li>Phone number</li>
          <li>Payment information</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Process your orders</li>
          <li>Send you order confirmations</li>
          <li>Respond to your inquiries</li>
          <li>Improve our services</li>
          <li>Send marketing communications (with your consent)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Protection Rights</h2>
        <p>Under GDPR, you have the following rights:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Right to access</li>
          <li>Right to rectification</li>
          <li>Right to erasure</li>
          <li>Right to restrict processing</li>
          <li>Right to data portability</li>
          <li>Right to object</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
        <p>For any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: privacy@cozycandlehaven.com</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
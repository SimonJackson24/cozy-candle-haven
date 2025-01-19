import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="text-primary hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. What Are Cookies</h2>
        <p>Cookies are small text files that are stored on your computer or mobile device when you visit our website.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Essential cookies for website functionality</li>
          <li>Analytics cookies to understand how visitors use our site</li>
          <li>Preference cookies to remember your settings</li>
          <li>Marketing cookies to deliver relevant advertisements</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Types of Cookies We Use</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Necessary Cookies</h3>
        <p>Required for the website to function properly. You can't opt out of these cookies.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">3.2 Analytics Cookies</h3>
        <p>Help us understand how visitors interact with our website.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Managing Cookies</h2>
        <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
        <p>If you have any questions about our use of cookies, please contact us at:</p>
        <p>Email: privacy@cozycandlehaven.com</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
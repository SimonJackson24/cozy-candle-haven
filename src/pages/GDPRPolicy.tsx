import { Link } from "react-router-dom";

const GDPRPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="text-primary hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-8">GDPR Compliance</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Overview</h2>
        <p>This policy explains how we comply with the General Data Protection Regulation (GDPR) when processing personal data.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Data Controller</h2>
        <p>Cozy Candle Haven is the data controller for personal data collected through this website.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Legal Basis for Processing</h2>
        <p>We process personal data under the following legal bases:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Consent</li>
          <li>Contract fulfillment</li>
          <li>Legal obligation</li>
          <li>Legitimate interests</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Your Rights Under GDPR</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Right to be informed</li>
          <li>Right of access</li>
          <li>Right to rectification</li>
          <li>Right to erasure</li>
          <li>Right to restrict processing</li>
          <li>Right to data portability</li>
          <li>Right to object</li>
          <li>Rights related to automated decision making</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Protection Officer</h2>
        <p>Our Data Protection Officer can be contacted at:</p>
        <p>Email: dpo@cozycandlehaven.com</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. International Transfers</h2>
        <p>When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Data Breach Procedures</h2>
        <p>We have procedures in place to detect, report, and investigate personal data breaches.</p>
      </div>
    </div>
  );
};

export default GDPRPolicy;
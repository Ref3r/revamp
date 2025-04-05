import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | REF3R",
  description: "Privacy Policy for REF3R - Elevate your Creator Journey",
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-12 md:py-16 md:px-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At REF3R, we respect your privacy and are committed to protecting
              your personal data. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our
              platform. Please read this Privacy Policy carefully. By using
              REF3R, you consent to the collection and use of information in
              accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We collect several types of information from and about users of
              our platform, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                <span className="font-medium">Personal Information:</span> Name,
                email address, phone number, and other contact details you
                provide when creating an account or contacting us.
              </li>
              <li>
                <span className="font-medium">Profile Information:</span> Your
                profile picture, bio, and other information you choose to add to
                your profile.
              </li>
              <li>
                <span className="font-medium">Social Media Data:</span> When you
                connect your social media accounts, we collect information from
                those accounts such as profile data, post history, engagement
                metrics, and audience information.
              </li>
              <li>
                <span className="font-medium">Usage Information:</span> How you
                interact with our platform, features you use, time spent on the
                platform, and other analytics data.
              </li>
              <li>
                <span className="font-medium">Technical Data:</span> IP address,
                browser type, device information, operating system, and other
                technical details.
              </li>
              <li>
                <span className="font-medium">Marketing Preferences:</span> Your
                preferences in receiving marketing communications from us.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              3. How We Collect Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We collect information through:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                Direct interactions when you create an account, fill forms, or
                communicate with us.
              </li>
              <li>
                Automated technologies such as cookies, server logs, and other
                tracking technologies.
              </li>
              <li>
                Third-party sources, including social media platforms you
                connect to REF3R.
              </li>
              <li>API integrations with various social media platforms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              4. How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use your information for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Provide, maintain, and improve our platform and services.</li>
              <li>
                Process and manage your account registration and subscription.
              </li>
              <li>
                Facilitate your ability to manage multiple social media accounts
                from our dashboard.
              </li>
              <li>
                Generate analytics and insights about your social media
                performance.
              </li>
              <li>Respond to your requests, questions, and feedback.</li>
              <li>
                Send administrative information, such as updates to our terms,
                conditions, and policies.
              </li>
              <li>
                Send marketing and promotional communications if you have not
                opted out.
              </li>
              <li>Protect the security and integrity of our platform.</li>
              <li>
                Comply with legal obligations and enforce our terms of service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              5. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                <span className="font-medium">Service Providers:</span>{" "}
                Third-party vendors who perform services on our behalf, such as
                payment processing, data analysis, email delivery, hosting, and
                customer service.
              </li>
              <li>
                <span className="font-medium">Social Media Platforms:</span>{" "}
                When you connect your social media accounts, information may be
                exchanged between REF3R and those platforms according to their
                APIs and your authorization settings.
              </li>
              <li>
                <span className="font-medium">Business Partners:</span> With
                your consent, we may share your information with our business
                partners to offer certain products, services, or promotions.
              </li>
              <li>
                <span className="font-medium">Legal Requirements:</span> If
                required by law, court order, or governmental regulation, or if
                we believe that disclosure is necessary to protect our rights or
                the rights of others.
              </li>
              <li>
                <span className="font-medium">Business Transfers:</span> In
                connection with any merger, sale of company assets, financing,
                or acquisition of all or a portion of our business by another
                company.
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We will retain your personal information only for as long as
              necessary to fulfill the purposes for which we collected it,
              including for the purposes of satisfying any legal, accounting, or
              reporting requirements. To determine the appropriate retention
              period, we consider the amount, nature, and sensitivity of the
              data, the potential risk of harm from unauthorized use or
              disclosure, the purposes for which we process the data, and
              applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              7. Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We have implemented appropriate technical and organizational
              measures to protect your personal information from accidental
              loss, unauthorized access, use, alteration, and disclosure.
              However, no method of transmission over the Internet or method of
              electronic storage is 100% secure. Therefore, while we strive to
              use commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              8. Your Data Protection Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Depending on your location, you may have various rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                The right to access, update, or delete your personal
                information.
              </li>
              <li>
                The right to rectification if your information is inaccurate or
                incomplete.
              </li>
              <li>
                The right to object to our processing of your personal data.
              </li>
              <li>
                The right of restriction, meaning you can request we limit the
                processing of your information.
              </li>
              <li>
                The right to data portability, allowing you to request a copy of
                your data in a structured format.
              </li>
              <li>
                The right to withdraw consent where we rely on consent to
                process your personal information.
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the
              contact information provided in this policy. We may need to verify
              your identity before responding to your request.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              9. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to track activity
              on our platform and hold certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies or
              to indicate when a cookie is being sent. However, if you do not
              accept cookies, you may not be able to use some portions of our
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              10. Third-Party Links
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our platform may include links to third-party websites, services,
              or applications. Clicking on those links may allow third parties
              to collect or share data about you. We do not control these
              third-party websites and are not responsible for their privacy
              policies. We encourage you to read the privacy policy of every
              website you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              11. Children's Privacy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our platform is not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If you are a parent or guardian and you believe your
              child has provided us with personal information, please contact us
              so that we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              12. International Data Transfers
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in servers
              located outside of your state, province, country, or other
              governmental jurisdiction where the data protection laws may
              differ. By using REF3R, you consent to the transfer of your
              information to countries outside of your country of residence,
              including the United States, which may have different data
              protection rules than those of your country.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              13. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date. You are advised to review
              this Privacy Policy periodically for any changes. Changes to this
              Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              14. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <Link
                href="mailto:privacy@ref3r.com"
                className="text-[#27A980] hover:underline"
              >
                privacy@ref3r.com
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p>Last updated: April 5, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

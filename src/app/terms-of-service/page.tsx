import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | REF3R",
  description: "Terms of Service for REF3R - Elevate your Creator Journey",
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-12 md:py-16 md:px-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Terms of Service
        </h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              1. Introduction and Acceptance of Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to REF3R. By accessing or using our platform, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms of Service. These Terms constitute a legally
              binding agreement between you and REF3R regarding your use of our
              platform and services. If you do not agree with these terms,
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              2. Definitions
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Throughout these Terms of Service, the following terms shall have
              the meanings assigned to them:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                "Platform" refers to REF3R, including all its features,
                services, and content.
              </li>
              <li>
                "User" refers to anyone who accesses or uses the Platform.
              </li>
              <li>
                "Content" refers to any data, text, images, videos, or any other
                material published on the Platform.
              </li>
              <li>
                "Social Media Accounts" refers to user accounts on third-party
                social media platforms that are integrated with the Platform.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              3. Service Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              REF3R is a social media integration platform that allows creators
              and businesses to manage multiple social media accounts from a
              single dashboard. Our services include content scheduling,
              analytics, audience engagement tools, and other features designed
              to enhance your social media presence.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              4. Eligibility
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To use REF3R, you must be at least 13 years of age. If you are
              under 18 years of age, you must have permission from a parent or
              legal guardian to use our services. By using REF3R, you represent
              and warrant that you meet these eligibility requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              5. Account Registration
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To use certain features of our Platform, you may be required to
              register an account. When creating an account with REF3R, you
              agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                Provide accurate, current, and complete information during the
                registration process.
              </li>
              <li>Maintain and promptly update your account information.</li>
              <li>Keep your password secure and confidential.</li>
              <li>
                Be responsible for all activities that occur under your account.
              </li>
              <li>
                Notify us immediately of any unauthorized use of your account or
                any other breach of security.
              </li>
              <li>Not create multiple accounts for abusive purposes.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              We reserve the right to suspend or terminate accounts that violate
              these terms or that have been inactive for an extended period.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              6. Platform Integration and Data Access
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              REF3R integrates with multiple social media platforms. By using
              our services, you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                Authorize REF3R to access, store, and analyze data from your
                connected social media accounts.
              </li>
              <li>
                Publish content to your social media accounts based on your
                instructions.
              </li>
              <li>
                Retrieve analytics and performance metrics related to your
                social media accounts.
              </li>
              <li>
                Acknowledge that your use of third-party services is governed by
                their respective terms of service.
              </li>
              <li>
                Understand that REF3R is not responsible for the practices,
                policies, or content of these third-party services.
              </li>
              <li>
                Accept that changes made by third-party services may affect our
                ability to integrate with them.
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              The extent of our access is limited to what is necessary to
              provide our services and subject to your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              7. User Conduct
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              While using our Platform, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Violate any applicable laws or regulations.</li>
              <li>
                Infringe upon the rights of others, including intellectual
                property rights.
              </li>
              <li>
                Upload or distribute harmful content, including viruses or
                malware.
              </li>
              <li>
                Impersonate others or misrepresent your affiliation with any
                person or entity.
              </li>
              <li>
                Use the Platform to send unsolicited promotional messages or
                spam.
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Platform.
              </li>
              <li>
                Use the Platform in any way that could disable, overburden, or
                impair it.
              </li>
              <li>
                Promote discrimination, bigotry, racism, hatred, or physical
                harm against any group or individual.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              8. Subscription and Payment
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              REF3R offers both free and paid subscription plans:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                Free plan users may access limited features of the platform.
              </li>
              <li>
                Paid subscription users will be charged according to the pricing
                plan they select.
              </li>
              <li>
                Subscription fees are charged in advance and may be
                non-refundable as specified in our refund policy.
              </li>
              <li>
                You may upgrade, downgrade, or cancel your subscription at any
                time, subject to the terms of your current plan.
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Prices for our services may change upon notice. By continuing to
              use REF3R after price changes go into effect, you agree to pay the
              updated prices.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              9. Content Ownership and Licenses
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You retain all ownership rights to the content you upload to the
              Platform. By uploading content, you grant REF3R a non-exclusive,
              worldwide, royalty-free license to use, reproduce, modify, adapt,
              publish, and display such content for the purpose of providing and
              promoting our services. This license exists only for as long as
              you maintain your account with us.
            </p>
            <p className="text-gray-300 leading-relaxed">
              REF3R and its associated logos, trademarks, and service marks are
              owned by us and protected by law. Our platform, including its
              software, design, text, graphics, and other content, is also
              protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              10. Disclaimer of Warranties
            </h2>
            <p className="text-gray-300 leading-relaxed">
              The Platform is provided "as is" and "as available" without any
              warranties of any kind, either express or implied. We do not
              guarantee that the Platform will be uninterrupted, secure, or
              error-free. We also do not make any warranties about the accuracy,
              reliability, completeness, or timeliness of the content available
              on the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              11. Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To the fullest extent permitted by applicable law, REF3R and its
              officers, directors, employees, and agents shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising out of or in connection with your use of our
              services. This includes, but is not limited to, damages for loss
              of profits, goodwill, data, use, or other intangible losses, even
              if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              12. Indemnification
            </h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to indemnify, defend, and hold harmless REF3R and its
              officers, directors, employees, and agents from and against any
              and all claims, liabilities, damages, losses, costs, expenses, or
              fees (including reasonable attorneys' fees) arising from your use
              of our services, your violation of these Terms of Service, or your
              violation of any rights of another.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              13. Termination
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to suspend or terminate your access to the
              Platform at any time for violations of these Terms or for any
              other reason at our discretion. You may also terminate your
              account at any time. Upon termination, your right to use our
              services will cease immediately. All provisions of these Terms of
              Service that by their nature should survive termination shall
              survive, including ownership provisions, warranty disclaimers,
              indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              14. Changes to Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may modify these Terms at any time by posting the revised terms
              on our website. Your continued use of REF3R after the effective
              date of the revised terms constitutes your acceptance of those
              terms. We encourage you to periodically review the Terms of
              Service to stay informed about our policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              15. Governing Law
            </h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which REF3R is established,
              without regard to its conflict of law provisions. Any legal action
              or proceeding arising under these Terms shall be brought
              exclusively in the courts located in that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              16. Contact Information
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <Link
                href="mailto:support@ref3r.com"
                className="text-[#27A980] hover:underline"
              >
                support@ref3r.com
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

export default TermsOfService;

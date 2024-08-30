import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-100 py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          At Right Ship, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide when you visit our website.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          If you visit our website, we may collect certain information by automated means, using “Cookies” as described in more detail below. This may include information about your devices and how you access the Internet, such as:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>IP address and the device, web browser, and operating system type</li>
          <li>URLs starting with a referring site</li>
          <li>Your activity on this Website and the site you exit to once you leave our Website</li>
          <li>The dates and times of the visits to our Website</li>
          <li>Information on actions taken on our Website (e.g., number of page views, site navigation patterns, and job views or application activity)</li>
          <li>Geographical location information (e.g., country, state, and city from where you access our Website)</li>
          <li>The types of search terms you enter to access our Website</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Cookies</h2>
        <p className="text-gray-600 mb-4">
          Cookies are small text files that are placed on your device to track usage and improve your experience. These cookies help us analyze web traffic, remember your preferences, and tailor our services to your needs.
        </p>
        <p className="text-gray-600 mb-4">
          By using our Website, you consent to the use of cookies in accordance with this Privacy Policy. You can choose to accept or decline cookies, but declining may limit your ability to use certain features of the Website.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Use of Information</h2>
        <p className="text-gray-600 mb-4">
          The information we collect is used to enhance your experience on our Website, improve our services, and provide you with personalized content. We may also use this information for analytical purposes, to monitor and improve the performance of our Website.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Data Security</h2>
        <p className="text-gray-600 mb-4">
          We are committed to ensuring that your information is secure. We have implemented appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
        </p>
        <p className="text-gray-600 mb-4">
          However, please be aware that no method of transmitting information over the Internet or storing information is completely secure. We cannot guarantee the absolute security of your personal information.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Changes to This Policy</h2>
        <p className="text-gray-600 mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:info@rightships.com" className="text-blue-600 hover:underline">info@rightships.com</a>.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;

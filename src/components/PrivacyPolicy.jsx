const PrivacyPolicy = () => {
  const policies = [
    {
      title: "Information We Collect",
      icon: "https://img.icons8.com/ios/50/000000/data-protection.png",
      items: [
        "Personal identification information (Name, email address, phone number)",
        "Delivery address and location data",
        "Payment information",
        "Device and browser information",
      ],
    },
    {
      title: "How We Use Your Data",
      icon: "https://img.icons8.com/ios/50/000000/database.png",
      items: [
        "Process and deliver your orders",
        "Send order updates and notifications",
        "Improve our services and user experience",
        "Communicate about promotions and updates",
      ],
    },
    {
      title: "Data Protection",
      icon: "https://img.icons8.com/ios/50/000000/shield.png",
      items: [
        "Secure SSL encryption for all transactions",
        "Regular security audits and updates",
        "Limited access to personal information",
        "Compliance with data protection regulations",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 -mt-11">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="relative mb-6">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Privacy Hero"
            className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Privacy Policy
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your privacy is important to us. This policy outlines how we collect,
          use, and protect your personal information.
        </p>
      </div>

      {/* Policy Sections */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-5">
            <h2 className="text-xl font-bold text-white">Our Commitment</h2>
            <p className="text-white/80 text-sm mt-1">
              We are committed to protecting your privacy and personal data
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {policies.map((policy, index) => (
              <div key={index} className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <img
                      src={policy.icon}
                      alt={policy.title}
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {policy.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {policy.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Your Rights
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-blue-600">•</span> Access your personal data
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-blue-600">•</span> Request data correction
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-blue-600">•</span> Delete your account
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-blue-600">•</span> Opt-out of communications
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Contact Us
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have any questions about our Privacy Policy, please
            don&apos;t hesitate to contact us.
          </p>
          <a
            href="https://wa.me/201501884857"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button
              className="bg-gradient-to-r from-[#25D366] to-[#128C7E] 
              text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 
              transition-opacity duration-200 flex items-center gap-2 text-sm"
            >
              <img
                src="https://img.icons8.com/material-rounded/24/ffffff/whatsapp.png"
                alt="WhatsApp"
                className="w-5 h-5"
              />
              Contact Support
            </button>
          </a>
        </div>
      </div>

      {/* Last Updated */}
      <div className="max-w-4xl mx-auto mt-12 text-center -mb-44">
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

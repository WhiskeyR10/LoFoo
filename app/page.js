import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white min-h-screen flex items-center justify-center">
      <div className="px-8 text-center">
        <h1 className="text-5xl font-bold mb-8">Lost Something? Find It Here!</h1>
        <p className="text-xl mb-10">Our lost and found service helps you recover lost items.</p>
        <Link href="/login-page" className="rounded-full bg-white text-black hover:bg-purple-400 py-3 px-6 font-semibold">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

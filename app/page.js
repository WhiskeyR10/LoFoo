import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r bg-blue-400 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Lost & Found</h1>
        <p className="text-lg mb-8">Helping you find what you've lost and return what you've found.</p>
        {/* <Link href="/home-page">
         Get Started
        </Link> */}
        <Link href="/login-page" style={{ border: '1px solid blue', padding: '4px' }}>
  Get Started
</Link>


      </div>
    </div>
  );
};

export default LandingPage;

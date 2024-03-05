"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminHeader = () => {
    const router= useRouter();

    const handleLogout = async () => {
        try {
          localStorage.removeItem("token");
          router.push('/login-page');
        } catch (error) {
          console.error(error);
        }
      };
    
  
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <img src="/logo.png" alt="Lost and Found System Logo" className="h-10" />
        </div>
        <nav>
          <ul className="flex text-white">
            <li className="mr-4"><Link href="/">Home</Link></li>
            <li className="mr-4"><Link href="/admin/dashboard">Dashboard</Link></li>
            <li className="mr-4"><Link href="/admin-page/usermanagement-page">User Management</Link></li>
            <li className="mr-4"><Link href="#">Reports</Link></li>
            <li className="mr-4"><Link href="#">Settings</Link></li>
            <li className="mr-4"><Link href="/login-page" onClick={handleLogout}>Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

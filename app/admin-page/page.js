"use client"
import React from 'react';
import Head from 'next/head';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Admin Header */}
      <AdminHeader />

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="col-span-1 md:col-span-2 bg-gray-200 p-4 rounded-md">
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-800 hover:text-blue-600">Dashboard</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-600">Users</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-600">Items</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-600">Categories</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-600">Messages</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-600">Settings</a></li>
            </ul>
          </aside>

          {/* Content Area */}
          <section className="col-span-1 bg-white p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
            <p className="text-gray-700 mb-4">
              You can manage various aspects of the Lost and Found System here.
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-2">User Management</h3>
              <p className="text-gray-700 mb-4">
                Create, edit, or delete users, and manage their roles and permissions.
              </p>
              <h3 className="text-lg font-semibold mb-2">Item Management</h3>
              <p className="text-gray-700 mb-4">
                View, edit, or mark lost and found items as resolved.
              </p>
              <h3 className="text-lg font-semibold mb-2">Category Management</h3>
              <p className="text-gray-700 mb-4">
                Create, edit, or delete categories for lost and found items.
              </p>
              <h3 className="text-lg font-semibold mb-2">Reporting</h3>
              <p className="text-gray-700">
                Generate reports on various metrics, such as lost and found item trends, user activity, and more.
              </p>
            </div>
          </section>
        </section>
      </main>

      {/* Admin Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;

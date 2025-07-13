import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);

  const adminToken = localStorage.getItem('adminToken');

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${adminToken}`,
      };

      const [userRes, doctorRes, pendingRes] = await Promise.all([
        axios.get(`${BASE_URL}/admin/users`, { headers }),
        axios.get(`${BASE_URL}/admin/doctors`, { headers }),
        axios.get(`${BASE_URL}/admin/doctors/pending`, { headers }),
      ]);

      setUsers(userRes.data);
      setDoctors(doctorRes.data);
      setPendingDoctors(pendingRes.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleApproval = async (doctorId, status) => {
    try {
      const headers = {
        Authorization: `Bearer ${adminToken}`,
      };

      await axios.put(`${BASE_URL}/admin/doctors/${doctorId}/status`, { status }, { headers });
      toast.success(`Doctor ${status}`);
      fetchData(); // refresh after update
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
        case 'users':
        return (
            <div>
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        );

        case 'doctors':
        return (
            <div>
            <h2 className="text-xl font-bold mb-4">Approved Doctors</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doc => (
                    <tr key={doc._id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{doc.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{doc.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{doc.specialization}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        );

        case 'approval':
        return (
            <div>
            <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
            {pendingDoctors.length === 0 ? (
                <p>No pending doctors</p>
            ) : (
                <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingDoctors.map(doc => (
                        <tr key={doc._id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{doc.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{doc.email}</td>
                        <td className="border border-gray-300 px-4 py-2 space-x-2">
                            <button
                            onClick={() => handleApproval(doc._id, 'approved')}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                            Approve
                            </button>
                            <button
                            onClick={() => handleApproval(doc._id, 'cancelled')}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                            Reject
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
            </div>
        );

        default:
        return null;
    }
 };


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Users
        </button>
        <button onClick={() => setActiveTab('doctors')} className={`px-4 py-2 ${activeTab === 'doctors' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Doctors
        </button>
        <button onClick={() => setActiveTab('approval')} className={`px-4 py-2 ${activeTab === 'approval' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Approvals
        </button>
      </div>

      <div>{renderTab()}</div>
    </div>
  );
};

export default AdminDashboard;

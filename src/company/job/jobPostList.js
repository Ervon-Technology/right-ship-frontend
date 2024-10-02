import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/form/button';
import Pagination from '../../component/pagination';

const JobPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Number of posts per page
  const [totalDocuments, setTotalDocuments] = useState(0); // Total documents from the API
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('created_date');
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.company_id) return;

    const fetchPosts = async () => {
      try {
        const requestData = {
          company_id: user.company_id,
          page: currentPage,
          limit: postsPerPage, // Pass limit for pagination
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/company/application/get`,
          requestData
        );

        if (response.data.code === 200) {
          setPosts(response.data.applications);
          setTotalDocuments(response.data.total_documents); // Set total_documents from API
        } else {
          console.error('Failed to fetch posts:', response.data);
          setError('Failed to fetch posts.');
        }
      } catch (error) {
        console.error('Error while fetching posts:', error);
        setError('An error occurred while fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user?.company_id, currentPage]); // Fetch posts whenever currentPage changes

  const handleStatusChange = async (postId, newStatus) => {
    try {
      const postStateData = {
        application_id: postId,
        status: newStatus,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/company/application/edit`, postStateData);

      setPosts((posts) =>
        posts.map((post) =>
          post.application_id === postId
            ? { ...post, status: newStatus }
            : post
        )
      );
    } catch (error) {
      console.error('Error while updating status:', error);
      alert('An error occurred while updating status.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const totalPages = Math.ceil(totalDocuments / postsPerPage); // Calculate total pages

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='flex flex-row justify-between mb-4'>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Job Posts</h2>
        <Button text="Add Job" to="/create/job" color="blue" size='md'/>
      </div>


            {/* Table for displaying job posts */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b bg-blue-600 text-white font-semibold text-sm text-left">
                Hiring For Ship
              </th>
              <th className="px-6 py-3 border-b bg-blue-600 text-white font-semibold text-sm text-left">
                Open Positions
              </th>
              <th className="px-6 py-3 border-b bg-blue-600 text-white font-semibold text-sm text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr
                  key={post.application_id}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td
                    className="px-6 py-4 border-b"
                    onClick={() =>
                      navigate(`/post/job/detail/${post.application_id}`)
                    }
                  >
                    <p className="text-sm font-medium text-slate-500">
                      Posted:{' '}
                      {`${new Date(post.created_date).getDate()} ${new Date(
                        post.created_date
                      ).toLocaleString('en-IN', { month: 'short' })}, ${new Date(
                        post.created_date
                      )
                        .getFullYear()
                        .toString()
                        .slice(-2)}`}
                    </p>
                    <p className="font-semibold">{post.hiring_for.join(', ')}</p>
                  </td>
                  <td className="px-6 py-4 border-b">
                    {post.open_positions.join(', ')}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <select
                      value={post.status ? post.status : 'inactive'}
                      onChange={(e) =>
                        handleStatusChange(post.application_id, e.target.value)
                      }
                      className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${post.status === 'active'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        }`}
                    >
                      <option value="active" className="bg-green-500">
                        Active
                      </option>
                      <option value="inactive" className="bg-red-500">
                        Inactive
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 px-6 text-center text-gray-600"
                >
                  No job posts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default JobPostList;

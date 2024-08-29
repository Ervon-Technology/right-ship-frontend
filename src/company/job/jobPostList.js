import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Button from '../../component/form/button';

const JobPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('created_date');

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.company_id) return;

    const fetchPosts = async () => {
      try {
        const requestData = {
          company_id: user.company_id,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/company/application/get`,
          requestData
        );

        if (response.data.code === 200) {
          setPosts(response.data.applications);
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
  }, [user?.company_id]);

  const handleActionClick = async (action, postId) => {
    console.log(`Action: ${action} on post ID: ${postId}`);

    const data = {
      application_id: postId,
      status: action,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/company/application/edit`,
        data
      );
      console.log('Job status updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating job status:', error);
      return null;
    }
  };

  const filteredPosts = posts
    .sort((a, b) => {
      if (sortField === 'created_date') {
        return sortOrder === 'asc'
          ? new Date(a.created_date) - new Date(b.created_date)
          : new Date(b.created_date) - new Date(a.created_date);
      } else if (sortField === 'status') {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusChange = async (postId, newStatus) => {
    try {
      console.log(postId, newStatus);

      const postStateData = {
        application_id: postId,
        status: newStatus,
      }

      const JobStatusResponse = axios.post(`${process.env.REACT_APP_API_URL}/company/application/edit`, postStateData );
     
     
        console.log(posts);
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Job Posts</h2>

      {/* Search and Sorting Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by Job Title, Rank, or Benefits"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
         
          <Button text="Add Job" to="/create/job" color="blue" />

        </div>
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
                Other Details
              </th>
              <th className="px-6 py-3 border-b bg-blue-600 text-white font-semibold text-sm text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
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
                    <p className="text-sm font-medium text-slate-500">
                      Downloads: 56
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Applications: 76
                    </p>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <select
                      value={post.status ? post.status : 'inactive'}
                      onChange={(e) =>
                        handleStatusChange(post.application_id, e.target.value)
                      }
                      className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        post.status === 'active'
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
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaChevronLeft className="mr-1" />
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(filteredPosts.length / postsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                currentPage === index + 1 ? 'bg-blue-700' : ''
              }`}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredPosts.length / postsPerPage)
          }
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentPage === Math.ceil(filteredPosts.length / postsPerPage)
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          Next
          <FaChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default JobPostList;


// import React, { useEffect, useState } from 'react';
// import Layout from './RecruiterLayout';


// const RecruiterConsole = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/jobs');
//         if (res.ok) {
//           const data = await res.json();
//           setJobs(data.jobs || []);
//         } else {
//           setError('Failed to fetch jobs');
//         }
//       } catch (err) {
//         setError('Error fetching jobs');
//       }
//       setLoading(false);
//     };
//     fetchJobs();
//   }, []);

//   return (
//     <Layout>
//       <div className="recruiter-console">
//         <h2>Posted Jobs</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p style={{ color: 'red' }}>{error}</p>
//         ) : jobs.length === 0 ? (
//           <p>No jobs posted yet.</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Role</th>
//                 <th>Description</th>
//                 <th>Skills</th>
//                 <th>Experience</th>
//                 <th>Posted At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {jobs.map(job => (
//                 <tr key={job._id}>
//                   <td>{job.title}</td>
//                   <td>{job.role}</td>
//                   <td>{job.description}</td>
//                   <td>{job.skills}</td>
//                   <td>{job.experience}</td>
//                   <td>{new Date(job.postedAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default RecruiterConsole


// import React, { useEffect, useState } from 'react';
// import Layout from './RecruiterLayout';
// import './RecruiterConsole.css';

// const RecruiterConsole = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [applicants, setApplicants] = useState([]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/jobs');
//         const data = await res.json();
//         setJobs(data.jobs || []);
//       } catch (err) {
//         setError('Error fetching jobs');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const updateStatus = async (applicationId, status) => {
//   try {
//     const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ status }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       // Re-fetch applicants to reflect the change
//       fetchApplicants(selectedJobId);
//     } else {
//       console.error('Failed to update status:', data.error);
//       alert('Failed to update status.');
//     }
//   } catch (err) {
//     console.error('Error updating status:', err);
//     alert('Error updating status.');
//   }
// };


//   const fetchApplicants = async (jobId) => {
//     setSelectedJobId(jobId);
//     const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
//     const data = await res.json();
//     setApplicants(data.applications);
//   };

//   return (
//     <Layout>
//       <div className="recruiter-console">
//         <h2>Posted Jobs</h2>
//         {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Role</th>
//                 <th>Description</th>
//                 <th>Skills</th>
//                 <th>Experience</th>
//                 <th>Posted At</th>
//                 <th>Applications</th>
//               </tr>
//             </thead>
//             <tbody>
//               {jobs.map(job => (
//                 <tr key={job._id}>
//                   <td>{job.title}</td>
//                   <td>{job.role}</td>
//                   <td>{job.description}</td>
//                   <td>{job.skills}</td>
//                   <td>{job.experience}</td>
//                   {/* <td>{new Date(job.postedAt).toLocaleString()}</td> */}
//                   <td>
//   {new Date(job.postedAt).toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric'
//   })}
// </td>
//                   <td>
//                     <button onClick={() => fetchApplicants(job._id)}>Applications</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {selectedJobId && (
//           <div>
//             <h3>Applicants for Job ID: {selectedJobId}</h3>
//             <ul>
//               {applicants.length === 0 ? (
//                 <li>No applications found.</li>
//               ) : (
//                 applicants.map((app, i) => (
//   <li key={i}>
//     <p><strong>Name:</strong> {app.candidateName}</p>
//     <p><strong>Email:</strong> {app.email}</p>
//     <p><strong>Status:</strong> {app.result?.status || 'Pending'}</p>
//     <p><strong>Match:</strong> {app.result?.match}%</p>
    

//     {app.result?.reason && (
//       <p><strong>Reason:</strong> {app.result.reason}</p>
//     )}

//     <div style={{ marginTop: '8px' }}>
//       <button
//         onClick={() => updateStatus(app._id, 'Approved')}
//         disabled={app.result?.status === 'Approved'}
//         style={{ marginRight: '10px' }}
//       >
//         Approve
//       </button>
//       <button
//         onClick={() => updateStatus(app._id, 'Rejected')}
//         disabled={app.result?.status === 'Rejected'}
//       >
//         Reject
//       </button>
//     </div>

//     <hr />
//   </li>
// ))


//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default RecruiterConsole;


import React, { useEffect, useState } from 'react';
import Layout from './RecruiterLayout';
import './RecruiterConsole.css';

const RecruiterConsole = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (data.success) {
        // Re-fetch applicants to reflect the change
        fetchApplicants(selectedJobId);
      } else {
        console.error('Failed to update status:', data.error);
        alert('Failed to update status.');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status.');
    }
  };

  const fetchApplicants = async (jobId, jobTitle = '') => {
    setLoadingApplicants(true);
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    setShowModal(true);
    
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
      const data = await res.json();
      setApplicants(data.applications || []);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setApplicants([]);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const downloadApplicantsPDF = async (jobId, jobTitle) => {
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${jobId}/pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${jobTitle}_applicants.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to download PDF');
      }
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Error downloading PDF');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJobId(null);
    setSelectedJobTitle('');
    setApplicants([]);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <Layout>
      <div className="recruiter-console">
        <div className="console-header">
          <h2>Job Management Dashboard</h2>
          <p>Manage your posted jobs and review applications</p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.length === 0 ? (
              <div className="no-jobs">
                <h3>No jobs posted yet</h3>
                <p>Start by posting your first job to attract candidates.</p>
              </div>
            ) : (
              jobs.map(job => (
                <div key={job._id} className="job-card">
                  <div className="job-header">
                    <h3 className="job-title">{job.title}</h3>
                    <span className="job-role">{job.role}</span>
                  </div>
                  
                  <div className="job-content">
                    <p className="job-description">{job.description}</p>
                    
                    <div className="job-details">
                      <div className="detail-item">
                        <span className="detail-label">Skills:</span>
                        <span className="detail-value">{job.skills}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Experience:</span>
                        <span className="detail-value">{job.experience}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Posted:</span>
                        <span className="detail-value">
                          {new Date(job.postedAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="job-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => fetchApplicants(job._id, job.title)}
                    >
                      View Applications
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => downloadApplicantsPDF(job._id, job.title)}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Overlay */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Applications for: {selectedJobTitle}</h3>
                <button className="close-btn" onClick={closeModal}>×</button>
              </div>
              
              <div className="modal-body">
                {loadingApplicants ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading applicants...</p>
                  </div>
                ) : applicants.length === 0 ? (
                  <div className="no-applicants">
                    <h4>No applications yet</h4>
                    <p>This job hasn't received any applications.</p>
                  </div>
                ) : (
                  <div className="applicants-list">
                    {applicants.map((app, i) => (
                      <div key={i} className="applicant-card">
                        <div className="applicant-header">
                          <div className="applicant-info">
                            <h4>{app.candidateName}</h4>
                            <p className="applicant-email">{app.email}</p>
                          </div>
                          <div className={`status-badge ${getStatusClass(app.result?.status)}`}>
                            {app.result?.status || 'Pending'}
                          </div>
                        </div>
                        
                        <div className="applicant-details">
                          {app.result?.match && (
                            <div className="match-score">
                              <span className="match-label">Match Score:</span>
                              <div className="match-bar">
                                <div 
                                  className="match-fill" 
                                  style={{ width: `${app.result.match}%` }}
                                ></div>
                                <span className="match-percentage">{app.result.match}%</span>
                              </div>
                            </div>
                          )}
                          
                          {app.result?.reason && (
                            <div className="reason-section">
                              <span className="reason-label">Assessment:</span>
                              <p className="reason-text">{app.result.reason}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="applicant-actions">
                          <button
                            className={`btn ${app.result?.status === 'Approved' ? 'btn-success-disabled' : 'btn-success'}`}
                            onClick={() => updateStatus(app._id, 'Approved')}
                            disabled={app.result?.status === 'Approved'}
                          >
                            {app.result?.status === 'Approved' ? '✓ Approved' : 'Approve'}
                          </button>
                          <button
                            className={`btn ${app.result?.status === 'Rejected' ? 'btn-danger-disabled' : 'btn-danger'}`}
                            onClick={() => updateStatus(app._id, 'Rejected')}
                            disabled={app.result?.status === 'Rejected'}
                          >
                            {app.result?.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecruiterConsole;
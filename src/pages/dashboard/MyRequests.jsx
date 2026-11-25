import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { errorMessage } from '../../api';
import Spinner from '../../components/Spinner';

const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const statusBadge = {
  pending: 'badge-warning',
  approved: 'badge-success',
  rejected: 'badge-error',
};

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null); // request waiting for confirmation
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .get('/my-requests')
      .then((res) => setRequests(res.data))
      .catch((err) => toast.error(errorMessage(err, 'Could not load your requests')))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async () => {
    setBusy(true);
    try {
      await api.delete(`/requests/${cancelling._id}`);
      setRequests((prev) => prev.filter((r) => r._id !== cancelling._id));
      toast.success('Request cancelled');
      setCancelling(null);
    } catch (err) {
      toast.error(errorMessage(err, 'Could not cancel the request'));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">My requests</h1>

      {requests.length === 0 ? (
        <div className="text-center bg-base-100 rounded-box border border-base-300 p-12 mt-6">
          <p className="text-lg font-semibold">You have not requested any pets yet</p>
          <Link to="/pets" className="btn btn-primary mt-4">Browse pets</Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-box border border-base-300 mt-6">
          <table className="table">
            <thead>
              <tr>
                <th>Pet</th>
                <th>Request date</th>
                <th>Pickup date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td className="font-semibold">{r.petName}</td>
                  <td>{formatDate(r.createdAt)}</td>
                  <td>{formatDate(r.pickupDate)}</td>
                  <td><span className={`badge ${statusBadge[r.status]}`}>{r.status}</span></td>
                  <td>
                    <div className="flex gap-2 justify-end">
                      <Link to={`/pets/${r.petId}`} className="btn btn-sm btn-outline">View</Link>
                      {r.status !== 'approved' && (
                        <button onClick={() => setCancelling(r)} className="btn btn-sm btn-error btn-outline">Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cancelling && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Cancel request for {cancelling.petName}?</h3>
            <p className="py-3 text-sm opacity-80">The owner will no longer see your request.</p>
            <div className="modal-action">
              <button onClick={() => setCancelling(null)} className="btn" disabled={busy}>Keep request</button>
              <button onClick={handleCancel} className="btn btn-error" disabled={busy}>
                {busy ? <span className="loading loading-spinner loading-sm"></span> : 'Cancel request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

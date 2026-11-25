import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { errorMessage } from '../../api';
import { useAuth } from '../../context/AuthProvider';
import PetForm from '../../components/PetForm';
import Spinner from '../../components/Spinner';

export default function UpdatePet() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((res) => {
        // only the owner is allowed here
        if (res.data.ownerEmail !== user.email) {
          toast.error('You can only edit your own pets');
          navigate('/dashboard/my-listings', { replace: true });
          return;
        }
        setPet(res.data);
      })
      .catch(() => {
        toast.error('Pet not found');
        navigate('/dashboard/my-listings', { replace: true });
      })
      .finally(() => setLoading(false));
  }, [id, user.email, navigate]);

  const handleUpdate = async (data) => {
    setSubmitting(true);
    try {
      await api.put(`/pets/${id}`, data);
      toast.success('Pet updated');
      navigate('/dashboard/my-listings');
    } catch (err) {
      toast.error(errorMessage(err, 'Could not update the pet'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (!pet) return null;

  return (
    <div className="bg-base-100 rounded-box border border-base-300 p-6">
      <h1 className="text-2xl font-extrabold mb-6">Update {pet.name}</h1>
      <PetForm pet={pet} onSubmit={handleUpdate} submitting={submitting} buttonText="Save changes" />
    </div>
  );
}

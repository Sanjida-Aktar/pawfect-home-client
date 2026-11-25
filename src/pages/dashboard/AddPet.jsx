import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { errorMessage } from '../../api';
import PetForm from '../../components/PetForm';

export default function AddPet() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (data) => {
    setSubmitting(true);
    try {
      await api.post('/pets', data);
      toast.success('Pet added successfully');
      navigate('/dashboard/my-listings');
    } catch (err) {
      toast.error(errorMessage(err, 'Could not add the pet'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-base-100 rounded-box border border-base-300 p-6">
      <h1 className="text-2xl font-extrabold mb-1">Add a pet</h1>
      <p className="text-sm opacity-70 mb-6">Fill in the details so adopters know what to expect.</p>
      <PetForm onSubmit={handleAdd} submitting={submitting} buttonText="Add pet" />
    </div>
  );
}

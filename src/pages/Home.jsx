import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaHome, FaPaw, FaSyringe } from 'react-icons/fa';
import api from '../api';
import PetCard from '../components/PetCard';
import Spinner from '../components/Spinner';

const reasons = [
  { icon: <FaHeart />, title: 'You save a life', text: 'Every adopted pet frees up space for another animal that needs rescue.' },
  { icon: <FaHome />, title: 'Pets that already know people', text: 'Many of our pets are house trained and used to living with families.' },
  { icon: <FaSyringe />, title: 'Health is checked', text: 'Owners list vaccination and health status clearly before anyone adopts.' },
  { icon: <FaPaw />, title: 'Lower cost than buying', text: 'Adoption fees are usually much smaller than the price of a pet from a breeder.' },
];

const stories = [
  { name: 'Farzana & Bruno', text: 'We were nervous about getting a big dog in a flat, but Bruno is the calmest member of the house. He waits at the door every evening.', place: 'Dhaka' },
  { name: 'Tanvir & Luna', text: 'Luna came home in a small box and now owns the whole sofa. The pickup process was simple and the owner answered all my questions.', place: 'Chattogram' },
  { name: 'Nusrat & Snowy', text: 'My daughter wanted a rabbit for two years. Finding Snowy on PawHome was the easiest part, and he is her best friend now.', place: 'Sylhet' },
];

const tips = [
  { title: 'Keep a feeding routine', text: 'Feed adult dogs and cats at the same times every day. Fresh water should always be within reach.' },
  { title: 'Do not skip vaccines', text: 'Follow the vaccination schedule your vet gives you, and keep the card somewhere you can find it.' },
  { title: 'Give them daily exercise', text: 'Dogs need walks, cats need play, and rabbits need room to hop. Boredom leads to chewed furniture.' },
  { title: 'Make a safe corner', text: 'A new pet needs a quiet spot with a bed or a cage where it can rest without being disturbed.' },
];

const steps = [
  { title: 'Browse', text: 'Search by name or filter by species until you find a pet you like.' },
  { title: 'Send a request', text: 'Pick a pickup date and write a short message to the owner.' },
  { title: 'Owner replies', text: 'The owner reviews every request and approves one.' },
  { title: 'Welcome home', text: 'Meet the owner on the pickup date and bring your new friend home.' },
];

const faqs = [
  { q: 'Do I have to pay to adopt?', a: 'It depends on the owner. Some pets are free and others have a small adoption fee that is shown on the card.' },
  { q: 'Can I send requests for more than one pet?', a: 'Yes. You can send one request per pet and track all of them from My Requests.' },
  { q: 'What happens after my request is approved?', a: 'The pet is marked as adopted and the owner will meet you on the pickup date you chose.' },
  { q: 'Can I list my own pet for adoption?', a: 'Yes, use Add Pet from the dashboard. You can edit or remove the listing at any time.' },
];

export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/pets/featured')
      .then((res) => setPets(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* hero */}
      <section className="bg-base-200">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Somebody out there is waiting for you to come home
            </h1>
            <p className="mt-5 text-lg opacity-80 max-w-lg">
              Meet dogs, cats, rabbits and birds that need a family. Send an adoption request in a couple of minutes and track it from your dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pets" className="btn btn-primary btn-lg">Adopt Now</Link>
              <Link to="/dashboard/add-pet" className="btn btn-outline btn-lg">List a pet</Link>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80"
              alt="Golden retriever smiling"
              className="rounded-2xl h-64 w-full object-cover col-span-1 row-span-2 md:h-[28rem]"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80"
              alt="Cat looking at the camera"
              className="rounded-2xl h-32 w-full object-cover md:h-52"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <img
              src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=700&q=80"
              alt="Small white rabbit"
              className="rounded-2xl h-32 w-full object-cover md:h-52"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </motion.div>
        </div>
      </section>

      {/* featured pets */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold">Featured pets</h2>
            <p className="opacity-70 mt-1">The newest pets that are ready for a home.</p>
          </div>
          <Link to="/pets" className="btn btn-ghost text-primary">See all pets</Link>
        </div>

        {loading ? (
          <Spinner />
        ) : pets.length === 0 ? (
          <p className="text-center opacity-70 py-10">No pets are listed right now. Please check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
          </div>
        )}
      </section>

      {/* why adopt */}
      <section className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold">Why adopt a pet?</h2>
          <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="bg-base-100 rounded-box p-6 border border-base-300">
                <div className="text-2xl text-primary">{r.icon}</div>
                <h3 className="font-bold text-lg mt-3">{r.title}</h3>
                <p className="text-sm opacity-80 mt-2">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold">How adoption works</h2>
        <ol className="grid gap-6 mt-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-l-4 border-secondary pl-4">
              <span className="text-sm opacity-60">Step {i + 1}</span>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-sm opacity-80 mt-1">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* success stories */}
      <section className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold">Success stories</h2>
          <div className="grid gap-6 mt-8 md:grid-cols-3">
            {stories.map((s) => (
              <figure key={s.name} className="bg-base-100 rounded-box p-6 border border-base-300">
                <blockquote className="text-sm leading-relaxed opacity-90">“{s.text}”</blockquote>
                <figcaption className="mt-4 font-semibold">
                  {s.name} <span className="font-normal opacity-60">· {s.place}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* pet care tips */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold">Pet care tips</h2>
        <div className="grid gap-6 mt-8 sm:grid-cols-2">
          {tips.map((t) => (
            <div key={t.title} className="flex gap-4 p-5 rounded-box border border-base-300">
              <FaPaw className="text-secondary text-2xl mt-1 shrink-0" />
              <div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="text-sm opacity-80 mt-1">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="bg-base-200 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8">Questions people ask</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="faq" defaultChecked={i === 0} />
                <div className="collapse-title font-semibold">{f.q}</div>
                <div className="collapse-content text-sm opacity-80"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import SelectField from '../../components/SelectField';
import Loader from '../../components/Loader';
import InputField from '@/app/components/InputField';

export default function ProfileCard({ profile, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', gender: '', phone: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (profile) {
      setForm({ fullName: profile.full_name || '', email: profile.email || '', gender: profile.gender || '', phone: profile.phone || '' });
    }
  }, [profile]);

  const save = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    const fd = new FormData();
    fd.append('fullName', form.fullName);
    fd.append('email', form.email);
    fd.append('gender', form.gender);
    fd.append('phone', form.phone);
    if (file) fd.append('profileImage', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/profile`, { method: 'PUT', credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok) setMsg(data.message || 'Error');
      else {
        setMsg('Saved successfully');
        setEditing(false);
        onUpdate?.();
      }
    } catch (e) {
      setMsg('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
    window.location.href = '/login';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <div className="flex items-center gap-4">
        <img src={profile?.profile_image || '/default-profile.png'} alt="profile" className="w-20 h-20 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-lg">{profile?.full_name || 'Unknown User'}</div>
          <div className="text-gray-500 text-sm">{profile?.email}</div>
        </div>
      </div>

      {editing ? (
        <form onSubmit={save} className="space-y-3">
          <InputField id="fullName" label="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
          <InputField id="email" label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <SelectField id="gender" label="Gender" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} options={['Male', 'Female', 'Other']} />
          <InputField id="phone" label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center" type="submit">
              {loading ? <Loader text="Saving..." size={14} /> : 'Save'}
            </button>
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <div><span className="text-gray-500">Phone:</span> {profile?.phone || '-'}</div>
          <div><span className="text-gray-500">Gender:</span> {profile?.gender || '-'}</div>
          <div className="flex gap-2 mt-3">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={() => setEditing(true)}>Edit</button>
            <button className="px-3 py-1 border rounded" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
      {msg && <div className="text-sm mt-2">{msg}</div>}
    </div>
  );
}

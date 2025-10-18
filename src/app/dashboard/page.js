'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileCard from './components/ProfileCard';
import UploadForm from './components/UploadForm';
import FilesList from './components/FilesList';
import Loader from '../components/Loader';

export default function DashboardPage() {
    const [profile, setProfile] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/profile`, { credentials: 'include' });
            if (res.status === 401) return router.push('/login');
            const data = await res.json();
            setProfile(data);
        } catch (e) { console.error(e); }
    };

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/files`, { credentials: 'include' });
            if (res.status === 401) return router.push('/login');
            const data = await res.json();
            setFiles(data);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { fetchProfile(); fetchFiles(); }, []);

    return (
        <div className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                    <ProfileCard profile={profile} onUpdate={fetchProfile} />
                </div>
                <div className="md:col-span-2">
                    <UploadForm onUploaded={fetchFiles} />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Uploaded Files</h3>
                {loading ? <div className="flex justify-center"><Loader color="blue" size={30} /></div> : <FilesList files={files} onDeleted={fetchFiles} />}
            </div>
        </div>
    );
}

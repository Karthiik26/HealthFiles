'use client';
import { useState } from 'react';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import Loader from '../../components/Loader';

export default function UploadForm({ onUploaded }) {
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        if (!file) { setMsg('Please select a file'); return; }
        setLoading(true);
        const fd = new FormData();
        fd.append('fileType', fileType);
        fd.append('fileName', fileName);
        fd.append('file', file);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/files/upload`, { method: 'POST', credentials: 'include', body: fd });
            const data = await res.json();
            if (!res.ok) setMsg(data.message || 'Upload failed');
            else {
                setMsg('Uploaded successfully');
                setFile(null);
                setFileName('');
                setFileType('');
                onUploaded?.();
            }
        } catch (e) {
            setMsg('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <h3 className="font-semibold mb-2">Upload Medical File</h3>
            {msg && <div className="text-sm">{msg}</div>}
            <form onSubmit={submit} className="space-y-3">
                <SelectField id="fileType" label="File Type" value={fileType} onChange={e => setFileType(e.target.value)} options={['Lab Report', 'Prescription', 'X-Ray', 'Blood Report', 'MRI Scan', 'CT Scan']} />
                <InputField id="fileName" label="File Name" value={fileName} onChange={e => setFileName(e.target.value)} />
                <input type="file" accept=".pdf,image/*" onChange={e => setFile(e.target.files[0])} className="w-full border p-2 rounded" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center">
                    {loading ? <Loader text="Uploading..." size={14} /> : 'Upload'}
                </button>
            </form>
        </div>
    );
}

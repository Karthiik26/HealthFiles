'use client';
import { useState } from 'react';
import Loader from '../../components/Loader';

export default function FilesList({ files, onDeleted }) {
    const [deleting, setDeleting] = useState(null);
    const [viewImage, setViewImage] = useState(null); 
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/files/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!res.ok) {
                const data = await res.json();
                alert(data.message || 'Delete failed');
            } else {
                onDeleted?.();
            }
        } catch (e) {
            alert('Delete failed');
        } finally {
            setDeleting(null);
            setConfirmDelete(null);
            setLoading(false);
        }
    };

    if (!files || !files.length) return <div className="bg-white p-4 rounded shadow">No files uploaded yet.</div>;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {files.map((f) => (
                    <div key={f.id} className="bg-white p-4 rounded shadow flex items-start gap-3">
                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                            {f.file_url?.endsWith('.pdf') ? <div className="text-sm">PDF</div> : <img src={f.file_url} alt={f.file_name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">{f.file_name}</div>
                            <div className="text-sm text-gray-500">{f.file_type}</div>
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => {
                                        if (f.file_url?.endsWith('.pdf')) {
                                            window.open(f.file_url, '_blank');
                                        } else {
                                            setViewImage(f.file_url);
                                        }
                                    }}
                                    className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(f.id)}
                                    className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            {viewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-4 max-w-3xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
                            onClick={() => setViewImage(null)}
                        >
                            &times;
                        </button>
                        <img src={viewImage} alt="Preview" className="w-full h-auto object-contain" />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 text-center shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
                        <p className="mb-6">This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center"
                                onClick={() => { setDeleting(confirmDelete); handleDelete(confirmDelete); }}
                            >
                                {loading && deleting === confirmDelete ? <Loader color="blue-400" text="Deleting..." size={14} /> : 'Yes, Delete'}
                            </button>
                            <button
                                className="px-4 py-2 border rounded"
                                onClick={() => setConfirmDelete(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

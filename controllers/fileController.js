import pool from '../config/db.js';
import { cloudinary } from '../config/cloudinary.js';

// Upload Files in user account
export async function uploadFile(req, res) {
  try {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const { fileType, fileName } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // req.file.path is the Cloudinary URL provided by multer-storage-cloudinary
    const fileUrl = req.file.path;
    const publicId = req.file.filename || null;
    await pool.execute(
      'INSERT INTO files (user_id, file_name, file_type, file_url, public_id) VALUES (?, ?, ?, ?, ?)',
      [userId, fileName || req.file.originalname, fileType || 'Unknown', fileUrl, publicId]
    );

    res.json({ message: 'File uploaded', fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// get list of all files for logged in user
export async function listFiles(req, res) {
  try {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [files] = await pool.execute('SELECT id, file_name, file_type, file_url, uploaded_at FROM files WHERE user_id = ? ORDER BY uploaded_at DESC', [userId]);
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// delete a file by id
export async function deleteFile(req, res) {
  try {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const fileId = req.params.id;
    const [[file]] = await pool.execute('SELECT * FROM files WHERE id = ? AND user_id = ?', [fileId, userId]);
    if (!file) return res.status(404).json({ message: 'File not found' });

    // attempt to remove from Cloudinary by public_id (stored in public_id column)
    if (file.public_id) {
      await cloudinary.uploader.destroy(file.public_id, { resource_type: 'auto' }).catch(e => console.warn('cloud del warn', e.message));
    } else {
      const parts = file.file_url.split('/');
      const last = parts[parts.length - 1];
      const publicId = last.split('.')[0];
      await cloudinary.uploader.destroy(`medical_files/${publicId}`, { resource_type: 'auto' }).catch(e => console.warn('cloud del warn', e.message));
    }

    await pool.execute('DELETE FROM files WHERE id = ?', [fileId]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

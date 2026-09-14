import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiUpload, FiStar, FiDownload, FiTrash2, FiFolder } from 'react-icons/fi';
import Button from '../../components/common/Button';
import { documentService } from '../../services/api/documentService';
import { folders, generateMockDocuments } from './mockDocuments';

const ICON_LABEL = { pdf: 'PDF', xlsx: 'XLS', docx: 'DOC', pptx: 'PPT', zip: 'ZIP', image: 'IMG' };
const MIME_TYPES = {
  pdf: 'application/pdf',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  zip: 'application/zip',
  image: 'image/png',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  txt: 'text/plain',
};

const initialDocuments = generateMockDocuments(8);

function getDocumentBlob(doc) {
  const safeType = (doc.type || 'txt').toLowerCase();
  const mimeType = MIME_TYPES[safeType] || 'application/octet-stream';
  const fileText = `Nexora Document\n\nName: ${doc.name}\nUploaded: ${doc.uploadedAt || 'now'}\nType: ${safeType.toUpperCase()}\n\nThis is a generated preview content for the document.`;
  return new Blob([fileText], { type: mimeType });
}

function openDocument(doc) {
  const blob = doc.file instanceof File ? doc.file : getDocumentBlob(doc);
  const url = URL.createObjectURL(blob);
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');

  if (!newWindow) {
    toast.error('Popup blocked. Please allow popups and try again.');
  }

  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function downloadDocument(doc) {
  const blob = doc.file instanceof File ? doc.file : getDocumentBlob(doc);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = doc.name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Documents() {
  const [activeFolder, setActiveFolder] = useState('all');
  const [documents, setDocuments] = useState(initialDocuments);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const { data } = await documentService.upload(formData);
      setDocuments((prev) => [{
        id: data?.id || `DOC-${Date.now()}`,
        name: file.name,
        type: (file.name.split('.').pop() || 'pdf').toLowerCase(),
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        uploadedAt: 'Just now',
        favorite: false,
        file,
      }, ...prev]);
      toast.success('Document uploaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not upload document');
    } finally {
      event.target.value = '';
      setUploading(false);
    }
  };

  const handleDelete = (docId) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    toast.success('Document deleted');
  };

  return (
    <div>
      <div className="nx-page-header">
        <h2>Documents</h2>
        <Button leftIcon={<FiUpload size={16} />} onClick={() => fileInputRef.current?.click()} loading={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleUpload} />
      </div>

      <div className="nx-doc-toolbar">
        <div className="nx-flex nx-gap-2">
          <span
            className={`nx-doc-folder-row ${activeFolder === 'all' ? 'nx-doc-folder-row--active' : ''}`}
            onClick={() => setActiveFolder('all')}
          >
            <FiFolder size={14} /> All Files
          </span>
          {folders.map((f) => (
            <span
              key={f.id}
              className={`nx-doc-folder-row ${activeFolder === f.id ? 'nx-doc-folder-row--active' : ''}`}
              onClick={() => setActiveFolder(f.id)}
            >
              <FiFolder size={14} /> {f.name} ({f.count})
            </span>
          ))}
        </div>
      </div>

      <div className="nx-doc-grid">
        {documents.map((doc) => (
          <div className="nx-doc-card" key={doc.id} onClick={() => openDocument(doc)} style={{ cursor: 'pointer' }}>
            <div className="nx-flex nx-items-center nx-justify-between">
              <span className={`nx-file-icon nx-file-icon--${doc.type}`}>{ICON_LABEL[doc.type]}</span>
              {doc.favorite && <FiStar size={14} fill="var(--nx-amber-500)" color="var(--nx-amber-500)" />}
            </div>
            <div>
              <div className="nx-doc-card__name nx-truncate">{doc.name}</div>
              <div className="nx-doc-card__meta">{doc.size} · {doc.uploadedAt}</div>
            </div>
            <div className="nx-flex nx-gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="nx-btn nx-btn--ghost nx-btn--sm"
                aria-label="Download"
                onClick={() => downloadDocument(doc)}
              >
                <FiDownload size={14} />
              </button>
              <button
                type="button"
                className="nx-btn nx-btn--ghost nx-btn--sm"
                aria-label="Delete"
                onClick={() => handleDelete(doc.id)}
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  initialNote?: string;
}

export function NoteModal({ isOpen, onClose, onSave, initialNote = '' }: NoteModalProps) {
  const [note, setNote] = useState(initialNote);

  useEffect(() => {
    if (isOpen) {
      setNote(initialNote);
    }
  }, [isOpen, initialNote]);

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md border border-border relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-4 text-foreground">Add Note</h2>
        
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 p-3 rounded-md bg-background border border-border text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your notes here..."
        />
        
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

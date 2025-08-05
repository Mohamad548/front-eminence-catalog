import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  productName: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, productName }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-brand-slate rounded-2xl shadow-2xl p-4 sm:p-6 max-w-4xl w-11/12 max-h-[90vh] flex flex-col border border-brand-blue-sky/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-brand-blue-sky text-brand-blue-dark rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          aria-label="بستن مودال"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="flex-grow overflow-auto no-scrollbar">
            <img
            src={imageUrl}
            alt={productName}
            className="w-full h-auto object-contain rounded-lg"
            />
        </div>
        
        <h3 className="text-center text-xl font-bold text-brand-gray-light pt-4 mt-auto">
          {productName}
        </h3>
      </div>
    </div>
  );
};

export default ImageModal;
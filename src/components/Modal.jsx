

export default function Modal({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}                                                   
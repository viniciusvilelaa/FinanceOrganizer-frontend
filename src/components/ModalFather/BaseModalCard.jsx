import { useRef, useEffect } from "react"
import { X } from "lucide-react";

export default function BaseModalCard({ isOpen, onClose, children, title, size = "lg" }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if(!dialog) return null

        if(isOpen){
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        }else {
            dialog.close();
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }

     }, [isOpen]);

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        full: "max-w-full"
    };

    const maxWidthClass = sizeClasses[size] || "max-w-lg";

    return (
        <dialog ref={dialogRef} onClose={onClose} className={`bg-transparent border-none backdrop:bg-black/50 mx-auto my-auto w-full ${maxWidthClass}`}>
            <div className="fixed inset-0 z-40 " onClick={onClose}></div>

            <div className="relative z-50 bg-white rounded-2xl shadow-xl p-6" onClick={(e)=> e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"> 
                        <X className="w-5 h-5" ></X>
                    </button>
                </div>

                {children}
            </div>

        </dialog>
    );
}
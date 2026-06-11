import { useRef, useEffect } from "react"
import { X } from "lucide-react";

export default function BaseModalCard({ isOpen, onClose, children, title }) {
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


    return (
        <dialog ref={dialogRef} onClose={onClose} className="bg-transparent border-none backdrop:bg-black/50 mx-auto">
            <div className="fixed inset-0 z-40 " onClick={onClose}></div>

            <div className="relative z-50 bg-white rounded-2xl shadow-x1 p-6 w-full max-w-md" onClick={(e)=> e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray400 hover:text-gray-600 transition-colors"> 
                        <X className="w-5 h-5" ></X>
                    </button>
                </div>

                {children}
            </div>

        </dialog>
    );
}
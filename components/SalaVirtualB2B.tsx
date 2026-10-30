export interface SalaVirtualB2BProps {
  isOpen: boolean;
  onClose: () => void;
  initialApp?: string;
  appLogo?: string;
}

export function SalaVirtualB2B({
  isOpen,
  onClose,
  initialApp = 'ASL Ideas SpA',
  appLogo = '/logo-asl.png.png',
}: SalaVirtualB2BProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#2D362D] text-white w-full max-w-4xl rounded-3xl border-2 border-[#97A884] p-6 shadow-2xl relative space-y-4">
        {/* Contenido del modal */}
      </div>
    </div>
  );
}
export default SalaVirtualB2B;
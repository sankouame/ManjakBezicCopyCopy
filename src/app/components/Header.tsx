import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ title, showBack = true, onBack, actions, className = "" }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`bg-white border-b border-border px-4 pt-12 pb-4 sticky top-0 z-10 ${className}`}>
      <div className="flex items-center justify-between">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 text-foreground"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        {title && (
          <h1 className={`text-xl font-bold text-foreground ${showBack ? "" : "flex-1"}`}>
            {title}
          </h1>
        )}

        {actions && (
          <div className="flex gap-2 ml-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

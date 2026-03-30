export function CoreLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(0,255,65,0.3)]"
      >
        {/* Background Glow */}
        <circle cx="50" cy="50" r="45" fill="#051505" className="opacity-80" />
        
        {/* Monolith Base */}
        <path 
          d="M35 20 L65 15 L65 85 L35 90 Z" 
          fill="#111" 
          stroke="#222" 
          strokeWidth="1"
        />
        
        {/* Left Face */}
        <path 
          d="M35 20 L50 17 L50 87 L35 90 Z" 
          fill="url(#metal-gradient-left)" 
        />
        
        {/* Right Face */}
        <path 
          d="M50 17 L65 15 L65 85 L50 87 Z" 
          fill="url(#metal-gradient-right)" 
        />
        
        {/* Top Face */}
        <path 
          d="M35 20 L50 17 L65 15 L50 18 Z" 
          fill="#333" 
        />
        
        {/* Circuit Lines - Left */}
        <path d="M35 40 L45 40 L45 60" stroke="#00FF41" strokeWidth="0.5" fill="none" className="opacity-80" />
        <circle cx="45" cy="60" r="1" fill="#00FF41" />
        
        <path d="M35 60 L40 60 L40 30" stroke="#00FF41" strokeWidth="0.5" fill="none" className="opacity-80" />
        <circle cx="40" cy="30" r="1" fill="#00FF41" />
        
        <path d="M35 75 L42 75 L42 50 L48 50" stroke="#00FF41" strokeWidth="0.5" fill="none" className="opacity-80" />
        <circle cx="48" cy="50" r="1" fill="#00FF41" />
        
        {/* Circuit Lines - Right */}
        <path d="M65 30 L55 30 L55 50" stroke="#00FF41" strokeWidth="0.5" fill="none" className="opacity-80" />
        <circle cx="55" cy="50" r="1" fill="#00FF41" />
        
        <path d="M65 50 L60 50 L60 70" stroke="#00FF41" strokeWidth="0.5" fill="none" className="opacity-80" />
        <circle cx="60" cy="70" r="1" fill="#00FF41" />
        
        <path d="M65 70 L58 70 L58 40 L52 40" stroke="#00FF41" strokeWidth="0.5" fill="none" className="opacity-80" />
        <circle cx="52" cy="40" r="1" fill="#00FF41" />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="metal-gradient-left" x1="35" y1="20" x2="50" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
          <linearGradient id="metal-gradient-right" x1="50" y1="17" x2="65" y2="17" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#111" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

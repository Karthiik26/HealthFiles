'use client';

export default function Loader({ size = 16, color = 'white', text = '', className = '' }) {
    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <span
                className="loader"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderTopColor: color,
                }}
            ></span>
            {text && <span>{text}</span>}

            <style jsx>{`
        .loader {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-style: solid;
          border-top-width: 3px;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
}

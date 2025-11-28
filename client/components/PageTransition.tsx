import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

// CSS puro para transiciones optimizadas
const transitionStyles = `
  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .page-transition {
    animation: pageEnter 0.25s ease-out forwards;
  }
`;

const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
    return (
        <>
            <style>{transitionStyles}</style>
            <div className={`page-transition ${className}`}>
                {children}
            </div>
        </>
    );
};

export default PageTransition;

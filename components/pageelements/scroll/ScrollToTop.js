import { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

   const toggleVisibility = () => {
     if (window.pageYOffset > 300) {
       setIsVisible(true);
     } else {
       setIsVisible(false);
     }
   };

    const scrollUp = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);


   return (
     <div className="fixed bottom-2 right-2">
       <button
         type="button"
         onClick={scrollUp}
         className={`${
           isVisible ? "scroll-btn opacity-100" : "scroll-btn opacity-0"
         }`}
       >
         <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
       </button>
     </div>
   );
}

export default ScrollToTop;
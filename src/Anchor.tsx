import { useEffect, useRef } from "react";

const Anchor = () => {
  const ss = useRef(null);
  useEffect(() => {
    ss.current?.focus();
  }, []);
  return (
    <>
      <a href="https://www.google.com/" ref={ss}>
        Click here for navigation
      </a>
    </>
  );
};
export default Anchor;

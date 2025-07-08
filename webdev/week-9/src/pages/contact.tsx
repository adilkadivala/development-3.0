import { useRef } from "react";

const Contact = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  return (
    <>
      <div>This is Contact Page</div>
      Name<input ref={nameRef} type="text"></input>
      email<input type="text"></input>
      <button type="submit" ref={emailRef} style={{ cursor: "pointer" }}>
        submit
      </button>
    </>
  );
};

export default Contact;

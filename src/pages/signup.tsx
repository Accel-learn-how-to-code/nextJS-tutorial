import { useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export default function login() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [person, setPerson] = useState<any>(null);

  const handleSignup = async () => {
    const respond = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passRef.current?.value,
      }),
    });

    const result = await respond.json();
    setPerson(result);
  };

  return (
    <div>
      <h1>Create a new user!!</h1>
      {JSON.stringify(person)}
      <input type="text" placeholder="name" ref={nameRef} />
      <input type="text" placeholder="email" ref={emailRef} />
      <input type="password" placeholder="password" ref={passRef} />
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
}

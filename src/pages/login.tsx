import { useRef, useState } from "react";

export default function login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [person, setPerson] = useState<any>(null);

  const handleLogin = async () => {
    const respond = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passRef.current?.value,
      }),
    });

    const result = await respond.json();
    setPerson(result);
  };

  return (
    <div>
      {JSON.stringify(person)}
      <input type="text" placeholder="email" ref={emailRef} />
      <input type="password" placeholder="password" ref={passRef} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

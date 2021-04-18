import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>Hello Long</h1>
      <div>
        <Link href="/people">
          <a>People</a>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </div>
      <div>
        <Link href="/signup">
          <a>Sign up</a>
        </Link>s
      </div>
    </div>
  );
}

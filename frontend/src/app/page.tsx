"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import axios from 'axios';

// graphQL query to get anime/user
const GET_USER_QUERY = `
  query {
    user {
      username
      password 
      email
    }
  }
`;

const CREATE_USER_QUERY = `
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      password
      username
      email
    }
  }
`;


export default function Home() {
  
  // variables used to set/collect users 
  const [user, setUser] = useState<any[]>([]);
  const [loading, setLoading] =  useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  // variables to set new user
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // function to fetch user 
  const fetchUser = async () => {
    
    console.log("pressed");
    setLoading(true);
    setError(null);
    setUser([]);
    try {
      const response = await axios.post(
        'http://localhost:5000/graphql', 
        {
          query: GET_USER_QUERY,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("valid response")
      console.log(response.data)
      setUser(response.data.data.user);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log(username);
      console.log(email);
      console.log(password);
      const response = await axios.post(
        'http://localhost:5000/graphql', // Your API endpoint for signup
        {
          query: CREATE_USER_QUERY,
          variables: {
            username,
            email,
            password
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        console.log(response);
        setSuccess("Sign up successful!");
        // Optionally reset form fields
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by dafdasf&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div>
        <button onClick={fetchUser} >
          Fetch User
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {user.map((item) => (
            <li key={item.id}>
              <strong>{item.username}</strong>: {item.email}
            </li>
          ))}
        </ul>
      </div>

          <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}

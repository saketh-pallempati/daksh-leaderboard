"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
interface Data {
  _id: string;
  username: string;
  numberOfElements: number;
}

export default function Home() {
  const [data, setData] = useState<Data[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://daksh-soc-backend.vercel.app/leaderboard",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className={styles.sus}>
      <main className={styles.main}>
        <div id={styles.header}>
          <h1>Leader board</h1>
          <div className={styles.endItems}>
            <Link href={"inbox"}>
              <Image
                src={"/message-regular.svg"}
                alt="inbox"
                width={30}
                height={30}
              ></Image>
            </Link>
            <button className={styles.share} onClick={fetchData}>
              <Image
                src={"/refresh.png"}
                alt="refresh"
                width={30}
                height={30}
              ></Image>
            </button>
          </div>
        </div>
        <div id={styles.leaderboard}>
          <div className={styles.ribbon}></div>
          <table>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr key={obj._id}>
                    <td className={styles.number}>{index + 1}</td>
                    <td className={styles.name}>{obj.username}</td>
                    <td className={styles.points}>
                      {obj.numberOfElements}
                      {index == 0 && (
                        <Image
                          className={styles.goldMedal}
                          src="/gold-medal.png"
                          alt="gold medal"
                          width={60}
                          height={36}
                        ></Image>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

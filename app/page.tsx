"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
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
    <main>
      <div id="header">
        <h1>Leader board</h1>
        <button className="share" onClick={fetchData}>
          <Image
            src={"/refresh.png"}
            alt="refresh"
            width={40}
            height={40}
          ></Image>
        </button>
      </div>
      <div id="leaderboard">
        <div className="ribbon"></div>
        <table>
          {data.map((obj, index) => {
            return (
              <tr key={obj._id}>
                <td className="number">{index + 1}</td>
                <td className="name">{obj.username}</td>
                <td className="points">
                  {obj.numberOfElements}
                  {index == 0 && (
                    <Image
                      className="gold-medal"
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
        </table>
      </div>
    </main>
  );
}

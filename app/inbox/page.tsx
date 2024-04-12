"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";

interface Message {
  username: string;
  message: string;
  dateTime: string;
}
function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      username: "admin",
      message: "Messages sent through the terminal will be visible here",
      dateTime: new Date().toISOString(),
    },
  ]);
  useEffect(() => {
    const socket = io("https://daksh-soc-backend.vercel.app", {
      withCredentials : true
    });
    socket.on(
      "message",
      (username: string, message: string, dateTime: string) => {
        setMessages((prevMessages) => [
          { username, message, dateTime },
          ...prevMessages,
        ]);
      }
    );
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className={styles.overall}>
      <h1 className="text-5xl m-2 text-pretty text">INBOX</h1>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => {
          return (
            <a className={styles.messageWrapper} key={index}>
              <div className={styles.thumbnail}>
                {msg.username[0].toUpperCase()}
              </div>
              <div className={styles.name}>{msg.username}</div>
              <div className={styles.agoTime}>{timeAgo(msg.dateTime)}</div>
              <div className={styles.messageText}>{msg.message}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Inbox;

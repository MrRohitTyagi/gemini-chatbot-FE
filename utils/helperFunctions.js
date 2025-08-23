"use clients";

export function getStoredChats() {
  const chats = localStorage.getItem("chats");
  try {
    return JSON.parse(chats);
  } catch (e) {
    console.error("Error parsing stored chats:", e);
    return [];
  }
}

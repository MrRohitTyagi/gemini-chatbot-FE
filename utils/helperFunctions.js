export async function mok(input) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("THIS is a rendomm message form chat app" + input);
    }, 1000);
  });
}

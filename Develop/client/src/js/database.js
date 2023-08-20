import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("putDb implemented");

  //open database to name transaction
  const jateDb = await openDB("jate", 1);
  //name transaction to know what store
  const tx = jateDb.transaction("jate", "readwrite");
  //open store to make transaction
  const store = tx.objectStore("jate");
  //execute transaction
  const request = store.put({ content: content });

  //confrim transaction has been made
  const result = await request;
  console.log("Content saved to Db", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("getDb implemented");

  //open database to name transaction
  const jateDb = await openDB("jate", 1);
  //name type of transaction for store
  const tx = jateDb.transaction("jate", "readonly");
  //open store
  const store = tx.objectStore("jate");
  //execute transaction
  const request = store.get(1);

  //check to confirm
  const result = await request;
  result
    ? console.log("data retreived from DB")
    : console.log("data not retreived");

  return result?.value;
};

initdb();

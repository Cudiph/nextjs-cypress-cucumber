import Database from 'better-sqlite3';

let populated = false;
const db = new Database(':memory:')
// const db = new Database('data.sqlite')

export interface CredentialSchema {
  username: string;
  hashed_password: string;
}

export function initSchema() {
  const query = `CREATE TABLE IF NOT EXISTS credential (
    username TEXT PRIMARY KEY,
    hashed_password TEXT NOT NULL
  )`
  db.exec(query);
  populated = true;
}

export function getDB() {
  if (!populated) initSchema();
  return db;
}

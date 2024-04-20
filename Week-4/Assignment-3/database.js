import mysql from "mysql2";//ES Modules方式注入

import dotenv from "dotenv";//注入.env檔案
dotenv.config();


//【串聯資料庫】
//pool is a collection and connection to the database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database:   process.env.MYSQL_DATABASE,
}).promise();
//當這個專案用promise而非callback時，要加上promise()，否則會報錯
//先node database.js測試是否連接成功(Terminal沒有報錯即成功)

//【操作資料庫】
//在pool物件上呼叫query方法，就可以執行SQL指令
//查詢全部user
export async function getUsers(){
  const [rows]= await pool.query("select * from user");
  return rows;
}
//用id取user
export async function getUserById(id){
  const [rows]= await pool.query(`
  select * 
  from user 
  where id = ?
  `, [id]);//不能相信的資料要用?，並放id在query的第二個參數，以防使用者傳入會讓資料庫爆掉的資料
  return rows[0];
}

//用email取user
export async function getUserByEmail(email){
  const [rows]= await pool.query(`
  select * 
  from user 
  where email = ?
  `, [email]);
  return rows[0];
}

//用email和password取user
export async function getUserByEmailAndPassword(email, password){
  const [rows]= await pool.query(`
  select * 
  from user 
  where email = ? and password = ?
  `, [email, password]);
  return rows[0];
}

//建立資料，回傳id
export async function createUser(email, password) {
  try {
    const [result] = await pool.query(`
      INSERT INTO user (email, password)
      VALUES (?, ?)
    `, [email, password]);
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    return null; 
  }
}
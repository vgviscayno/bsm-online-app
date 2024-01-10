import {
  char,
  mysqlTable,
  primaryKey,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: char("id", { length: 36 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 15 }),
  },
  (table) => {
    return {
      usersId: primaryKey({ columns: [table.id], name: "users_id" }),
      email: unique("email").on(table.email),
    };
  }
);

import { boolean, datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { generateId } from "lucia";

export const userTable = mysqlTable("user", {
  id: varchar("id", {
    length: 255,
  })
    .primaryKey()
    .default(generateId(6)),
  phone_number: varchar("user_id", {
    length: 10,
  }).notNull(),
  phone_number_verified: boolean("phone_number_verified").default(false),
});

export const sessionTable = mysqlTable("session", {
  id: varchar("id", {
    length: 255,
  })
    .primaryKey()
    .default(generateId(6)),
  userId: varchar("user_id", {
    length: 255,
  })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});

export const phoneNumberVerificationTable = mysqlTable(
  "phone_number_verification",
  {
    id: varchar("id", {
      length: 255,
    })
      .primaryKey()
      .default(generateId(6)),
    code: varchar("code", {
      length: 255,
    }).notNull(),
    userId: varchar("user_id", {
      length: 255,
    })
      .unique()
      .notNull(),
    phoneNumber: varchar("phone_number", {
      length: 255,
    }).notNull(),
    expiresAt: datetime("expires_at").notNull(),
  }
);

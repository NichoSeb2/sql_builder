/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const { buildSQL } = require("../src/SQL");
const assert = require("assert");

describe("SQL", () => 
{
	describe("FROM one db", () => 
	{
		describe("SELECT", () => 
		{
			it("SELECT table_test.* FROM table_test", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.id, table_test.pseudo FROM table_test", () => 
			{
				const expected_sql = "SELECT table_test.id, table_test.pseudo FROM table_test";

				const tables = [
					{value: "table_test"}];
				const fields = [
					{table: 0, value: "id"}, 
					{table: 0, value: "pseudo"}
				];

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test WHERE table_test.id = 0", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test WHERE table_test.id = \"0\"";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const wheres = [
					{table: 0, field: "id", operator: "=", value: "0"}
				];

				const sql = buildSQL("SELECT", tables, fields, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test WHERE table_test.id = 0 AND table_test.pseudo != \"test\"", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test WHERE table_test.id = 0 AND table_test.pseudo != \"test\"";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const wheres = [
					{table: 0, field: "id", operator: "=", value: 0, separator: "AND"}, 
					{table: 0, field: "pseudo", operator: "!=", value: "test"}
				];

				const sql = buildSQL("SELECT", tables, fields, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test WHERE table_test.id = 0 OR table_test.pseudo != \"test\"", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test WHERE table_test.id = 0 OR table_test.pseudo != \"test\"";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const wheres = [
					{table: 0, field: "id", operator: "=", value: 0, separator: "OR"}, 
					{table: 0, field: "pseudo", operator: "!=", value: "test"}
				];

				const sql = buildSQL("SELECT", tables, fields, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test ORDER BY table_test.id ASC", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test ORDER BY table_test.id ASC";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const orders = [
					{table: 0, field: "id", way: "ASC"}
				];

				const sql = buildSQL("SELECT", tables, fields, null, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test ORDER BY table_test.id ASC, table_test.pseudo DESC", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test ORDER BY table_test.id ASC, table_test.pseudo DESC";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const orders = [
					{table: 0, field: "id", way: "ASC"}, 
					{table: 0, field: "pseudo", way: "DESC"}
				];

				const sql = buildSQL("SELECT", tables, fields, null, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test ORDER BY table_test.id asc, table_test.pseudo desc", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test ORDER BY table_test.id ASC, table_test.pseudo DESC";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const orders = [
					{table: 0, field: "id", way: "asc"}, 
					{table: 0, field: "pseudo", way: "desc"}
				];

				const sql = buildSQL("SELECT", tables, fields, null, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test LIMIT 5", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test LIMIT 5";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const limits = {limit: 5};

				const sql = buildSQL("SELECT", tables, fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test LIMIT 10", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test LIMIT 10";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{value: "*"}
				];
				const limits = {limit: 10};

				const sql = buildSQL("SELECT", tables, fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.* FROM table_test LIMIT 10 OFFSET 5", () => 
			{
				const expected_sql = "SELECT table_test.* FROM table_test LIMIT 10 OFFSET 5";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const limits = {limit: 10, offset: 5};

				const sql = buildSQL("SELECT", tables, fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table_test.country FROM table_test", () => 
			{
				const expected_sql = "SELECT table_test.country FROM table_test";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "country"}
				];

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT DISTINCT table_test.country FROM table_test", () => 
			{
				const expected_sql = "SELECT DISTINCT table_test.country FROM table_test";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "country"}
				];
				const options = {distinct: true};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT COUNT (table_test.*) FROM table_test", () => 
			{
				const expected_sql = "SELECT COUNT (table_test.*) FROM table_test";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const options = {count: true};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT DISTINCT COUNT (table_test.*) FROM table_test", () => 
			{
				const expected_sql = "SELECT DISTINCT COUNT (table_test.*) FROM table_test";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const options = {count: true, distinct: true};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("INSERT", () => 
		{
			it("INSERT INTO table_test (table_test.pseudo) VALUES (\"test\")", () => 
			{
				const expected_sql = "INSERT INTO table_test (table_test.pseudo) VALUES (\"test\")";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test"}
				];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("INSERT INTO table_test (table_test.pseudo, table_test.activity) VALUES (\"test_pseudo\", \"test_activity\")", () => 
			{
				const expected_sql = "INSERT INTO table_test (table_test.pseudo, table_test.activity) VALUES (\"test_pseudo\", \"test_activity\")";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test_pseudo"}, 
					{table: 0, field: "activity", value: "test_activity"}
				];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("INSERT INTO table_test (table_test.pseudo, table_test.points) VALUES (\"test_pseudo\", 10)", () => 
			{
				const expected_sql = "INSERT INTO table_test (table_test.pseudo, table_test.points) VALUES (\"test_pseudo\", 10)";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test_pseudo"}, 
					{table: 0, field: "points", value: 10}
				];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("INSERT INTO table_test (table_test.pseudo, table_test.content, table_test.image_url) VALUES (\"test\", NULL, NULL)", () => 
			{
				const expected_sql = "INSERT INTO table_test (table_test.pseudo, table_test.content, table_test.image_url) VALUES (\"test\", NULL, NULL)";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test"}, 
					{table: 0, field: "content", value: "null"}, 
					{table: 0, field: "image_url", value: null}
				];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			// eslint-disable-next-line quotes
			it('INSERT INTO table_test (table_test.pseudo) VALUES ("mon \\"super\\" pseudo")', () => 
			{
				// eslint-disable-next-line quotes
				const expected_sql = 'INSERT INTO table_test (table_test.pseudo) VALUES ("mon \\"super\\" pseudo")';

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					// eslint-disable-next-line quotes
					{table: 0, field: "pseudo", value: 'mon "super" pseudo'}
				];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("UPDATE", () => 
		{
			it("UPDATE table_test SET table_test.pseudo = \"test_pseudo\"", () => 
			{
				const expected_sql = "UPDATE table_test SET table_test.pseudo = \"test_pseudo\"";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test_pseudo"}
				];

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET table_test.pseudo = \"test_pseudo\", table_test.activity = \"test_activity\"", () => 
			{
				const expected_sql = "UPDATE table_test SET table_test.pseudo = \"test_pseudo\", table_test.activity = \"test_activity\"";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test_pseudo"}, 
					{table: 0, field: "activity", value: "test_activity"}
				];

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET table_test.pseudo = \"test_pseudo\", table_test.points = 10", () => 
			{
				const expected_sql = "UPDATE table_test SET table_test.pseudo = \"test_pseudo\", table_test.points = 10";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test_pseudo"}, 
					{table: 0, field: "points", value: 10}
				];

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET table_test.activity = \"test_activity\" WHERE table_test.pseudo = \"test_pseudo\"", () => 
			{
				const expected_sql = "UPDATE table_test SET table_test.activity = \"test_activity\" WHERE table_test.pseudo = \"test_pseudo\"";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "activity", value: "test_activity"}
				];
				const wheres = [
					{table: 0, field: "pseudo", operator: "=", value: "test_pseudo"}
				];

				const sql = buildSQL("UPDATE", tables, fields, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET table_test.activity = \"test_activity\" WHERE table_test.pseudo = \"test_pseudo\" AND table_test.line_up != \"test_line_up\"", () => 
			{
				const expected_sql = "UPDATE table_test SET table_test.activity = \"test_activity\" WHERE table_test.pseudo = \"test_pseudo\" AND table_test.line_up != \"test_line_up\"";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "activity", value: "test_activity"}
				];
				const wheres = [
					{table: 0, field: "pseudo", operator: "=", value: "test_pseudo", separator: "AND"}, 
					{table: 0, field: "line_up", operator: "!=", value: "test_line_up"}
				];

				const sql = buildSQL("UPDATE", tables, fields, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET table_test.activity = \"test_activity\" WHERE table_test.pseudo = \"test_pseudo\" AND table_test.id = 5", () => 
			{
				const expected_sql = "UPDATE table_test SET table_test.activity = \"test_activity\" WHERE table_test.pseudo = \"test_pseudo\" AND table_test.id = 5";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "activity", value: "test_activity"}
				];
				const wheres = [
					{table: 0, field: "pseudo", operator: "=", value: "test_pseudo", separator: "AND"}, 
					{table: 0, field: "id", operator: "=", value: 5}
				];

				const sql = buildSQL("UPDATE", tables, fields, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET table_test.pseudo = \"test_pseudo\", table_test.content = NULL, table_test.image_url = NULL", () => 
			{
				const expected_sql = "UPDATE table_test SET table_test.pseudo = \"test_pseudo\", table_test.content = NULL, table_test.image_url = NULL";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test_pseudo"}, 
					{table: 0, field: "content", value: "null"}, 
					{table: 0, field: "image_url", value: null}
				];

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			// eslint-disable-next-line quotes
			it('UPDATE table_test SET table_test.pseudo = "mon \\"super\\" pseudo"', () => 
			{
				// eslint-disable-next-line quotes
				const expected_sql = 'UPDATE table_test SET table_test.pseudo = "mon \\"super\\" pseudo"';

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					// eslint-disable-next-line quotes
					{table: 0, field: "pseudo", value: 'mon "super" pseudo'}
				];

				const sql = buildSQL("UPDATE", tables, fields);

				console.log(sql);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("DELETE", () => 
		{
			it("DELETE FROM table_test WHERE table_test.pseudo = test", () => 
			{
				const expected_sql = "DELETE FROM table_test WHERE table_test.pseudo = \"test\"";

				const tables = [
					{value: "table_test"}
				];
				const wheres = [
					{table: 0, field: "pseudo", operator: "=", value: "test"}
				];

				const sql = buildSQL("DELETE", tables, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("DELETE FROM table_test WHERE table_test.pseudo = test_pseudo AND table_test.activity = test_activity", () => 
			{
				const expected_sql = "DELETE FROM table_test WHERE table_test.pseudo = \"test_pseudo\" AND table_test.activity != \"test_activity\"";

				const tables = [
					{value: "table_test"}
				];
				const wheres = [
					{table: 0, field: "pseudo", operator: "=", value: "test_pseudo", separator: "AND"}, 
					{table: 0, field: "activity", operator: "!=", value: "test_activity"}
				];

				const sql = buildSQL("DELETE", tables, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("DELETE FROM table_test WHERE table_test.id = 5", () => 
			{
				const expected_sql = "DELETE FROM table_test WHERE table_test.id = 5";

				const tables = [
					{value: "table_test"}
				];
				const wheres = [
					{table: 0, field: "id", operator: "=", value: 5}
				];

				const sql = buildSQL("DELETE", tables, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("TRUNCATE", () => 
		{
			it("DELETE FROM table_test, ALTER TABLE table_test AUTO_INCREMENT = 1", () => 
			{
				const expected_sql = "DELETE FROM table_test; ALTER TABLE table_test AUTO_INCREMENT = 1";

				const tables = [
					{value: "table_test"}
				];

				const sql = buildSQL("TRUNCATE", tables);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("ALTER", () => 
		{
			it("ALTER TABLE table_test AUTO_INCREMENT = 1", () => 
			{
				const expected_sql = "ALTER TABLE table_test AUTO_INCREMENT = 1";

				const tables = [
					{value: "table_test"}
				];
				const fields = [
					{field: "AUTO_INCREMENT", value: 1, noTable: true}
				];

				const sql = buildSQL("ALTER", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});
		});
	});

	describe("FROM multiple db", () => 
	{
		describe("SELECT", () => 
		{
			it("SELECT table1.*, table2.* FROM table1, table2 WHERE table1.id = table2.id", () => 
			{
				const expected_sql = "SELECT table1.*, table2.* FROM table1, table2 WHERE table1.id = table2.id";

				const tables = [
					{value: "table1"}, 
					{value: "table2"}
				];
				const fields = [
					{table: 0, value: "*"}, 
					{table: 1, value: "*"}
				];
				const options = {multiple: "id"};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT member.id, member.pseudo, team.name FROM member, team WHERE member.team_id = team.team_id", () => 
			{
				const expected_sql = "SELECT member.id, member.pseudo, team.name FROM member, team WHERE member.team_id = team.team_id";

				const tables = [
					{value: "member"}, 
					{value: "team"}
				];
				const fields = [
					{table: 0, value: "id"}, 
					{table: 0, value: "pseudo"}, 
					{table: 1, value: "name"}
				];
				const options = {multiple: "team_id"};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT member.id, member.pseudo, team.name, color.code FROM member, team, color WHERE member.team_id = team.team_id AND team.team_id = color.team_id", () => 
			{
				const expected_sql = "SELECT member.id, member.pseudo, team.name, color.code FROM member, team, color WHERE member.team_id = team.team_id AND team.team_id = color.team_id";

				const tables = [
					{value: "member"}, 
					{value: "team"}, 
					{value: "color"}];
				const fields = [
					{table: 0, value: "id"}, 
					{table: 0, value: "pseudo"}, 
					{table: 1, value: "name"}, 
					{table: 2, value: "code"}
				];
				const options = {multiple: "team_id"};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table1.*, table2.* FROM table1, table2 WHERE table1.id = table2.id ORDER BY table1.created_at DESC", () => 
			{
				const expected_sql = "SELECT table1.*, table2.* FROM table1, table2 WHERE table1.id = table2.id ORDER BY table1.created_at DESC";

				const tables = [
					{value: "table1"}, 
					{value: "table2"}
				];
				const fields = [
					{table: 0, value: "*"}, 
					{table: 1, value: "*"}
				];
				const orders = [
					{field: "table1.created_at", way: "DESC", noTable: true}
				];
				const options = {multiple: "id"};

				const sql = buildSQL("SELECT", tables, fields, null, orders, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT table1.*, table2.* FROM table1, table2 WHERE table1.id = 1 AND table1.id = table2.id ORDER BY table1.created_at DESC", () => 
			{
				const expected_sql = "SELECT table1.*, table2.* FROM table1, table2 WHERE table1.id = 1 AND table1.id = table2.id ORDER BY table1.created_at DESC";

				const tables = [
					{value: "table1"}, 
					{value: "table2"}
				];
				const fields = [
					{table: 0, value: "*"}, 
					{table: 1, value: "*"}
				];
				const wheres = [
					{table:0, field: "id", value: 1, operator: "=", separator: "AND"}
				];
				const orders = [
					{table: 0, field: "created_at", way: "DESC"}
				];
				const options = {multiple: "id"};

				const sql = buildSQL("SELECT", tables, fields, wheres, orders, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT M0.*, T.*, (SELECT M1.created_at FROM message AS M1 WHERE M1.id = M0.id) AS M1_created_at FROM message AS M0, team AS T WHERE M0.id = T.id", () => 
			{
				// Secondary request
				let tables = [
					{value: "message", as: "M1"}
				];

				let fields = [
					{table: 0, value: "created_at"}
				];
				let wheres = [
					{table: 0, field: "id", value: "M0.id", operator: "=", valueEscape: ""}
				];

				const sql1 = buildSQL("SELECT", tables, fields, wheres);

				// Main request
				let expected_sql = "SELECT M0.*, T.*, (SELECT M1.created_at FROM message AS M1 WHERE M1.id = M0.id) AS M1_created_at FROM message AS M0, team AS T WHERE M0.id = T.id";

				tables = [
					{value: "message", as: "M0"}, 
					{value: "team", as: "T"}
				];
				fields = [
					{table: 0, value: "*"}, 
					{table: 1, value: "*"},
					{value: `(${sql1})`, as: "M1_created_at", noTable: true}
				];
				// wheres = [
				// 	{table: 0, field: "id", value: 1, operator: "=", separator: "AND"}
				// ];
				// let orders = [
				// 	{table: 0, field: "created_at", way: "DESC"}
				// ];
				let options = {multiple: "id"};

				const sql0 = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql0, expected_sql);
			});

			it("SELECT M0.*, T.*, (SELECT M1.created_at FROM message AS M1 WHERE M1.id = M0.id) AS M1_created_at FROM message AS M0, team AS T WHERE M0.id = 1 AND M0.id = T.id ORDER BY M0.created_at DESC", () => 
			{
				// M1
				let tables = [
					{value: "message", as: "M1"}
				];

				let fields = [
					{table: 0, value: "created_at"}
				];
				let wheres = [
					{table: 0, field: "id", value: "M0.id", operator: "=", valueEscape: ""}
				];

				const sql1 = buildSQL("SELECT", tables, fields, wheres);

				// M0
				let expected_sql = "SELECT M0.*, T.*, (SELECT M1.created_at FROM message AS M1 WHERE M1.id = M0.id) AS M1_created_at FROM message AS M0, team AS T WHERE M0.id = 1 AND M0.id = T.id ORDER BY M0.created_at DESC";

				tables = [
					{value: "message", as: "M0"}, 
					{value: "team", as: "T"}
				];
				fields = [
					{table: 0, value: "*"}, 
					{table: 1, value: "*"},
					{value: `(${sql1})`, as: "M1_created_at", noTable: true}
				];
				wheres = [
					{table: 0, field: "id", value: 1, operator: "=", separator: "AND"}
				];
				let orders = [
					{table: 0, field: "created_at", way: "DESC"}
				];
				let options = {multiple: "id"};

				const sql0 = buildSQL("SELECT", tables, fields, wheres, orders, null, options);

				assert.strictEqual(sql0, expected_sql);
			});

			it("SELECT M0.message_id, M0.recruiter_id, M0.recruiter_pseudo, M0.created_at, M0.content, M0.img_url, M0.staff_verify, T.name, (SELECT M1.created_at FROM message AS M1 WHERE M1.recruiter_id = M0.recruiter_id AND M1.created_at < M0.created_at ORDER BY created_at DESC LIMIT 0, 1) AS M1_created_at, (SELECT M1.content FROM message AS M1 WHERE M1.recruiter_id = M0.recruiter_id AND M1.created_at < M0.created_at ORDER BY created_at DESC LIMIT 0, 1) AS M1_content FROM message AS M0, team AS T WHERE M0.recruiter_id = T.recruiter_id ORDER BY M0.created_at DESC", () => 
			{
				// M1_created_at
				let tables = [
					{value: "message", as: "M1"}
				];

				let fields = [
					{table: 0, value: "created_at"}
				];
				let wheres = [
					{table: 0, field: "recruiter_id", value: "M0.recruiter_id", operator: "=", separator: "AND", valueEscape: ""}, 
					{table: 0, field: "created_at", value: "M0.created_at", operator: "<", valueEscape: ""}
				];
				let orders = [
					{field: "created_at", way: "DESC", noTable: true}
				];
				let LIMITS = {limit: 1, offset: 0};

				const sql1 = buildSQL("SELECT", tables, fields, wheres, orders, LIMITS);

				// M1_content
				tables = [
					{value: "message", as: "M1"}
				];
				fields = [
					{table: 0, value: "content"}
				];

				const sql2 = buildSQL("SELECT", tables, fields, wheres, orders, LIMITS);

				// M0
				let expected_sql = "SELECT M0.message_id, M0.recruiter_id, M0.recruiter_pseudo, M0.created_at, M0.content, M0.img_url, M0.staff_verify, T.name, (SELECT M1.created_at FROM message AS M1 WHERE M1.recruiter_id = M0.recruiter_id AND M1.created_at < M0.created_at ORDER BY created_at DESC LIMIT 1 OFFSET 0) AS M1_created_at, (SELECT M1.content FROM message AS M1 WHERE M1.recruiter_id = M0.recruiter_id AND M1.created_at < M0.created_at ORDER BY created_at DESC LIMIT 1 OFFSET 0) AS M1_content FROM message AS M0, team AS T WHERE M0.recruiter_id = T.recruiter_id ORDER BY M0.created_at DESC";

				tables = [
					{value: "message", as: "M0"}, 
					{value: "team", as: "T"}
				];
				fields = [
					{table: 0, value: "message_id"}, 
					{table: 0, value: "recruiter_id"}, 
					{table: 0, value: "recruiter_pseudo"}, 
					{table: 0, value: "created_at"}, 
					{table: 0, value: "content"}, 
					{table: 0, value: "img_url"}, 
					{table: 0, value: "staff_verify"}, 
					{table: 1, value: "name"},
					{value: `(${sql1})`, as: "M1_created_at", noTable: true}, 
					{value: `(${sql2})`, as: "M1_content", noTable: true}
				];
				orders = [
					{table: 0, field: "created_at", way: "DESC"}
				];
				let options = {multiple: "recruiter_id"};

				const sql0 = buildSQL("SELECT", tables, fields, null, orders, null, options);

				assert.strictEqual(sql0, expected_sql);
			});
		});
	});

	describe("FROM one db but with AS", () => 
	{
		describe("SELECT", () => 
		{
			it("SELECT T.* FROM table_test AS T", () => 
			{
				const expected_sql = "SELECT T.* FROM table_test AS T";

				const tables = [
					{value: "table_test", as: "T"}
				];
				const fields = [
					{table: 0, value: "*"}
				];

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT T.* FROM table_test AS T WHERE T.id = 0", () => 
			{
				const expected_sql = "SELECT T.* FROM table_test AS T WHERE T.id = 0";

				const tables = [
					{value: "table_test", as: "T"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const wheres = [
					{table: 0, field: "id", operator: "=", value: 0}
				];

				const sql = buildSQL("SELECT", tables, fields, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT T.* FROM table_test AS T ORDER BY T.id ASC, T.pseudo DESC", () => 
			{
				const expected_sql = "SELECT T.* FROM table_test AS T ORDER BY T.id ASC, T.pseudo DESC";

				const tables = [
					{value: "table_test", as: "T"}
				];
				const fields = [
					{table: 0, value: "*"}
				];
				const orders = [
					{table: 0, field: "id", way: "ASC"}, 
					{table: 0, field: "pseudo", way: "DESC"}
				];

				const sql = buildSQL("SELECT", tables, fields, null, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT T.id AS UUID FROM table_test AS T", () => 
			{
				const expected_sql = "SELECT T.id AS UUID FROM table_test AS T";

				const tables = [
					{value: "table_test", as: "T"}
				];
				const fields = [
					{table: 0, value: "id", as: "UUID"}
				];

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("INSERT", () => 
		{
			it("INSERT INTO table_test AS T (T.pseudo) VALUES (\"test\")", () => 
			{
				const expected_sql = "INSERT INTO table_test AS T (T.pseudo) VALUES (\"test\")";

				const tables = [
					{value: "table_test", as: "T"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test"}
				];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("UPDATE", () => 
		{
			it("UPDATE table_test AS T SET T.pseudo = \"test_pseudo\"", () => 
			{
				const expected_sql = "UPDATE table_test AS T SET T.pseudo = \"test_pseudo\"";

				const tables = [
					{value: "table_test", as: "T"}
				];
				const fields = [
					{table: 0, field: "pseudo", value: "test_pseudo"}
				];

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("DELETE", () => 
		{
			it("DELETE FROM table_test AS T WHERE T.pseudo = test", () => 
			{
				const expected_sql = "DELETE FROM table_test AS T WHERE T.pseudo = \"test\"";

				const tables = [
					{value: "table_test", as: "T"}
				];
				const wheres = [
					{table: 0, field: "pseudo", operator: "=", value: "test"}
				];

				const sql = buildSQL("DELETE", tables, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});
		});
	});
});
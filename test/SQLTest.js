/* eslint-disable no-undef */
const { buildSQL } = require("../src/SQL");
const assert = require("assert");

describe("SQL", () => 
{
	describe("dev", () => 
	{
		describe("SELECT", () => 
		{
			it("SELECT * FROM table_test", () => 
			{
				const expected_sql = "SELECT * FROM `table_test`;";

				const tables = "table_test";
				const fields = "*";

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT id, pseudo FROM table_test", () => 
			{
				const expected_sql = "SELECT `id`, `pseudo` FROM `table_test`;";

				const tables = "table_test";
				const fields = ["id", "pseudo"];

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table_test WHERE id = 0", () => 
			{
				const expected_sql = "SELECT * FROM `table_test` WHERE `id` = \"0\";";

				const tables = "table_test";
				const fields = "*";
				const wheres = {field: "id", operator: "=", value: "0"};

				const sql = buildSQL("SELECT", tables, fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table_test WHERE id = 0 AND pseudo != \"test\"", () => 
			{
				const expected_sql = "SELECT * FROM `table_test` WHERE `id` = 0 AND `pseudo` != \"test\";";

				const tables = "table_test";
				const fields = "*";
				const wheres = [{field: "id", operator: "=", value: 0}, {field: "pseudo", operator: "!=", value: "test"}];

				const sql = buildSQL("SELECT", tables, fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table_test ORDER BY id ASC", () => 
			{
				const expected_sql = "SELECT * FROM `table_test` ORDER BY `id` ASC;";

				const tables = "table_test";
				const fields = "*";
				const orders = {field: "id", way: "ASC"};

				const sql = buildSQL("SELECT", tables, fields, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table_test ORDER BY id ASC, pseudo DESC", () => 
			{
				const expected_sql = "SELECT * FROM `table_test` ORDER BY `id` ASC, `pseudo` DESC;";

				const tables = "table_test";
				const fields = "*";
				const orders = [{field: "id", way: "ASC"}, {field: "pseudo", way: "DESC"}];

				const sql = buildSQL("SELECT", tables, fields, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table_test LIMIT 5", () => 
			{
				const expected_sql = "SELECT * FROM `table_test` LIMIT 5;";

				const tables = "table_test";
				const fields = "*";
				const limits = 5;

				const sql = buildSQL("SELECT", tables, fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table_test LIMIT 10", () => 
			{
				const expected_sql = "SELECT * FROM `table_test` LIMIT 10;";

				const tables = "table_test";
				const fields = "*";
				const limits = {limit: 10};

				const sql = buildSQL("SELECT", tables, fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table_test LIMIT 10 OFFSET 5", () => 
			{
				const expected_sql = "SELECT * FROM `table_test` LIMIT 10 OFFSET 5;";

				const tables = "table_test";
				const fields = "*";
				const limits = {limit: 10, offset: 5};

				const sql = buildSQL("SELECT", tables, fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT country FROM table_test", () => 
			{
				const expected_sql = "SELECT `country` FROM `table_test`;";

				const tables = "table_test";
				const fields = ["country"];

				const sql = buildSQL("SELECT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT DISTINCT country FROM table_test", () => 
			{
				const expected_sql = "SELECT DISTINCT `country` FROM `table_test`;";

				const tables = "table_test";
				const fields = ["country"];
				const options = {distinct: true};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT COUNT (*) FROM table_test", () => 
			{
				const expected_sql = "SELECT COUNT (*) FROM `table_test`;";

				const tables = "table_test";
				const fields = "*";
				const options = {count: true};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT DISTINCT COUNT (*) FROM table_test", () => 
			{
				const expected_sql = "SELECT DISTINCT COUNT (*) FROM `table_test`;";

				const tables = "table_test";
				const fields = "*";
				const options = {count: true, distinct: true};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("INSERT", () => 
		{
			it("INSERT INTO table_test (pseudo) VALUES (\"test\")", () => 
			{
				const expected_sql = "INSERT INTO `table_test` (`pseudo`) VALUES (\"test\");";

				const tables = "table_test";
				const fields = {field: "pseudo", value: "test"};

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("INSERT INTO table_test (pseudo, activity) VALUES (\"test_pseudo\", \"test_activity\")", () => 
			{
				const expected_sql = "INSERT INTO `table_test` (`pseudo`, `activity`) VALUES (\"test_pseudo\", \"test_activity\");";

				const tables = "table_test";
				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "activity", value: "test_activity"}];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("INSERT INTO table_test (pseudo, points) VALUES (\"test_pseudo\", 10)", () => 
			{
				const expected_sql = "INSERT INTO `table_test` (`pseudo`, `points`) VALUES (\"test_pseudo\", 10);";

				const tables = "table_test";
				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "points", value: 10}];

				const sql = buildSQL("INSERT", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("UPDATE", () => 
		{
			it("UPDATE table_test SET pseudo = \"test_pseudo\"", () => 
			{
				const expected_sql = "UPDATE `table_test` SET `pseudo` = \"test_pseudo\";";

				const tables = "table_test";
				const fields = {field: "pseudo", value: "test_pseudo"};

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET pseudo = \"test_pseudo\", activity = \"test_activity\"", () => 
			{
				const expected_sql = "UPDATE `table_test` SET `pseudo` = \"test_pseudo\", `activity` = \"test_activity\";";

				const tables = "table_test";
				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "activity", value: "test_activity"}];

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET pseudo = \"test_pseudo\", points = 10", () => 
			{
				const expected_sql = "UPDATE `table_test` SET `pseudo` = \"test_pseudo\", `points` = 10;";

				const tables = "table_test";
				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "points", value: 10}];

				const sql = buildSQL("UPDATE", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET activity = \"test_activity\" WHERE pseudo = \"test_pseudo\"", () => 
			{
				const expected_sql = "UPDATE `table_test` SET `activity` = \"test_activity\" WHERE `pseudo` = \"test_pseudo\";";

				const tables = "table_test";
				const fields = {field: "activity", value: "test_activity"};
				const wheres = {field: "pseudo", operator: "=", value: "test_pseudo"};

				const sql = buildSQL("UPDATE", tables, fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET activity = \"test_activity\" WHERE pseudo = \"test_pseudo\" AND line_up != \"test_line_up\"", () => 
			{
				const expected_sql = "UPDATE `table_test` SET `activity` = \"test_activity\" WHERE `pseudo` = \"test_pseudo\" AND `line_up` != \"test_line_up\";";

				const tables = "table_test";
				const fields = {field: "activity", value: "test_activity"};
				const wheres = [{field: "pseudo", operator: "=", value: "test_pseudo"}, {field: "line_up", operator: "!=", value: "test_line_up"}];

				const sql = buildSQL("UPDATE", tables, fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table_test SET activity = \"test_activity\" WHERE pseudo = \"test_pseudo\" AND id = 5", () => 
			{
				const expected_sql = "UPDATE `table_test` SET `activity` = \"test_activity\" WHERE `pseudo` = \"test_pseudo\" AND `id` = 5;";

				const tables = "table_test";
				const fields = {field: "activity", value: "test_activity"};
				const wheres = [{field: "pseudo", operator: "=", value: "test_pseudo"}, {field: "id", operator: "=", value: 5}];

				const sql = buildSQL("UPDATE", tables, fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("DELETE", () => 
		{
			it("DELETE FROM table_test WHERE pseudo = test", () => 
			{
				const expected_sql = "DELETE FROM `table_test` WHERE `pseudo` = \"test\";";

				const tables = "table_test";
				const wheres = {field: "pseudo", operator: "=", value: "test"};

				const sql = buildSQL("DELETE", tables, null, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("DELETE FROM table_test WHERE pseudo = test_pseudo AND activity = test_activity", () => 
			{
				const expected_sql = "DELETE FROM `table_test` WHERE `pseudo` = \"test_pseudo\" AND `activity` != \"test_activity\";";

				const tables = "table_test";
				const wheres = [{field: "pseudo", operator: "=", value: "test_pseudo"}, {field: "activity", operator: "!=", value: "test_activity"}];

				const sql = buildSQL("DELETE", tables, null, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("DELETE FROM table_test WHERE id = 5", () => 
			{
				const expected_sql = "DELETE FROM `table_test` WHERE `id` = 5;";

				const tables = "table_test";
				const wheres = {field: "id", operator: "=", value: 5};

				const sql = buildSQL("DELETE", tables, null, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("TRUNCATE", () => 
		{
			it("DELETE FROM table_test, ALTER TABLE table_test AUTO_INCREMENT = 1", () => 
			{
				const expected_sql = "DELETE FROM `table_test`; ALTER TABLE `table_test` AUTO_INCREMENT = 1;";

				const tables = "table_test";

				const sql = buildSQL("TRUNCATE", tables);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("ALTER", () => 
		{
			it("ALTER TABLE table_test AUTO_INCREMENT = 1", () => 
			{
				const expected_sql = "ALTER TABLE `table_test` AUTO_INCREMENT = 1;";

				const tables = "table_test";
				const fields = {field: "AUTO_INCREMENT", value: 1, noEscape: true};

				const sql = buildSQL("ALTER", tables, fields);

				assert.strictEqual(sql, expected_sql);
			});
		});
	});

	describe("multiple", () => 
	{
		describe("SELECT", () => 
		{
			it("SELECT table1.*, table2.* FROM table1, table2 WHERE table1.id = table2.id", () => 
			{
				const expected_sql = "SELECT `table1.*`, `table2.*` FROM `table1`, `table2` WHERE `table1.id` = `table2.id`;";

				const tables = ["table1", "table2"];
				const fields = ["*", "*"];
				const options = {multiple: "id"};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT member.id, member.pseudo, team.name FROM member, team WHERE member.team_id = team.team_id", () => 
			{
				const expected_sql = "SELECT `member.id`, `member.pseudo`, `team.name` FROM `member`, `team` WHERE `member.team_id` = `team.team_id`;";

				const tables = ["member", "team"];
				const fields = [["id", "pseudo"], ["name"]];
				const options = {multiple: "team_id"};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT member.id, member.pseudo, team.name, color.code FROM member, team, color WHERE member.team_id = team.team_id AND team.team_id = color.team_id", () => 
			{
				const expected_sql = "SELECT `member.id`, `member.pseudo`, `team.name`, `color.code` FROM `member`, `team`, `color` WHERE `member.team_id` = `team.team_id` AND `team.team_id` = `color.team_id`;";

				const tables = ["member", "team", "color"];
				const fields = [["id", "pseudo"], ["name"], ["code"]];
				const options = {multiple: "team_id"};

				const sql = buildSQL("SELECT", tables, fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});
		});
	});

	describe("extra", () => 
	{
		describe("SELECT", () => 
		{
			// extra test
		});

		describe("INSERT", () => 
		{
			// extra test
		});

		describe("UPDATE", () => 
		{
			// extra test
		});

		describe("DELETE", () => 
		{
			// extra test
		});

		describe("TRUNCATE", () => 
		{
			// extra test
		});

		describe("ALTER", () => 
		{
			// extra test
		});
	});
});
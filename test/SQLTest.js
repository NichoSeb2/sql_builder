/* eslint-disable no-undef */
const { buildSQL } = require("../src/SQL");
const assert = require("assert");

describe("SQL", () => 
{
	describe("dev", () => 
	{
		describe("SELECT", () => 
		{
			it("SELECT * FROM table", () => 
			{
				const expected_sql = "SELECT * FROM `table`;";

				const fields = "*";
				const sql = buildSQL("SELECT", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT id, pseudo FROM table", () => 
			{
				const expected_sql = "SELECT `id`, `pseudo` FROM `table`;";

				const fields = ["id", "pseudo"];
				const sql = buildSQL("SELECT", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table WHERE id = 0", () => 
			{
				const expected_sql = "SELECT * FROM `table` WHERE `id` = \"0\";";

				const fields = "*";
				const wheres = {field: "id", operator: "=", value: "0"};
				const sql = buildSQL("SELECT", "table", fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table WHERE id = 0 AND pseudo != \"test\"", () => 
			{
				const expected_sql = "SELECT * FROM `table` WHERE `id` = 0 AND `pseudo` != \"test\";";

				const fields = "*";
				const wheres = [{field: "id", operator: "=", value: 0}, {field: "pseudo", operator: "!=", value: "test"}];
				const sql = buildSQL("SELECT", "table", fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table ORDER BY id ASC", () => 
			{
				const expected_sql = "SELECT * FROM `table` ORDER BY `id` ASC;";

				const fields = "*";
				const orders = {field: "id", way: "ASC"};
				const sql = buildSQL("SELECT", "table", fields, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table ORDER BY id ASC, pseudo DESC", () => 
			{
				const expected_sql = "SELECT * FROM `table` ORDER BY `id` ASC, `pseudo` DESC;";

				const fields = "*";
				const orders = [{field: "id", way: "ASC"}, {field: "pseudo", way: "DESC"}];
				const sql = buildSQL("SELECT", "table", fields, orders);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table LIMIT 5", () => 
			{
				const expected_sql = "SELECT * FROM `table` LIMIT 5;";

				const fields = "*";
				const limits = 5;
				const sql = buildSQL("SELECT", "table", fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table LIMIT 10", () => 
			{
				const expected_sql = "SELECT * FROM `table` LIMIT 10;";

				const fields = "*";
				const limits = {limit: 10};
				const sql = buildSQL("SELECT", "table", fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT * FROM table LIMIT 10 OFFSET 5", () => 
			{
				const expected_sql = "SELECT * FROM `table` LIMIT 10 OFFSET 5;";

				const fields = "*";
				const limits = {limit: 10, offset: 5};
				const sql = buildSQL("SELECT", "table", fields, null, null, limits);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT country FROM table", () => 
			{
				const expected_sql = "SELECT `country` FROM `table`;";

				const fields = ["country"];
				const sql = buildSQL("SELECT", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT DISTINCT country FROM table", () => 
			{
				const expected_sql = "SELECT DISTINCT `country` FROM `table`;";

				const fields = ["country"];
				const options = {distinct: true};
				const sql = buildSQL("SELECT", "table", fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT COUNT (*) FROM table", () => 
			{
				const expected_sql = "SELECT COUNT (*) FROM `table`;";

				const fields = "*";
				const options = {count: true};
				const sql = buildSQL("SELECT", "table", fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});

			it("SELECT DISTINCT COUNT (*) FROM table", () => 
			{
				const expected_sql = "SELECT DISTINCT COUNT (*) FROM `table`;";

				const fields = "*";
				const options = {count: true, distinct: true};
				const sql = buildSQL("SELECT", "table", fields, null, null, null, options);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("INSERT", () => 
		{
			it("INSERT INTO table (pseudo) VALUES (\"test\")", () => 
			{
				const expected_sql = "INSERT INTO `table` (`pseudo`) VALUES (\"test\");";

				const fields = {field: "pseudo", value: "test"};
				const sql = buildSQL("INSERT", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("INSERT INTO table (pseudo, activity) VALUES (\"test_pseudo\", \"test_activity\")", () => 
			{
				const expected_sql = "INSERT INTO `table` (`pseudo`, `activity`) VALUES (\"test_pseudo\", \"test_activity\");";

				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "activity", value: "test_activity"}];
				const sql = buildSQL("INSERT", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("INSERT INTO table (pseudo, points) VALUES (\"test_pseudo\", 10)", () => 
			{
				const expected_sql = "INSERT INTO `table` (`pseudo`, `points`) VALUES (\"test_pseudo\", 10);";

				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "points", value: 10}];
				const sql = buildSQL("INSERT", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("UPDATE", () => 
		{
			it("UPDATE table SET pseudo = \"test_pseudo\"", () => 
			{
				const expected_sql = "UPDATE `table` SET `pseudo` = \"test_pseudo\";";

				const fields = {field: "pseudo", value: "test_pseudo"};
				const sql = buildSQL("UPDATE", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table SET pseudo = \"test_pseudo\", activity = \"test_activity\"", () => 
			{
				const expected_sql = "UPDATE `table` SET `pseudo` = \"test_pseudo\", `activity` = \"test_activity\";";

				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "activity", value: "test_activity"}];
				const sql = buildSQL("UPDATE", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table SET pseudo = \"test_pseudo\", points = 10", () => 
			{
				const expected_sql = "UPDATE `table` SET `pseudo` = \"test_pseudo\", `points` = 10;";

				const fields = [{field: "pseudo", value: "test_pseudo"}, {field: "points", value: 10}];
				const sql = buildSQL("UPDATE", "table", fields);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table SET activity = \"test_activity\" WHERE pseudo = \"test_pseudo\"", () => 
			{
				const expected_sql = "UPDATE `table` SET `activity` = \"test_activity\" WHERE `pseudo` = \"test_pseudo\";";

				const fields = {field: "activity", value: "test_activity"};
				const wheres = {field: "pseudo", operator: "=", value: "test_pseudo"};
				const sql = buildSQL("UPDATE", "table", fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table SET activity = \"test_activity\" WHERE pseudo = \"test_pseudo\" AND line_up != \"test_line_up\"", () => 
			{
				const expected_sql = "UPDATE `table` SET `activity` = \"test_activity\" WHERE `pseudo` = \"test_pseudo\" AND `line_up` != \"test_line_up\";";

				const fields = {field: "activity", value: "test_activity"};
				const wheres = [{field: "pseudo", operator: "=", value: "test_pseudo"}, {field: "line_up", operator: "!=", value: "test_line_up"}];
				const sql = buildSQL("UPDATE", "table", fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("UPDATE table SET activity = \"test_activity\" WHERE pseudo = \"test_pseudo\" AND id = 5", () => 
			{
				const expected_sql = "UPDATE `table` SET `activity` = \"test_activity\" WHERE `pseudo` = \"test_pseudo\" AND `id` = 5;";

				const fields = {field: "activity", value: "test_activity"};
				const wheres = [{field: "pseudo", operator: "=", value: "test_pseudo"}, {field: "id", operator: "=", value: 5}];
				const sql = buildSQL("UPDATE", "table", fields, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("DELETE", () => 
		{
			it("DELETE FROM table WHERE pseudo = test", () => 
			{
				const expected_sql = "DELETE FROM `table` WHERE `pseudo` = \"test\";";

				const wheres = {field: "pseudo", operator: "=", value: "test"};
				const sql = buildSQL("DELETE", "table", null, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("DELETE FROM table WHERE pseudo = test_pseudo AND activity = test_activity", () => 
			{
				const expected_sql = "DELETE FROM `table` WHERE `pseudo` = \"test_pseudo\" AND `activity` != \"test_activity\";";

				const wheres = [{field: "pseudo", operator: "=", value: "test_pseudo"}, {field: "activity", operator: "!=", value: "test_activity"}];
				const sql = buildSQL("DELETE", "table", null, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});

			it("DELETE FROM table WHERE id = 5", () => 
			{
				const expected_sql = "DELETE FROM `table` WHERE `id` = 5;";

				const wheres = {field: "id", operator: "=", value: 5};
				const sql = buildSQL("DELETE", "table", null, null, wheres);

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("TRUNCATE", () => 
		{
			it("DELETE FROM table_test, ALTER TABLE table_test AUTO_INCREMENT = 1", () => 
			{
				const expected_sql = "DELETE FROM `table_test`; ALTER TABLE `table_test` AUTO_INCREMENT = 1;";

				const sql = buildSQL("TRUNCATE", "table_test");

				assert.strictEqual(sql, expected_sql);
			});
		});

		describe("ALTER", () => 
		{
			it("ALTER TABLE table_test AUTO_INCREMENT = 1", () => 
			{
				const expected_sql = "ALTER TABLE `table_test` AUTO_INCREMENT = 1;";

				const fields = {field: "AUTO_INCREMENT", value: 1, noEscape: true};
				const sql = buildSQL("ALTER", "table_test", fields);

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
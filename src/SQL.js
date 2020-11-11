/* eslint-disable no-unused-vars */
function buildTABLES(tables, options)
{
	let sql = [];

	sql.push(tables.map(table => {
		if(table.as !== undefined)return [table.value, "AS", table.as].join(" ");
		else return [table.value].join(" ");
	}).join(", "));

	return sql;
}

function buildWHERES(tables, wheres, options)
{
	let sql = [];

	sql.push("WHERE");

	sql.push(wheres.map(where => {
		if(where.table === undefined) where.table = 0;

		let prefix = (tables[where.table].as !== undefined) ? tables[where.table].as + "." : tables[where.table].value + ".";
		let valueEscape = (where.valueEscape !== undefined ? where.valueEscape : "\"");

		if(where.separator === undefined) return [prefix + where.field, where.operator, (typeof where.value === "number" ? where.value : valueEscape + where.value + valueEscape)].join(" ");
		else return [prefix + where.field, where.operator, (typeof where.value === "number" ? where.value : valueEscape + where.value + valueEscape), where.separator].join(" ");
	}).join(" "));

	return sql;
}

function buildORDERS(tables, orders, options)
{
	let sql = [];

	sql.push("ORDER BY");

	sql.push(orders.map(order => {
		if(order.table === undefined) order.table = 0;

		let prefix = (order.noTable !== undefined && order.noTable === true) ? "" : ((tables[order.table].as !== undefined) ? tables[order.table].as + "." : tables[order.table].value + ".");

		return [prefix + order.field, order.way].join(" ");
	}).join(", "));

	return sql;
}

function buildLIMITS(tables, limits, options)
{
	let sql = [];

	sql.push("LIMIT");

	sql.push(limits.limit);

	if(limits.offset !== undefined)
	{
		sql.push("OFFSET");

		sql.push(limits.offset);
	}

	return sql;
}

function buildSQL(method, tables, fields, wheres = null, orders = null, limits = null, options = {})
{
	method = method.toUpperCase();

	let sql = [];
	let chained = false;

	switch(method)
	{
		case "SELECT":
			sql.push("SELECT");

			if(options.distinct !== undefined && options.distinct === true) sql.push("DISTINCT");

			if(options.count !== undefined && options.count === true)
			{
				sql.push("COUNT");

				sql.push("(" + fields.map(field => {
					if(field.table === undefined) field.table = 0;

					let prefix = (field.noTable !== undefined && field.noTable === true) ? "" : ((tables[field.table].as !== undefined) ? tables[field.table].as + "." : tables[field.table].value + ".");
					let suffix = (field.as !== undefined) ? " " + ["AS", field.as].join(" ") : "";

					return prefix + field.value + suffix;
				}).join(", ") + ")");
			}
			else
			{
				sql.push(fields.map(field => {
					if(field.table === undefined) field.table = 0;

					let prefix = (field.noTable !== undefined && field.noTable === true) ? "" : ((tables[field.table].as !== undefined) ? tables[field.table].as + "." : tables[field.table].value + ".");
					let suffix = (field.as !== undefined) ? " " + ["AS", field.as].join(" ") : "";

					return prefix + field.value + suffix;
				}).join(", "));
			}

			sql.push("FROM");

			sql = sql.concat(buildTABLES(tables, options));

			if(options.multiple !== undefined)
			{
				if(wheres === null) wheres = [];

				for(let i = 1; i < tables.length; i++)
				{
					let prefix = (tables[i].as !== undefined) ? tables[i].as + "." : tables[i].value + ".";

					if(i === tables.length - 1) wheres.push({table: i - 1, field: options.multiple, value: prefix + options.multiple, operator: "=", valueEscape: ""});
					else wheres.push({table: i - 1, field: options.multiple, value: prefix + options.multiple, operator: "=", separator: "AND", valueEscape: ""});
				}
			}

			if(wheres !== null) sql = sql.concat(buildWHERES(tables, wheres, options));

			if(orders !== null) sql = sql.concat(buildORDERS(tables, orders, options));

			if(limits !== null) sql = sql.concat(buildLIMITS(tables, limits, options));
			break;
		case "INSERT":
			sql.push("INSERT");
			sql.push("INTO");

			sql = sql.concat(buildTABLES(tables, options));

			sql.push("(" + fields.map(field => {
				if(field.table === undefined) field.table = 0;

				let prefix = (tables[field.table].as !== undefined) ? tables[field.table].as + "." : tables[field.table].value + ".";

				return prefix + field.field;
			}).join(", ") + ")");

			sql.push("VALUES");

			sql.push("(" + fields.map(field => {
				let valueEscape = (field.valueEscape !== undefined ? field.valueEscape : "\"");

				return (field.value === null || field.value === "null" ? "NULL" : (typeof field.value === "number" ? field.value : valueEscape + field.value + valueEscape));
			}).join(", ") + ")");
			break;
		case "UPDATE":
			sql.push("UPDATE");

			sql = sql.concat(buildTABLES(tables, options));

			sql.push("SET");

			sql.push(fields.map(field => {
				if(field.table === undefined) field.table = 0;

				let prefix = (tables[field.table].as !== undefined) ? tables[field.table].as + "." : tables[field.table].value + ".";
				let valueEscape = (field.valueEscape !== undefined ? field.valueEscape : "\"");

				return prefix + field.field + " = " + (field.value === null || field.value === "null" ? "NULL" : (typeof field.value === "number" ? field.value : valueEscape + field.value + valueEscape));
			}).join(", "));

			if(wheres !== null) sql = sql.concat(buildWHERES(tables, wheres, options));
			break;
		case "DELETE":
			sql.push("DELETE");

			sql.push("FROM");

			sql = sql.concat(buildTABLES(tables, options));

			if(wheres !== null) sql = sql.concat(buildWHERES(tables, wheres, options));
			break;
		case "TRUNCATE":
			sql.push(buildSQL("DELETE", tables));

			fields = [
				{field: "AUTO_INCREMENT", value: 1, noTable: true}
			];

			sql.push(buildSQL("ALTER", tables, fields));

			chained = true;
			break;
		case "ALTER":
			sql.push("ALTER");

			sql.push("TABLE");

			sql = sql.concat(buildTABLES(tables, options));

			sql.push(fields.map(field => {
				if(field.table === undefined) field.table = 0;

				let valueEscape = (field.valueEscape !== undefined ? field.valueEscape : "\"");

				let prefix = (field.noTable !== undefined && field.noTable === true) ? "" : tables[field.table].value + ".";

				return prefix + field.field + " = " + (typeof field.value === "number" ? field.value : valueEscape + field.value + valueEscape);
			}).join(", "));

			break;
		default:
			console.error(method, "isn't supported");
			return;
	}

	return !chained ? sql.join(" ") : sql.join("; ");
}

module.exports.buildSQL = buildSQL;
function buildSQL_wheres(wheres, escape)
{
	let sql = [];

	if(wheres !== null)
	{
		if(typeof wheres === "object" && wheres.length === undefined)
		{
			sql.push("WHERE");
			sql.push([escape + wheres.field + escape, wheres.operator, (typeof wheres.value === "number" ? wheres.value : "\"" + wheres.value + "\"")].join(" "));
		}
		else if(typeof wheres === "object" && wheres.length !== undefined)
		{
			sql.push("WHERE");
			sql.push(wheres.map((where) => { return [escape + where.field + escape, where.operator, (typeof where.value === "number" ? where.value : "\"" + where.value + "\"")].join(" "); }).join(" AND "));
		}
		else console.error("'wheres' must be a string or an object");
	}

	return sql;
}

function buildSQL_orders(orders, escape)
{
	let sql = [];

	if(typeof orders === "object" && orders.length === undefined)
	{
		sql.push("ORDER BY");
		sql.push(escape + orders.field + escape);
		sql.push(orders.way.toUpperCase());
	}
	else if(typeof orders === "object" && orders.length !== undefined)
	{
		sql.push("ORDER BY");
		sql.push(orders.map((order) => { return [escape + order.field + escape, order.way.toUpperCase()].join(" "); }).join(", "));
	}
	else console.error("'orders' must be an object or an array of object");

	return sql;
}

function buildSQL_limits(limits)
{
	let sql = [];

	if(typeof limits === "number")
	{
		sql.push("LIMIT");
		sql.push(limits);
	}
	else if(typeof limits === "object" && limits.length === undefined)
	{
		sql.push("LIMIT");
		sql.push(limits.limit);

		if(limits.offset !== undefined)
		{
			sql.push("OFFSET");
			sql.push(limits.offset);
		}
	}
	else console.error("'limits' must be a number of an object");

	return sql;
}

function buildSQL(method, from, fields, orders = null, wheres = null, limits = null, options = {})
{
	const escape = "`";
	const close = ";";

	let need_close = true;

	method = method.toUpperCase();

	let sql = [];

	switch(method)
	{
		case "SELECT":
			sql.push("SELECT");

			if(options.distinct !== undefined && options.distinct === true)
			{
				sql.push("DISTINCT");
			}

			if(typeof fields === "string" && fields === "*")
			{
				if(options.count !== undefined && options.count === true)
				{
					sql.push("COUNT");
					sql.push("(" + fields + ")");
				}
				else sql.push(fields);
			}
			else if(typeof fields === "object")
			{
				sql.push(fields.map((field) => { return escape + field + escape; }).join(", "));
			}
			else console.error("'fields' must be a string = to * or an array of string");

			sql.push("FROM");
			sql.push(escape + from + escape);

			if(wheres !== null) sql = sql.concat(buildSQL_wheres(wheres, escape));

			if(orders !== null) sql = sql.concat(buildSQL_orders(orders, escape));

			if(limits !== null) sql = sql.concat(buildSQL_limits(limits, escape));
			break;
		case "INSERT":
			sql.push("INSERT");
			sql.push("INTO");

			sql.push(escape + from + escape);

			if(typeof fields === "object" && fields.length === undefined)
			{
				sql.push("(" + escape + fields.field + escape + ")");
				sql.push("VALUES");
				sql.push("(\"" + fields.value + "\")");
			}
			else if(typeof fields === "object" && fields.length !== undefined)
			{
				sql.push("(" + fields.map((field) => { return escape + field.field + escape; }).join(", ") + ")");
				sql.push("VALUES");
				sql.push("(" + fields.map((field) => { return (typeof field.value === "number" ? field.value : "\"" + field.value + "\""); }).join(", ") + ")");
			}
			else console.error("'fields' must be an object or an array of object");

			break;
		case "UPDATE":
			sql.push("UPDATE");

			sql.push(escape + from + escape);

			sql.push("SET");

			if(typeof fields === "object" && fields.length === undefined)
			{
				sql.push(escape + fields.field + escape);
				sql.push("=");
				sql.push("\"" + fields.value + "\"");
			}
			else if(typeof fields === "object" && fields.length !== undefined)
			{
				sql.push(fields.map((field) => { return escape + field.field + escape + " = " + (typeof field.value === "number" ? field.value : "\"" + field.value + "\""); }).join(", "));
			}
			else console.error("'fields' must be an object or an array of object");

			if(wheres !== null) sql = sql.concat(buildSQL_wheres(wheres, escape));

			break;
		case "DELETE":
			sql.push("DELETE");
			sql.push("FROM");
			sql.push(escape + from + escape);

			if(wheres !== null) sql = sql.concat(buildSQL_wheres(wheres, escape));
			break;
		case "TRUNCATE":
			sql.push(buildSQL("DELETE", from));
			sql.push(buildSQL("ALTER", from, {field: "AUTO_INCREMENT", value: 1, noEscape: true}));

			sql.join(" ");

			need_close = false;
			break;
		case "ALTER":
			sql.push("ALTER");
			sql.push("TABLE");
			sql.push(escape + from + escape);

			if(fields.noEscape)
			{
				sql.push(fields.field);
			}
			else
			{
				sql.push(escape + fields.field + escape);
			}

			sql.push("=");
			sql.push(typeof fields.value === "number" ? fields.value : "\"" + fields.value + "\"");
			break;
		default:
			console.error(method, "isn't supported");
			return;
	}

	return need_close ? (sql.join(" ") + close) : (sql.join(" "));
}

module.exports.buildSQL = buildSQL;
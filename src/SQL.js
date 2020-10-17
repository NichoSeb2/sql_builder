function buildSQL_wheres(wheres, escape)
{
	let sql = [];

	if(wheres !== null)
	{
		if(typeof wheres === "object" && wheres.length === undefined)
		{
			sql.push("WHERE");
			sql.push([escape + wheres.field + escape, wheres.operator, (typeof wheres.value === "number" ? wheres.value : (wheres.valueEscape !== undefined ? wheres.valueEscape : "\"") + wheres.value + (wheres.valueEscape !== undefined ? wheres.valueEscape : "\""))].join(" "));
		}
		else if(typeof wheres === "object" && wheres.length !== undefined)
		{
			sql.push("WHERE");
			sql.push(wheres.map((where) => { return [escape + where.field + escape, where.operator, (typeof where.value === "number" ? where.value : (where.valueEscape !== undefined ? where.valueEscape : "\"") + where.value + (where.valueEscape !== undefined ? where.valueEscape : "\""))].join(" "); }).join(" AND "));
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

function buildSQL(method, tables, fields, orders = null, wheres = null, limits = null, options = {})
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

			if(options.multiple !== undefined)
			{
				if(typeof fields === "object")
				{
					let temp_fields = [];

					for(let field_index = 0; field_index < fields.length; field_index++)
					{
						const table = tables[field_index];
						const field = fields[field_index];

						if(typeof field === "string")
						{
							temp_fields.push(escape + table + "." + field + escape);
						}
						else
						{
							temp_fields.push(field.map((f) => { return escape + table + "." + f + escape; }).join(", "));
						}
					}

					sql.push(temp_fields.join(", "));
				}
				else console.error("'fields' must be an array of string or an array of array of string");
			}
			else
			{
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
			}

			sql.push("FROM");

			if(typeof tables === "string")
			{
				sql.push(escape + tables + escape);
			}
			else if(typeof tables === "object")
			{
				sql.push(tables.map((table) => { return escape + table + escape; }).join(", "));
			}
			else console.error("'tables' must be a string or an array of string");

			if(options.multiple !== undefined)
			{
				if(wheres === null)wheres = [];

				for(let table_index = 1; table_index < tables.length; table_index++)
				{
					const previous_table = tables[table_index - 1];
					const table = tables[table_index];

					wheres.push({field: previous_table + "." + options.multiple, value: table + "." + options.multiple, operator: "=", valueEscape: escape});
				}
			}

			if(wheres !== null) sql = sql.concat(buildSQL_wheres(wheres, escape));

			if(orders !== null) sql = sql.concat(buildSQL_orders(orders, escape));

			if(limits !== null) sql = sql.concat(buildSQL_limits(limits, escape));
			break;
		case "INSERT":
			sql.push("INSERT");
			sql.push("INTO");

			sql.push(escape + tables + escape);

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

			sql.push(escape + tables + escape);

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
			sql.push(escape + tables + escape);

			if(wheres !== null) sql = sql.concat(buildSQL_wheres(wheres, escape));
			break;
		case "TRUNCATE":
			sql.push(buildSQL("DELETE", tables));
			sql.push(buildSQL("ALTER", tables, {field: "AUTO_INCREMENT", value: 1, noEscape: true}));

			sql.join(" ");

			need_close = false;
			break;
		case "ALTER":
			sql.push("ALTER");
			sql.push("TABLE");
			sql.push(escape + tables + escape);

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
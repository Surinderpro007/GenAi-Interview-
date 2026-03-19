const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const s = z.object({ a: z.string() });
console.log(zodToJsonSchema);
console.log(typeof zodToJsonSchema);
console.log(zodToJsonSchema(s));

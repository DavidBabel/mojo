// https://docs.datadoghq.com/fr/tracing/setup/nodejs/

import tracer from "dd-trace";

tracer.init();
export default tracer;

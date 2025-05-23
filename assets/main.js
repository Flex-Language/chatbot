(() => {
  "use strict";
  var e = {
      d: (t, r) => {
        for (var n in r)
          e.o(r, n) &&
            !e.o(t, n) &&
            Object.defineProperty(t, n, { enumerable: !0, get: r[n] });
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
      r: (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }
    },
    t = {};
  e.r(t),
    e.d(t, {
      APIConnectionError: () => x,
      APIConnectionTimeoutError: () => E,
      APIError: () => b,
      APIUserAbortError: () => R,
      AuthenticationError: () => v,
      BadRequestError: () => S,
      ConflictError: () => q,
      GroqError: () => w,
      InternalServerError: () => L,
      NotFoundError: () => k,
      PermissionDeniedError: () => A,
      RateLimitError: () => I,
      UnprocessableEntityError: () => P
    });
  const r = "0.4.0";
  let n,
    s,
    o,
    i,
    a,
    u,
    c,
    l,
    d,
    p = !1,
    h = null,
    f = null,
    m = null,
    y = null;
  class g {
    constructor(e) {
      this.body = e;
    }
    get [Symbol.toStringTag]() {
      return "MultipartBody";
    }
  }
  n ||
    (function (e, t = { auto: !1 }) {
      if (p)
        throw new Error(
          `you must \`import 'groq-sdk/shims/${e.kind}'\` before importing anything else from groq-sdk`
        );
      if (n)
        throw new Error(
          `can't \`import 'groq-sdk/shims/${e.kind}'\` after \`import 'groq-sdk/shims/${n}'\``
        );
      (p = t.auto),
        (n = e.kind),
        (s = e.fetch),
        (h = e.Request),
        (f = e.Response),
        (m = e.Headers),
        (o = e.FormData),
        (y = e.Blob),
        (i = e.File),
        (a = e.ReadableStream),
        (u = e.getMultipartRequestOptions),
        (c = e.getDefaultAgent),
        (l = e.fileFromPath),
        (d = e.isFsReadStream);
    })(
      (function ({ manuallyImported: e } = {}) {
        const t = e
          ? "You may need to use polyfills"
          : "Add one of these imports before your first `import … from 'groq-sdk'`:\n- `import 'groq-sdk/shims/node'` (if you're running on Node)\n- `import 'groq-sdk/shims/web'` (otherwise)\n";
        let r, n, s, o;
        try {
          (r = fetch), (n = Request), (s = Response), (o = Headers);
        } catch (e) {
          throw new Error(
            `this environment is missing the following Web Fetch API type: ${e.message}. ${t}`
          );
        }
        return {
          kind: "web",
          fetch: r,
          Request: n,
          Response: s,
          Headers: o,
          FormData:
            "undefined" != typeof FormData
              ? FormData
              : class {
                  constructor() {
                    throw new Error(
                      `file uploads aren't supported in this environment yet as 'FormData' is undefined. ${t}`
                    );
                  }
                },
          Blob:
            "undefined" != typeof Blob
              ? Blob
              : class {
                  constructor() {
                    throw new Error(
                      `file uploads aren't supported in this environment yet as 'Blob' is undefined. ${t}`
                    );
                  }
                },
          File:
            "undefined" != typeof File
              ? File
              : class {
                  constructor() {
                    throw new Error(
                      `file uploads aren't supported in this environment yet as 'File' is undefined. ${t}`
                    );
                  }
                },
          ReadableStream:
            "undefined" != typeof ReadableStream
              ? ReadableStream
              : class {
                  constructor() {
                    throw new Error(
                      `streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${t}`
                    );
                  }
                },
          getMultipartRequestOptions: async (e, t) => ({
            ...t,
            body: new g(e)
          }),
          getDefaultAgent: (e) => {},
          fileFromPath: () => {
            throw new Error(
              "The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/groq/groq-typescript#file-uploads"
            );
          },
          isFsReadStream: (e) => !1
        };
      })(),
      { auto: !0 }
    );
  class w extends Error {}
  class b extends w {
    constructor(e, t, r, n) {
      super(`${b.makeMessage(e, t, r)}`),
        (this.status = e),
        (this.headers = n),
        (this.error = t);
    }
    static makeMessage(e, t, r) {
      const n = t?.message
        ? "string" == typeof t.message
          ? t.message
          : JSON.stringify(t.message)
        : t
        ? JSON.stringify(t)
        : r;
      return e && n
        ? `${e} ${n}`
        : e
        ? `${e} status code (no body)`
        : n || "(no status code or body)";
    }
    static generate(e, t, r, n) {
      if (!e) return new x({ cause: oe(t) });
      const s = t;
      return 400 === e
        ? new S(e, s, r, n)
        : 401 === e
        ? new v(e, s, r, n)
        : 403 === e
        ? new A(e, s, r, n)
        : 404 === e
        ? new k(e, s, r, n)
        : 409 === e
        ? new q(e, s, r, n)
        : 422 === e
        ? new P(e, s, r, n)
        : 429 === e
        ? new I(e, s, r, n)
        : e >= 500
        ? new L(e, s, r, n)
        : new b(e, s, r, n);
    }
  }
  class R extends b {
    constructor({ message: e } = {}) {
      super(void 0, void 0, e || "Request was aborted.", void 0),
        (this.status = void 0);
    }
  }
  class x extends b {
    constructor({ message: e, cause: t }) {
      super(void 0, void 0, e || "Connection error.", void 0),
        (this.status = void 0),
        t && (this.cause = t);
    }
  }
  class E extends x {
    constructor({ message: e } = {}) {
      super({ message: e ?? "Request timed out." });
    }
  }
  class S extends b {
    constructor() {
      super(...arguments), (this.status = 400);
    }
  }
  class v extends b {
    constructor() {
      super(...arguments), (this.status = 401);
    }
  }
  class A extends b {
    constructor() {
      super(...arguments), (this.status = 403);
    }
  }
  class k extends b {
    constructor() {
      super(...arguments), (this.status = 404);
    }
  }
  class q extends b {
    constructor() {
      super(...arguments), (this.status = 409);
    }
  }
  class P extends b {
    constructor() {
      super(...arguments), (this.status = 422);
    }
  }
  class I extends b {
    constructor() {
      super(...arguments), (this.status = 429);
    }
  }
  class L extends b {}
  class $ {
    constructor(e, t) {
      (this.iterator = e), (this.controller = t);
    }
    static fromSSEResponse(e, t) {
      let r = !1;
      const n = new O();
      return new $(async function* () {
        if (r)
          throw new Error(
            "Cannot iterate over a consumed stream, use `.tee()` to split the stream."
          );
        r = !0;
        let s = !1;
        try {
          for await (const r of (async function* () {
            if (!e.body)
              throw (
                (t.abort(),
                new w("Attempted to iterate over a response with no body"))
              );
            const r = new C(),
              s = U(e.body);
            for await (const e of s)
              for (const t of r.decode(e)) {
                const e = n.decode(t);
                e && (yield e);
              }
            for (const e of r.flush()) {
              const t = n.decode(e);
              t && (yield t);
            }
          })())
            if (!s)
              if (r.data.startsWith("[DONE]")) s = !0;
              else if (null === r.event) {
                let e;
                try {
                  e = JSON.parse(r.data);
                } catch (e) {
                  throw (
                    (console.error(
                      "Could not parse message into JSON:",
                      r.data
                    ),
                    console.error("From chunk:", r.raw),
                    e)
                  );
                }
                if (e && e.error) throw new b(void 0, e.error, void 0, void 0);
                yield e;
              }
          s = !0;
        } catch (e) {
          if (e instanceof Error && "AbortError" === e.name) return;
          throw e;
        } finally {
          s || t.abort();
        }
      }, t);
    }
    static fromReadableStream(e, t) {
      let r = !1;
      return new $(async function* () {
        if (r)
          throw new Error(
            "Cannot iterate over a consumed stream, use `.tee()` to split the stream."
          );
        r = !0;
        let n = !1;
        try {
          for await (const t of (async function* () {
            const t = new C(),
              r = U(e);
            for await (const e of r) for (const r of t.decode(e)) yield r;
            for (const e of t.flush()) yield e;
          })())
            n || (t && (yield JSON.parse(t)));
          n = !0;
        } catch (e) {
          if (e instanceof Error && "AbortError" === e.name) return;
          throw e;
        } finally {
          n || t.abort();
        }
      }, t);
    }
    [Symbol.asyncIterator]() {
      return this.iterator();
    }
    tee() {
      const e = [],
        t = [],
        r = this.iterator(),
        n = (n) => ({
          next: () => {
            if (0 === n.length) {
              const n = r.next();
              e.push(n), t.push(n);
            }
            return n.shift();
          }
        });
      return [
        new $(() => n(e), this.controller),
        new $(() => n(t), this.controller)
      ];
    }
    toReadableStream() {
      const e = this;
      let t;
      const r = new TextEncoder();
      return new a({
        async start() {
          t = e[Symbol.asyncIterator]();
        },
        async pull(e) {
          try {
            const { value: n, done: s } = await t.next();
            if (s) return e.close();
            const o = r.encode(JSON.stringify(n) + "\n");
            e.enqueue(o);
          } catch (t) {
            e.error(t);
          }
        },
        async cancel() {
          await t.return?.();
        }
      });
    }
  }
  class O {
    constructor() {
      (this.event = null), (this.data = []), (this.chunks = []);
    }
    decode(e) {
      if ((e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e)) {
        if (!this.event && !this.data.length) return null;
        const e = {
          event: this.event,
          data: this.data.join("\n"),
          raw: this.chunks
        };
        return (this.event = null), (this.data = []), (this.chunks = []), e;
      }
      if ((this.chunks.push(e), e.startsWith(":"))) return null;
      let [t, r, n] = (function (e, t) {
        const r = e.indexOf(":");
        return -1 !== r
          ? [e.substring(0, r), ":", e.substring(r + 1)]
          : [e, "", ""];
      })(e);
      return (
        n.startsWith(" ") && (n = n.substring(1)),
        "event" === t ? (this.event = n) : "data" === t && this.data.push(n),
        null
      );
    }
  }
  class C {
    constructor() {
      (this.buffer = []), (this.trailingCR = !1);
    }
    decode(e) {
      let t = this.decodeText(e);
      if (
        (this.trailingCR && ((t = "\r" + t), (this.trailingCR = !1)),
        t.endsWith("\r") && ((this.trailingCR = !0), (t = t.slice(0, -1))),
        !t)
      )
        return [];
      const r = C.NEWLINE_CHARS.has(t[t.length - 1] || "");
      let n = t.split(C.NEWLINE_REGEXP);
      return 1 !== n.length || r
        ? (this.buffer.length > 0 &&
            ((n = [this.buffer.join("") + n[0], ...n.slice(1)]),
            (this.buffer = [])),
          r || (this.buffer = [n.pop() || ""]),
          n)
        : (this.buffer.push(n[0]), []);
    }
    decodeText(e) {
      if (null == e) return "";
      if ("string" == typeof e) return e;
      if ("undefined" != typeof Buffer) {
        if (e instanceof Buffer) return e.toString();
        if (e instanceof Uint8Array) return Buffer.from(e).toString();
        throw new w(
          `Unexpected: received non-Uint8Array (${e.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`
        );
      }
      if ("undefined" != typeof TextDecoder) {
        if (e instanceof Uint8Array || e instanceof ArrayBuffer)
          return (
            this.textDecoder ?? (this.textDecoder = new TextDecoder("utf8")),
            this.textDecoder.decode(e)
          );
        throw new w(
          `Unexpected: received non-Uint8Array/ArrayBuffer (${e.constructor.name}) in a web platform. Please report this error.`
        );
      }
      throw new w(
        "Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error."
      );
    }
    flush() {
      if (!this.buffer.length && !this.trailingCR) return [];
      const e = [this.buffer.join("")];
      return (this.buffer = []), (this.trailingCR = !1), e;
    }
  }
  function U(e) {
    if (e[Symbol.asyncIterator]) return e;
    const t = e.getReader();
    return {
      async next() {
        try {
          const e = await t.read();
          return e?.done && t.releaseLock(), e;
        } catch (e) {
          throw (t.releaseLock(), e);
        }
      },
      async return() {
        const e = t.cancel();
        return t.releaseLock(), await e, { done: !0, value: void 0 };
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  (C.NEWLINE_CHARS = new Set([
    "\n",
    "\r",
    "\v",
    "\f",
    "",
    "",
    "",
    "",
    "\u2028",
    "\u2029"
  ])),
    (C.NEWLINE_REGEXP = /\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g);
  const B = (e) =>
      null != e &&
      "object" == typeof e &&
      "string" == typeof e.url &&
      "function" == typeof e.blob,
    D = (e) =>
      null != e &&
      "object" == typeof e &&
      "string" == typeof e.name &&
      "number" == typeof e.lastModified &&
      _(e),
    _ = (e) =>
      null != e &&
      "object" == typeof e &&
      "number" == typeof e.size &&
      "string" == typeof e.type &&
      "function" == typeof e.text &&
      "function" == typeof e.slice &&
      "function" == typeof e.arrayBuffer;
  async function T(e, t, r) {
    if (
      ((e = await e),
      r ?? (r = D(e) ? { lastModified: e.lastModified, type: e.type } : {}),
      B(e))
    ) {
      const n = await e.blob();
      return (
        t ||
          (t = new URL(e.url).pathname.split(/[\\/]/).pop() ?? "unknown_file"),
        new i([n], t, r)
      );
    }
    const n = await (async function (e) {
      let t = [];
      if (
        "string" == typeof e ||
        ArrayBuffer.isView(e) ||
        e instanceof ArrayBuffer
      )
        t.push(e);
      else if (_(e)) t.push(await e.arrayBuffer());
      else {
        if (!X(e))
          throw new Error(
            `Unexpected data type: ${typeof e}; constructor: ${
              e?.constructor?.name
            }; props: ${(function (e) {
              return `[${Object.getOwnPropertyNames(e)
                .map((e) => `"${e}"`)
                .join(", ")}]`;
            })(e)}`
          );
        for await (const r of e) t.push(r);
      }
      return t;
    })(e);
    if (
      (t ||
        (t =
          (function (e) {
            return (
              j(e.name) || j(e.filename) || j(e.path)?.split(/[\\/]/).pop()
            );
          })(e) ?? "unknown_file"),
      !r.type)
    ) {
      const e = n[0]?.type;
      "string" == typeof e && (r = { ...r, type: e });
    }
    return new i(n, t, r);
  }
  const j = (e) =>
      "string" == typeof e
        ? e
        : "undefined" != typeof Buffer && e instanceof Buffer
        ? String(e)
        : void 0,
    X = (e) =>
      null != e &&
      "object" == typeof e &&
      "function" == typeof e[Symbol.asyncIterator],
    N = (e) =>
      e &&
      "object" == typeof e &&
      e.body &&
      "MultipartBody" === e[Symbol.toStringTag],
    F = async (e) => {
      const t = await M(e.body);
      return u(t, e);
    },
    M = async (e) => {
      const t = new o();
      return (
        await Promise.all(Object.entries(e || {}).map(([e, r]) => H(t, e, r))),
        t
      );
    },
    H = async (e, t, r) => {
      if (void 0 !== r) {
        if (null == r)
          throw new TypeError(
            `Received null for "${t}"; to pass null in FormData, you must use the string 'null'`
          );
        if (
          "string" == typeof r ||
          "number" == typeof r ||
          "boolean" == typeof r
        )
          e.append(t, String(r));
        else if (((e) => D(e) || B(e) || d(e))(r)) {
          const n = await T(r);
          e.append(t, n);
        } else if (Array.isArray(r))
          await Promise.all(r.map((r) => H(e, t + "[]", r)));
        else {
          if ("object" != typeof r)
            throw new TypeError(
              `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${r} instead`
            );
          await Promise.all(
            Object.entries(r).map(([r, n]) => H(e, `${t}[${r}]`, n))
          );
        }
      }
    };
  async function W(e) {
    const { response: t } = e;
    if (e.options.stream)
      return (
        ue("response", t.status, t.url, t.headers, t.body),
        e.options.__streamClass
          ? e.options.__streamClass.fromSSEResponse(t, e.controller)
          : $.fromSSEResponse(t, e.controller)
      );
    if (204 === t.status) return null;
    if (e.options.__binaryResponse) return t;
    const r = t.headers.get("content-type");
    if (
      r?.includes("application/json") ||
      r?.includes("application/vnd.api+json")
    ) {
      const e = await t.json();
      return ue("response", t.status, t.url, t.headers, e), e;
    }
    const n = await t.text();
    return ue("response", t.status, t.url, t.headers, n), n;
  }
  class G extends Promise {
    constructor(e, t = W) {
      super((e) => {
        e(null);
      }),
        (this.responsePromise = e),
        (this.parseResponse = t);
    }
    _thenUnwrap(e) {
      return new G(this.responsePromise, async (t) =>
        e(await this.parseResponse(t))
      );
    }
    asResponse() {
      return this.responsePromise.then((e) => e.response);
    }
    async withResponse() {
      const [e, t] = await Promise.all([this.parse(), this.asResponse()]);
      return { data: e, response: t };
    }
    parse() {
      return (
        this.parsedPromise ||
          (this.parsedPromise = this.responsePromise.then(this.parseResponse)),
        this.parsedPromise
      );
    }
    then(e, t) {
      return this.parse().then(e, t);
    }
    catch(e) {
      return this.parse().catch(e);
    }
    finally(e) {
      return this.parse().finally(e);
    }
  }
  class K {
    constructor({
      baseURL: e,
      maxRetries: t = 2,
      timeout: r = 6e4,
      httpAgent: n,
      fetch: o
    }) {
      (this.baseURL = e),
        (this.maxRetries = se("maxRetries", t)),
        (this.timeout = se("timeout", r)),
        (this.httpAgent = n),
        (this.fetch = o ?? s);
    }
    authHeaders(e) {
      return {};
    }
    defaultHeaders(e) {
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": this.getUserAgent(),
        ...Z(),
        ...this.authHeaders(e)
      };
    }
    validateHeaders(e, t) {}
    defaultIdempotencyKey() {
      return `stainless-node-retry-${ce()}`;
    }
    get(e, t) {
      return this.methodRequest("get", e, t);
    }
    post(e, t) {
      return this.methodRequest("post", e, t);
    }
    patch(e, t) {
      return this.methodRequest("patch", e, t);
    }
    put(e, t) {
      return this.methodRequest("put", e, t);
    }
    delete(e, t) {
      return this.methodRequest("delete", e, t);
    }
    methodRequest(e, t, r) {
      return this.request(
        Promise.resolve(r).then((r) => ({ method: e, path: t, ...r }))
      );
    }
    getAPIList(e, t, r) {
      return this.requestAPIList(t, { method: "get", path: e, ...r });
    }
    calculateContentLength(e) {
      if ("string" == typeof e) {
        if ("undefined" != typeof Buffer)
          return Buffer.byteLength(e, "utf8").toString();
        if ("undefined" != typeof TextEncoder)
          return new TextEncoder().encode(e).length.toString();
      }
      return null;
    }
    buildRequest(e) {
      const { method: t, path: r, query: n, headers: s = {} } = e,
        o = N(e.body)
          ? e.body.body
          : e.body
          ? JSON.stringify(e.body, null, 2)
          : null,
        i = this.calculateContentLength(o),
        a = this.buildURL(r, n);
      "timeout" in e && se("timeout", e.timeout);
      const u = e.timeout ?? this.timeout,
        l = e.httpAgent ?? this.httpAgent ?? c(a),
        d = u + 1e3;
      return (
        "number" == typeof l?.options?.timeout &&
          d > (l.options.timeout ?? 0) &&
          (l.options.timeout = d),
        this.idempotencyHeader &&
          "get" !== t &&
          (e.idempotencyKey ||
            (e.idempotencyKey = this.defaultIdempotencyKey()),
          (s[this.idempotencyHeader] = e.idempotencyKey)),
        {
          req: {
            method: t,
            ...(o && { body: o }),
            headers: this.buildHeaders({
              options: e,
              headers: s,
              contentLength: i
            }),
            ...(l && { agent: l }),
            signal: e.signal ?? null
          },
          url: a,
          timeout: u
        }
      );
    }
    buildHeaders({ options: e, headers: t, contentLength: r }) {
      const s = {};
      return (
        r && (s["content-length"] = r),
        ae(s, this.defaultHeaders(e)),
        ae(s, t),
        N(e.body) && "node" !== n && delete s["content-type"],
        this.validateHeaders(s, t),
        s
      );
    }
    async prepareOptions(e) {}
    async prepareRequest(e, { url: t, options: r }) {}
    parseHeaders(e) {
      return e
        ? Symbol.iterator in e
          ? Object.fromEntries(Array.from(e).map((e) => [...e]))
          : { ...e }
        : {};
    }
    makeStatusError(e, t, r, n) {
      return b.generate(e, t, r, n);
    }
    request(e, t = null) {
      return new G(this.makeRequest(e, t));
    }
    async makeRequest(e, t) {
      const r = await e;
      null == t && (t = r.maxRetries ?? this.maxRetries),
        await this.prepareOptions(r);
      const { req: n, url: s, timeout: o } = this.buildRequest(r);
      if (
        (await this.prepareRequest(n, { url: s, options: r }),
        ue("request", s, r, n.headers),
        r.signal?.aborted)
      )
        throw new R();
      const i = new AbortController(),
        a = await this.fetchWithTimeout(s, n, o, i).catch(oe);
      if (a instanceof Error) {
        if (r.signal?.aborted) throw new R();
        if ("AbortError" === a.name) throw new E();
        throw new x({ cause: a });
      }
      const u = J(a.headers);
      if (!a.ok) {
        if (t && this.shouldRetry(a))
          return (
            ue(
              `response (error; retrying, ${t} attempts remaining)`,
              a.status,
              s,
              u
            ),
            this.retryRequest(r, t, u)
          );
        const e = await a.text().catch((e) => oe(e).message),
          n = ee(e),
          o = n ? void 0 : e;
        throw (
          (ue(
            `response (error; ${
              t ? "(error; no more retries left)" : "(error; not retryable)"
            })`,
            a.status,
            s,
            u,
            o
          ),
          this.makeStatusError(a.status, n, o, u))
        );
      }
      return { response: a, options: r, controller: i };
    }
    requestAPIList(e, t) {
      const r = this.makeRequest(t, null);
      return new V(this, r, e);
    }
    buildURL(e, t) {
      const r = re(e)
          ? new URL(e)
          : new URL(
              this.baseURL +
                (this.baseURL.endsWith("/") && e.startsWith("/")
                  ? e.slice(1)
                  : e)
            ),
        n = this.defaultQuery();
      return (
        (function (e) {
          if (!e) return !0;
          for (const t in e) return !1;
          return !0;
        })(n) || (t = { ...n, ...t }),
        "object" == typeof t &&
          t &&
          !Array.isArray(t) &&
          (r.search = this.stringifyQuery(t)),
        r.toString()
      );
    }
    stringifyQuery(e) {
      return Object.entries(e)
        .filter(([e, t]) => void 0 !== t)
        .map(([e, t]) => {
          if (
            "string" == typeof t ||
            "number" == typeof t ||
            "boolean" == typeof t
          )
            return `${encodeURIComponent(e)}=${encodeURIComponent(t)}`;
          if (null === t) return `${encodeURIComponent(e)}=`;
          throw new w(
            `Cannot stringify type ${typeof t}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`
          );
        })
        .join("&");
    }
    async fetchWithTimeout(e, t, r, n) {
      const { signal: s, ...o } = t || {};
      s && s.addEventListener("abort", () => n.abort());
      const i = setTimeout(() => n.abort(), r);
      return this.getRequestClient()
        .fetch.call(void 0, e, { signal: n.signal, ...o })
        .finally(() => {
          clearTimeout(i);
        });
    }
    getRequestClient() {
      return { fetch: this.fetch };
    }
    shouldRetry(e) {
      const t = e.headers.get("x-should-retry");
      return (
        "true" === t ||
        ("false" !== t &&
          (408 === e.status ||
            409 === e.status ||
            429 === e.status ||
            e.status >= 500))
      );
    }
    async retryRequest(e, t, r) {
      let n;
      const s = r?.["retry-after-ms"];
      if (s) {
        const e = parseFloat(s);
        Number.isNaN(e) || (n = e);
      }
      const o = r?.["retry-after"];
      if (o && !n) {
        const e = parseFloat(o);
        n = Number.isNaN(e) ? Date.parse(o) - Date.now() : 1e3 * e;
      }
      if (!(n && 0 <= n && n < 6e4)) {
        const r = e.maxRetries ?? this.maxRetries;
        n = this.calculateDefaultRetryTimeoutMillis(t, r);
      }
      return await ne(n), this.makeRequest(e, t - 1);
    }
    calculateDefaultRetryTimeoutMillis(e, t) {
      const r = t - e;
      return (
        Math.min(0.5 * Math.pow(2, r), 8) * (1 - 0.25 * Math.random()) * 1e3
      );
    }
    getUserAgent() {
      return `${this.constructor.name}/JS ${r}`;
    }
  }
  new WeakMap(), Symbol.asyncIterator;
  class V extends G {
    constructor(e, t, r) {
      super(t, async (t) => new r(e, t.response, await W(t), t.options));
    }
    async *[Symbol.asyncIterator]() {
      const e = await this;
      for await (const t of e) yield t;
    }
  }
  const J = (e) =>
      new Proxy(Object.fromEntries(e.entries()), {
        get(e, t) {
          const r = t.toString();
          return e[r.toLowerCase()] || e[r];
        }
      }),
    Q = (e) =>
      "x32" === e
        ? "x32"
        : "x86_64" === e || "x64" === e
        ? "x64"
        : "arm" === e
        ? "arm"
        : "aarch64" === e || "arm64" === e
        ? "arm64"
        : e
        ? `other:${e}`
        : "unknown",
    Y = (e) =>
      (e = e.toLowerCase()).includes("ios")
        ? "iOS"
        : "android" === e
        ? "Android"
        : "darwin" === e
        ? "MacOS"
        : "win32" === e
        ? "Windows"
        : "freebsd" === e
        ? "FreeBSD"
        : "openbsd" === e
        ? "OpenBSD"
        : "linux" === e
        ? "Linux"
        : e
        ? `Other:${e}`
        : "Unknown";
  let z;
  const Z = () =>
      z ??
      (z = (() => {
        if ("undefined" != typeof Deno && null != Deno.build)
          return {
            "X-Stainless-Lang": "js",
            "X-Stainless-Package-Version": r,
            "X-Stainless-OS": Y(Deno.build.os),
            "X-Stainless-Arch": Q(Deno.build.arch),
            "X-Stainless-Runtime": "deno",
            "X-Stainless-Runtime-Version":
              "string" == typeof Deno.version
                ? Deno.version
                : Deno.version?.deno ?? "unknown"
          };
        if ("undefined" != typeof EdgeRuntime)
          return {
            "X-Stainless-Lang": "js",
            "X-Stainless-Package-Version": r,
            "X-Stainless-OS": "Unknown",
            "X-Stainless-Arch": `other:${EdgeRuntime}`,
            "X-Stainless-Runtime": "edge",
            "X-Stainless-Runtime-Version": process.version
          };
        if (
          "[object process]" ===
          Object.prototype.toString.call(
            "undefined" != typeof process ? process : 0
          )
        )
          return {
            "X-Stainless-Lang": "js",
            "X-Stainless-Package-Version": r,
            "X-Stainless-OS": Y(process.platform),
            "X-Stainless-Arch": Q(process.arch),
            "X-Stainless-Runtime": "node",
            "X-Stainless-Runtime-Version": process.version
          };
        const e = (function () {
          if ("undefined" == typeof navigator || !navigator) return null;
          const e = [
            { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
            { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
            {
              key: "ie",
              pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
            },
            {
              key: "chrome",
              pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
            },
            {
              key: "firefox",
              pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
            },
            {
              key: "safari",
              pattern:
                /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
            }
          ];
          for (const { key: t, pattern: r } of e) {
            const e = r.exec(navigator.userAgent);
            if (e)
              return {
                browser: t,
                version: `${e[1] || 0}.${e[2] || 0}.${e[3] || 0}`
              };
          }
          return null;
        })();
        return e
          ? {
              "X-Stainless-Lang": "js",
              "X-Stainless-Package-Version": r,
              "X-Stainless-OS": "Unknown",
              "X-Stainless-Arch": "unknown",
              "X-Stainless-Runtime": `browser:${e.browser}`,
              "X-Stainless-Runtime-Version": e.version
            }
          : {
              "X-Stainless-Lang": "js",
              "X-Stainless-Package-Version": r,
              "X-Stainless-OS": "Unknown",
              "X-Stainless-Arch": "unknown",
              "X-Stainless-Runtime": "unknown",
              "X-Stainless-Runtime-Version": "unknown"
            };
      })()),
    ee = (e) => {
      try {
        return JSON.parse(e);
      } catch (e) {
        return;
      }
    },
    te = new RegExp("^(?:[a-z]+:)?//", "i"),
    re = (e) => te.test(e),
    ne = (e) => new Promise((t) => setTimeout(t, e)),
    se = (e, t) => {
      if ("number" != typeof t || !Number.isInteger(t))
        throw new w(`${e} must be an integer`);
      if (t < 0) throw new w(`${e} must be a positive integer`);
      return t;
    },
    oe = (e) => (e instanceof Error ? e : new Error(e)),
    ie = (e) =>
      "undefined" != typeof process
        ? process.env?.[e]?.trim() ?? void 0
        : "undefined" != typeof Deno
        ? Deno.env?.get?.(e)?.trim()
        : void 0;
  function ae(e, t) {
    for (const s in t) {
      if (((r = t), (n = s), !Object.prototype.hasOwnProperty.call(r, n)))
        continue;
      const o = s.toLowerCase();
      if (!o) continue;
      const i = t[s];
      null === i ? delete e[o] : void 0 !== i && (e[o] = i);
    }
    var r, n;
  }
  function ue(e, ...t) {
    "undefined" != typeof process &&
      "true" === process?.env?.DEBUG &&
      console.log(`Groq:DEBUG:${e}`, ...t);
  }
  const ce = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
      const t = (16 * Math.random()) | 0;
      return ("x" === e ? t : (3 & t) | 8).toString(16);
    });
  class le {
    constructor(e) {
      this._client = e;
    }
  }
  class de extends le {}
  de || (de = {});
  class pe extends le {
    create(e, t) {
      return this._client.post("/openai/v1/chat/completions", {
        body: e,
        ...t,
        stream: e.stream ?? !1
      });
    }
  }
  pe || (pe = {});
  class he extends le {
    constructor() {
      super(...arguments), (this.completions = new pe(this._client));
    }
  }
  !(function (e) {
    e.Completions = pe;
  })(he || (he = {}));
  class fe extends le {
    create(e, t) {
      return this._client.post("/openai/v1/embeddings", { body: e, ...t });
    }
  }
  fe || (fe = {});
  class me extends le {
    create(e, t) {
      return this._client.post(
        "/openai/v1/audio/transcriptions",
        F({ body: e, ...t })
      );
    }
  }
  me || (me = {});
  class ye extends le {
    create(e, t) {
      return this._client.post(
        "/openai/v1/audio/translations",
        F({ body: e, ...t })
      );
    }
  }
  ye || (ye = {});
  class ge extends le {
    constructor() {
      super(...arguments),
        (this.transcriptions = new me(this._client)),
        (this.translations = new ye(this._client));
    }
  }
  !(function (e) {
    (e.Transcriptions = me), (e.Translations = ye);
  })(ge || (ge = {}));
  class we extends le {
    retrieve(e, t) {
      return this._client.get(`/openai/v1/models/${e}`, t);
    }
    list(e) {
      return this._client.get("/openai/v1/models", e);
    }
    delete(e, t) {
      return this._client.delete(`/openai/v1/models/${e}`, t);
    }
  }
  var be;
  we || (we = {});
  class Re extends K {
    constructor({
      baseURL: e = ie("GROQ_BASE_URL"),
      apiKey: t = ie("GROQ_API_KEY"),
      ...r
    } = {}) {
      if (void 0 === t)
        throw new w(
          "The GROQ_API_KEY environment variable is missing or empty; either provide it, or instantiate the Groq client with an apiKey option, like new Groq({ apiKey: 'My API Key' })."
        );
      const n = { apiKey: t, ...r, baseURL: e || "https://api.groq.com" };
      if (
        !n.dangerouslyAllowBrowser &&
        "undefined" != typeof window &&
        void 0 !== window.document &&
        "undefined" != typeof navigator
      )
        throw new w(
          "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew Groq({ apiKey, dangerouslyAllowBrowser: true })"
        );
      super({
        baseURL: n.baseURL,
        timeout: n.timeout ?? 6e4,
        httpAgent: n.httpAgent,
        maxRetries: n.maxRetries,
        fetch: n.fetch
      }),
        (this.completions = new de(this)),
        (this.chat = new he(this)),
        (this.embeddings = new fe(this)),
        (this.audio = new ge(this)),
        (this.models = new we(this)),
        (this._options = n),
        (this.apiKey = t);
    }
    defaultQuery() {
      return this._options.defaultQuery;
    }
    defaultHeaders(e) {
      return { ...super.defaultHeaders(e), ...this._options.defaultHeaders };
    }
    authHeaders(e) {
      return { Authorization: `Bearer ${this.apiKey}` };
    }
  }
  (be = Re),
    (Re.Groq = be),
    (Re.GroqError = w),
    (Re.APIError = b),
    (Re.APIConnectionError = x),
    (Re.APIConnectionTimeoutError = E),
    (Re.APIUserAbortError = R),
    (Re.NotFoundError = k),
    (Re.ConflictError = q),
    (Re.RateLimitError = I),
    (Re.BadRequestError = S),
    (Re.AuthenticationError = v),
    (Re.InternalServerError = L),
    (Re.PermissionDeniedError = A),
    (Re.UnprocessableEntityError = P),
    (Re.toFile = T),
    (Re.fileFromPath = l);
  const {
    GroqError: xe,
    APIError: Ee,
    APIConnectionError: Se,
    APIConnectionTimeoutError: ve,
    APIUserAbortError: Ae,
    NotFoundError: ke,
    ConflictError: qe,
    RateLimitError: Pe,
    BadRequestError: Ie,
    AuthenticationError: Le,
    InternalServerError: $e,
    PermissionDeniedError: Oe,
    UnprocessableEntityError: Ce
  } = t;
  !(function (e) {
    (e.Completions = de),
      (e.Chat = he),
      (e.Embeddings = fe),
      (e.Audio = ge),
      (e.Models = we);
  })(Re || (Re = {}));
  const Ue = new Re({
    apiKey: "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",
    dangerouslyAllowBrowser: !0
  });
  document.addEventListener("DOMContentLoaded", () => {
    const e = document.getElementById("chat-box"),
      t = document.getElementById("user-input");
    function r(e) {
      return e
        .replace(/```([\s\S]*?)```/g, '<div class="code-block">$1</div>')
        .replace(/\n/g, "<br>");
    }
    function scrollChatToBottom() {
      const chatBox = document.getElementById("chat-box");
      chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 100);
    }
    document
      .getElementById("send-button")
      .addEventListener("click", async () => {
        const n = t.value.trim();
        if (n) {
          (function (t, r, n) {
            const s = document.createElement("div");
            s.classList.add("message", "user-message");
            s.innerHTML = `<div class="user-label">User:</div>${r}`;
            e.appendChild(s);
            scrollChatToBottom();
          })(0, n);
          t.value = "";
          await (async function (t) {
            try {
              const n = await Ue.chat.completions.create({
                  messages: [{ role: "user", content: t }],
                  model: "llama3-8b-8192",
                  temperature: 1,
                  max_tokens: 1024,
                  top_p: 1,
                  stream: !0,
                  stop: null
                }),
                s = document.createElement("div");
              s.classList.add("message", "ai-message");
              s.innerHTML = "<div class=\"bot-label\">bor3i:</div><div class=\"ai-content\"></div>";
              e.appendChild(s);
              scrollChatToBottom();
              const aiContent = s.querySelector('.ai-content');
              let o = "";
              for await (const t of n) {
                o += t.choices[0]?.delta?.content || "";
                aiContent.innerHTML = r(o);
                scrollChatToBottom();
              }
              return o;
            } catch (error) {
              console.error("Error calling API:", error);
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("message", "ai-message", "error");
              errorDiv.innerHTML = "<div class=\"bot-label\">bor3i:</div><div class=\"ai-content\">Sorry, I encountered an error. Please try again later.</div>";
              e.appendChild(errorDiv);
              scrollChatToBottom();
              return "Error occurred";
            }
          })(n);
        }
      });
    document
      .getElementById("user-input")
      .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("send-button").click();
        }
      });
    window.addEventListener("load", function () {
      document.getElementById("user-input").focus();
    });
    function adjustUIForScreenSize() {
      const windowWidth = window.innerWidth;
      const chatBox = document.getElementById("chat-box");
      const upbox = document.getElementById("upbox");
      if (windowWidth <= 600) {
        chatBox.style.maxHeight = "calc(100vh - 180px)";
        upbox.style.maxHeight = "180px";
      } else {
        chatBox.style.maxHeight = "none";
        upbox.style.maxHeight = "230px";
      }
      scrollChatToBottom();
    }
    adjustUIForScreenSize();
    window.addEventListener("resize", adjustUIForScreenSize);
    scrollChatToBottom();
  });
})();

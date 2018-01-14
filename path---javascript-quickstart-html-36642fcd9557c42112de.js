webpackJsonp([0xdf8918278a09],{"./node_modules/json-loader/index.js!./.cache/json/javascript-quickstart-html.json":function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="https://github.com/appbaseio/appbase-js">appbase-js</a> is a universal Javascript client library for working with the appbase.io database.  </p>\n<p>It can:</p>\n<ul>\n<li>Index new documents or update / delete existing ones.</li>\n<li>Stream updates to documents, queries or filters over <code>websockets</code>.</li>\n<li>Work universally on Node.JS, Browser, and React Native.</li>\n</ul>\n<p>It can’t:  </p>\n<ul>\n<li>Configure mappings, change analyzers, or capture snapshots. All these are provided by <a href="https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html">elasticsearch.js</a> - the official ElasticSearch JS client library.</li>\n</ul>\n<p><a href="https://appbase.io">Appbase.io - the database service</a> is opinionated about cluster setup and hence doesn’t support the ElasticSearch devops APIs. See (rest.appbase.io)[https://rest.appbase.io] for a full reference on the supported APIs.</p>\n<p>This is a quick start guide to whet the appetite with the possibilities of data streams.</p>\n<h2 id="creating-an-app"><a href="#creating-an-app" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Creating an App</h2>\n<p><img src="https://i.imgur.com/r6hWKAG.gif"></p>\n<p>Log in to <span class="fa fa-external-link"></span> <a href="https://dashboard.appbase.io/">appbase.io dashboard</a>, and create a new app.</p>\n<p>For this tutorial, we will use an app called <code>newstreamingapp</code>. The credentials for this app are <code>meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda</code>.</p>\n<blockquote>\n<p>Note <i class="fa fa-info-circle"></i></p>\n<p>SCALR uses <strong>HTTP Basic Auth</strong>, a widely used protocol for a username:password based authentication.</p>\n</blockquote>\n<h2 id="install-appbase-js"><a href="#install-appbase-js" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Install appbase-js</h2>\n<p>We will fetch and install the <strong>appbase-js</strong> lib using npm. <code>v2.2.1</code> is the most current version.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>npm install appbase<span class="token operator">-</span>js\n</code></pre>\n      </div>\n<p>Adding it in the browser should be a one line script addition.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>node_modules/appbase-js/dist/appbase.js.gz<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script language-javascript"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<p>Alternatively, a UMD build of the library can be used directly from either  <a href="https://cdnjs.com/libraries/appbase-js">CDN.js</a> or <a href="https://cdn.jsdelivr.net/npm/appbase-js/dist/">jsDelivr</a>.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://cdnjs.cloudflare.com/ajax/libs/appbase-js/2.2.1/appbase.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script language-javascript"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<p>To write data or stream updates from <a href="https://appbase.io">appbase.io</a>, we need to first create a reference object. We do this by passing the appbase.io API URL, app name, and credentials into the <code>Appbase</code> constructor:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code><span class="token keyword">var</span> appbaseRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Appbase</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  url<span class="token punctuation">:</span> <span class="token string">"https://scalr.api.appbase.io"</span><span class="token punctuation">,</span>\n  app<span class="token punctuation">:</span> <span class="token string">"newstreamingapp"</span><span class="token punctuation">,</span>\n  credentials<span class="token punctuation">:</span> <span class="token string">"meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p><strong>OR</strong></p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code><span class="token keyword">var</span> appbaseRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Appbase</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  url<span class="token punctuation">:</span> <span class="token string">"https://meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda@scalr.api.appbase.io"</span><span class="token punctuation">,</span>\n  app<span class="token punctuation">:</span> <span class="token string">"newstreamingapp"</span>\n <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Credentials can also be directly passed as a part of the API URL.</p>\n<h2 id="storing-data"><a href="#storing-data" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Storing Data</h2>\n<p>Once we have the reference object (called <code>appbaseRef</code> in this tutorial), we can insert any JSON object into it with the <code>index()</code> method.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code><span class="token keyword">var</span> jsonObject <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n    <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">5595</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>appbaseRef<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    type<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n    id<span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n    body<span class="token punctuation">:</span> jsonObject\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'data\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>where <code>type: \'books\'</code> indicate the collection (or table) inside which the data will be stored and the<code>id: \'1\'</code> is an optional unique identifier.</p>\n<p>The <code>index()</code> method (and all the other <code>appbase</code> methods) return a <a href="https://nodejs.org/api/stream.html#stream_class_stream_readable">stream</a> object. A ‘data’ event handler can be used on the returned object (or in a chained fashion) for listening to all the data changes.</p>\n<blockquote>\n<p>Note <span class="fa fa-info-circle"></span></p>\n<p>If you have noticed, SCALR uses the same APIs and data modeling conventions as <a href="https://www.elastic.co/products/elasticsearch">ElasticSearch</a>. A <strong>type</strong> is equivalent to a collection in MongoDB or a table in SQL, and a <strong>document</strong> is similar to the document in MongoDB and equivalent to a row in SQL.</p>\n</blockquote>\n<h2 id="sgetings-vs-streaming-data"><a href="#sgetings-vs-streaming-data" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><s>GETing</s> vs Streaming Data</h2>\n<p>Unlike typical databases that support GET operations (or Read) for fetching data and queries, Appbase.io operates on both GET and stream modes. We will first apply the GET mode to read our just inserted object.</p>\n<p>Now that we are able to store data, let’s try to get the data back from <a href="https://appbase.io">appbase.io</a> with the <code>get()</code> method.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>appbaseRef<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n      id<span class="token punctuation">:</span> <span class="token string">"X1"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'data\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n<span class="token function">GET</span><span class="token punctuation">(</span><span class="token punctuation">)</span> RESPONSE\n<span class="token punctuation">{</span>\n  <span class="token string">"_index"</span><span class="token punctuation">:</span> <span class="token string">"newstreamingapp"</span><span class="token punctuation">,</span>\n  <span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n  <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n  <span class="token string">"_version"</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n  <span class="token string">"found"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n    <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">5595</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Even though <code>get()</code> returns a single document data, appbase.io returns it as a stream object with the ‘data’ event handler.</p>\n<p>Let’s say that we are interested in subscribing to all the state changes that happen on a document. Here, we would use the <code>getStream()</code> method over <code>get()</code>, which keeps returning new changes made to the document.</p>\n<h3 id="subscribing-to-document-stream"><a href="#subscribing-to-document-stream" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Subscribing to document stream</h3>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>appbaseRef<span class="token punctuation">.</span><span class="token function">getStream</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n      id<span class="token punctuation">:</span> <span class="token string">"X1"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'data\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"new document update: "</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"getStream() failed with: "</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Don’t be surprised if you don’t see anything printed, <code>getStream()</code> only returns when new updates are made to the document.</p>\n<h3 id="observe-the-updates-in-realtime"><a href="#observe-the-updates-in-realtime" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Observe the updates in realtime</h3>\n<p>Let’s see live updates in action. We will modify the book price in our original <code>jsonObject</code> variable from 5595 to 6034 and apply <code>index()</code> again.</p>\n<p>For brevity, we will not show the <code>index()</code> operation here.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code><span class="token function">GETSTREAM</span><span class="token punctuation">(</span><span class="token punctuation">)</span> RESPONSE\n<span class="token punctuation">{</span>\n  <span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n  <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n  <span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n    <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">6034</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the new document update, we can see the price change (5595 -> 6034) being reflected. Subsequent changes will be streamed as JSON objects.</p>\n<p><code>Note:</code> Appbase always streams the final state of an object, and not the diff b/w the old state and the new state. You can compute diffs on the client side by persisting the state using a composition of (_type, _id) fields.</p>\n<h2 id="streaming-rich-queries"><a href="#streaming-rich-queries" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Streaming Rich Queries</h2>\n<p>Streaming document updates are great for building messaging systems or notification feeds on individual objects. What if we were interested in continuously listening to a broader set of data changes? The <code>searchStream()</code> method scratches this itch perfectly.</p>\n<p>In the example below, we will see it in action with a <code>match_all</code> query that returns any time a new document is added to the type ‘books’ or when any of the existing documents are modified.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>appbaseRef<span class="token punctuation">.</span><span class="token function">searchStream</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    type<span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n    body<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        query<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            match_all<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'data\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"searchStream(), new match: "</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"caught a searchStream() error: "</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nRESPONSE WHEN NEW <span class="token class-name">DATA</span> MATCHES\n<span class="token punctuation">{</span>\n  <span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n  <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"X1"</span><span class="token punctuation">,</span>\n  <span class="token string">"_version"</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n  <span class="token string">"found"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n    <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">6034</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p><code>Note:</code> Like <code>getStream()</code>, <code>searchStream()</code> subscribes to the new matches. For fetching existing search results, check out <a href="api-reference.html#getting-data-search"><code>search()</code></a>.</p>\n<p><strong>v0.10.0</strong> introduces a new method <a href="api-reference.html#streaming-data-searchstreamtourl"><code>searchStreamToURL()</code></a> that streams results directly to a URL instead of streaming back.</p>\n<p>In this tutorial, we have learnt how to index new data and stream both individual data and results of an expressive query. <a href="https://appbase.io">Appbase.io</a> supports a wide range of queries.</p>',frontmatter:{title:"Javascript Quick Start",next:"api-reference.html",prev:null,nextTitle:"Javascript API Reference",prevTitle:null},fields:{path:"docs/javascript/quickstart.md",slug:"javascript/quickstart.html"}}},pathContext:{slug:"javascript/quickstart.html"}}}});
//# sourceMappingURL=path---javascript-quickstart-html-36642fcd9557c42112de.js.map
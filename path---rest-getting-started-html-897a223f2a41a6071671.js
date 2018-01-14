webpackJsonp([0xc462c3ae7f7a],{"./node_modules/json-loader/index.js!./.cache/json/rest-getting-started-html.json":function(n,s){n.exports={data:{markdownRemark:{html:'<p>This is a quick start guide to working with the <a href="https://rest.appbase.io">appbase.io REST API</a>.</p>\n<h2 id="create-an-app"><a href="#create-an-app" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Create an App</h2>\n<p><a href="https://imgflip.com/gif/opgl9"><img src="https://i.imgur.com/r6hWKAG.gif"></a><br>\nLog in to <span class="fa fa-external-link"></span> <a href="https://appbase.io/scalr/">Appbase Dashboard</a>, and create a new app.</p>\n<p>For this tutorial, we will use an app called <code>newstreamingapp</code>. The credentials for this app are <code>meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda</code>.</p>\n<blockquote>\n<p>Note <i class="fa fa-info-circle"></i></p>\n<p>SCALR uses <em>HTTP Basic Auth</em>, a widely used protocol for simple username/password authentication. This is similar to how GitHub’s authentication works over <code>https</code>, just imagine every repository (app in our context) having it’s unique &#x3C;username>:&#x3C;password> combination, found under the <strong>Credentials</strong> tab of the dashboard.</p>\n</blockquote>\n<blockquote>\n<p>The full REST API reference is available at <a href="https://rest.appbase.io">https://rest.appbase.io</a>.</p>\n</blockquote>\n<h2 id="setup"><a href="#setup" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Setup</h2>\n<p>Here’s an example authenticated <code>GET</code> request. We will set the app name, username and password as bash variables and reuse them in the requests.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>SET BASH VARIABLES\ncredentials<span class="token operator">=</span><span class="token string">"meqRf8KJC:65cc161a-22ad-40c5-aaaf-5c082d5dcfda"</span>\napp<span class="token operator">=</span><span class="token string">"newstreamingapp"</span>\n\ncurl https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>$credentials@scalr<span class="token punctuation">.</span>api<span class="token punctuation">.</span>appbase<span class="token punctuation">.</span>io<span class="token operator">/</span>$app\n\nRESPONSE\n<span class="token punctuation">{</span>\n    status<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>\n    message<span class="token punctuation">:</span> <span class="token string">"You have reached /newstreamingapp/ and are all set to make API requests"</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2 id="storing-data"><a href="#storing-data" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Storing Data</h2>\n<p>Let’s insert a JSON object. We create a <strong>type</strong> <code>books</code> inside our app and add a JSON document <code>1</code> with a PUT request.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>curl <span class="token operator">-</span>XPUT https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>$credentials@scalr<span class="token punctuation">.</span>api<span class="token punctuation">.</span>appbase<span class="token punctuation">.</span>io<span class="token operator">/</span>$app<span class="token operator">/</span>books<span class="token operator">/</span><span class="token number">1</span> <span class="token operator">--</span>data<span class="token operator">-</span>binary \'<span class="token punctuation">{</span>  \n   <span class="token string">"department_name"</span><span class="token punctuation">:</span><span class="token string">"Books"</span><span class="token punctuation">,</span>\n   <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span><span class="token string">"Books"</span><span class="token punctuation">,</span>\n   <span class="token string">"department_id"</span><span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span>\n   <span class="token string">"name"</span><span class="token punctuation">:</span><span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n   <span class="token string">"price"</span><span class="token punctuation">:</span><span class="token number">5595</span>\n<span class="token punctuation">}</span>\'\n</code></pre>\n      </div>\n<blockquote>\n<p>Note <i class="fa fa-info-circle"></i></p>\n<p>If you have noticed, SCALR uses the same APIs as <a href="https://www.elastic.co/products/elasticsearch">ElasticSearch</a>. A <strong>type</strong> is equivalent to a <em>collection in MongoDB</em> or a <em>table in SQL</em>, and a document is similar to the document in MongoDB and equivalent to a <em>row in SQL</em>.</p>\n</blockquote>\n<h2 id="sgetings-err-streaming-data"><a href="#sgetings-err-streaming-data" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><s>GETing</s> err, Streaming Data</h2>\n<p>Getting live updates to a document is as simple as suffixing <code>?stream=true</code> to a GET request. It’s so awesome that we recommend using this as the default way to GET things.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>curl <span class="token operator">-</span>N https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>$credentials@scalr<span class="token punctuation">.</span>api<span class="token punctuation">.</span>appbase<span class="token punctuation">.</span>io<span class="token operator">/</span>$app<span class="token operator">/</span>books<span class="token operator">/</span><span class="token number">1</span><span class="token operator">?</span>stream<span class="token operator">=</span><span class="token boolean">true</span>\n\nINITIAL RESPONSE\n<span class="token punctuation">{</span>\n  <span class="token string">"_index"</span><span class="token punctuation">:</span> <span class="token string">"app`248"</span><span class="token punctuation">,</span>\n  <span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n  <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>\n  <span class="token string">"_version"</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n  <span class="token string">"found"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n    <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">5595</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Appbase.io keeps an open connection so that every time there is an update in the <code>/$app/books/1</code> document, it is streamed via the connection.</p>\n<h3 id="modify-the-document"><a href="#modify-the-document" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Modify the Document</h3>\n<p>Let’s modify the book price to 6034.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>curl <span class="token operator">-</span>XPUT https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>$credentials@scalr<span class="token punctuation">.</span>api<span class="token punctuation">.</span>appbase<span class="token punctuation">.</span>io<span class="token operator">/</span>$app<span class="token operator">/</span>books<span class="token operator">/</span><span class="token number">1</span> <span class="token operator">--</span>data<span class="token operator">-</span>binary \'<span class="token punctuation">{</span>  \n   <span class="token string">"price"</span><span class="token punctuation">:</span><span class="token number">6034</span><span class="token punctuation">,</span>\n   <span class="token string">"department_name"</span><span class="token punctuation">:</span><span class="token string">"Books"</span><span class="token punctuation">,</span>\n   <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span><span class="token string">"Books"</span><span class="token punctuation">,</span>\n   <span class="token string">"department_id"</span><span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span>\n   <span class="token string">"name"</span><span class="token punctuation">:</span><span class="token string">"A Fake Book on Network Routing"</span>\n<span class="token punctuation">}</span>\'\n</code></pre>\n      </div>\n<h3 id="observe-the-streams"><a href="#observe-the-streams" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Observe the Streams</h3>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>curl <span class="token operator">-</span>N https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>$credentials@scalr<span class="token punctuation">.</span>api<span class="token punctuation">.</span>appbase<span class="token punctuation">.</span>io<span class="token operator">/</span>$app<span class="token operator">/</span>books<span class="token operator">/</span><span class="token number">1</span><span class="token operator">?</span>stream<span class="token operator">=</span><span class="token boolean">true</span>\n\nRESPONSE AFTER <span class="token number">2</span><span class="token punctuation">.</span>a\n<span class="token punctuation">{</span>\n  <span class="token string">"_index"</span><span class="token punctuation">:</span> <span class="token string">"app`248"</span><span class="token punctuation">,</span>\n  <span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n  <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>\n  <span class="token string">"_version"</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n  <span class="token string">"found"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n    <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">5595</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token punctuation">{</span>\n  <span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n  <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>\n  <span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span><span class="token punctuation">,</span>\n    <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">6034</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the new document update, we can see the price change (5595 -> 6034) being reflected. Subsequent changes will be streamed to the resonse as raw JSON objects. As we see, there are no delimiters between between two consecutive JSON responses.</p>\n<blockquote>\n<p>For every <code>?stream=true</code> request, Appbase.io keeps an open connection up to a max of 6 hrs.</p>\n</blockquote>\n<h2 id="streaming-search"><a href="#streaming-search" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Streaming Search</h2>\n<p>Streaming document updates seems straightforward, can we apply rich filters and queries to our streams? Yes, we can. We can specify any ElasticSearch Query DSL request, and get responses via streams.</p>\n<p>We will see it here with a <code>match_all</code> query request.</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code>curl <span class="token operator">-</span>N <span class="token operator">-</span>XPOST https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>$credentials@scalr<span class="token punctuation">.</span>api<span class="token punctuation">.</span>appbase<span class="token punctuation">.</span>io<span class="token operator">/</span>$app<span class="token operator">/</span>books<span class="token operator">/</span>_search<span class="token operator">?</span>stream<span class="token operator">=</span><span class="token boolean">true</span> <span class="token operator">--</span>data<span class="token operator">-</span>binary <span class="token string">\'{"query": {"match_all":{}}}\'</span>\n\nINITIAL RESPONSE\n<span class="token punctuation">{</span>\n  <span class="token string">"took"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  <span class="token string">"timed_out"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token string">"_shards"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"total"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"successful"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"failed"</span><span class="token punctuation">:</span> <span class="token number">0</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token string">"hits"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"total"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"max_score"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    <span class="token string">"hits"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        <span class="token string">"_index"</span><span class="token punctuation">:</span> <span class="token string">"app`248"</span><span class="token punctuation">,</span>\n        <span class="token string">"_type"</span><span class="token punctuation">:</span> <span class="token string">"books"</span><span class="token punctuation">,</span>\n        <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>\n        <span class="token string">"_score"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n        <span class="token string">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          <span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token number">6034</span><span class="token punctuation">,</span>\n          <span class="token string">"department_name"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n          <span class="token string">"department_name_analyzed"</span><span class="token punctuation">:</span> <span class="token string">"Books"</span><span class="token punctuation">,</span>\n          <span class="token string">"department_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n          <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A Fake Book on Network Routing"</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h1 id="rest-api-reference"><a href="#rest-api-reference" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>REST API Reference</h1>\n<p>The full API reference with example snippets in cURL, Ruby, Python, Node, PHP, Go, jQuery can be browsed at <a href="https://rest.appbase.io">rest.appbase.io</a>.</p>',frontmatter:{title:"REST API Quick Start",next:null,prev:null,nextTitle:null,prevTitle:null},fields:{path:"docs/rest/quickstart.md",slug:"rest/getting-started.html"}}},pathContext:{slug:"rest/getting-started.html"}}}});
//# sourceMappingURL=path---rest-getting-started-html-897a223f2a41a6071671.js.map
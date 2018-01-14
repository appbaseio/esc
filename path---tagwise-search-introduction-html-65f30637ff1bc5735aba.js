webpackJsonp([0x6fc86627c8d3],{444:function(t,e){t.exports={data:{markdownRemark:{html:'<h3 id="how-to-build-tag-wise-search-with-elasticsearch"><a href="#how-to-build-tag-wise-search-with-elasticsearch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>How to build tag wise search with Elasticsearch?</h3>\n<p>A tag is a label or metadata used on social networks and blogging services which makes it easier for users to find the data with a specific theme or content. Also, it can be useful to filter data according to single or multiple categories.</p>\n<p>In this chapter, we’re going to build tag wise search very similar to Github’s. We will also show you how to do multiple tag searching and partial tag match.</p>\n<p>We will use <a href="https://www.elastic.co/products/elasticsearch">Elasticsearch</a> as our search engine and the index (and dataset) is hosted on an <a href="https://appbase.io">appbase.io</a> app.</p>\n<h3 id="table-of-contents"><a href="#table-of-contents" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Table of Contents</h3>\n<table>\n<thead>\n<tr>\n<th>Index</th>\n<th>Title</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td><a href="https://appbaseio.gitbooks.io/esc/content/tagwise-search/exact-match.html">Exact Match</a></td>\n<td>How to build a tag wise search similar to Github’s.</td>\n</tr>\n<tr>\n<td>2</td>\n<td><a href="https://appbaseio.gitbooks.io/esc/content/tagwise-search/exact-match.html">Multiple Tag Match</a></td>\n<td>How to find multiple exact values.</td>\n</tr>\n<tr>\n<td>3</td>\n<td><a href="https://appbaseio.gitbooks.io/esc/content/tagwise-search/partial-tag-match-tbh.html">Partial Tag Match</a></td>\n<td>How to provide tag suggestions based on prefix.</td>\n</tr>\n</tbody>\n</table>\n<h3 id="live-demo"><a href="#live-demo" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Live Demo</h3>\n<script async src="//jsfiddle.net/1b8tcxs4/3/embed/"></script>\n<p><a href="https://jsfiddle.net/1b8tcxs4/3/">code</a>\n<strong>TODO:</strong> Embed JSFiddle demo</p>',frontmatter:{title:"Tagwise search: Introduction",next:"exact-match.html",prev:null,nextTitle:"Exact Tag Match",prevTitle:null},fields:{path:"docs/tagwise-search/introduction.md",slug:"tagwise-search/introduction.html"}}},pathContext:{slug:"tagwise-search/introduction.html"}}}});
//# sourceMappingURL=path---tagwise-search-introduction-html-65f30637ff1bc5735aba.js.map
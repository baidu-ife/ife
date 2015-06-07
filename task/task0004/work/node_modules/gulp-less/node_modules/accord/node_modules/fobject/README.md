# fobject
[![Build Status](https://travis-ci.org/slang800/fobject.svg?branch=master)](https://travis-ci.org/slang800/fobject)

A simple promise-based wrapper for file operations that treats files as objects.

```coffee
File = require 'fobject'
configFile = new File('config.json')
configFile.read().done((data) ->
	console.log "contents of #{configFile.path}: #{data}"
)
```

## why?
The default fs module has a really ugly interface (including sync and async copies of almost every function) and doesn't make it easy to work with files that may or may not actually be written to the file-system. fobject abstracts out interaction with the file system so if you want to implement caching, or work with files without writing them to the disk, or whatever else you want: you can do so easily.

## docs
<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dt>
<h4 class="name" id="File"><span class="type-signature"></span>new File<span class="signature">(path)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th>Default</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>path</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
</td>
<td class="default">
</td>
<td class="description last"><p>The path to the file. This will be resolved to an
absolute path, so even if you change your cwd you can still access the same
file.</p></td>
</tr>
<tr>
<td class="name"><code>options.base</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
./
</td>
<td class="description last"><p>Used for relative pathing. This will not
be resolved to an absolute path. Typically where a glob starts.</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L13">lineno 13</a>
</li>
</ul></dd>
</dl>
</dd>
</div>
</article>
</section>
</div><div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="append"><span class="type-signature"></span>append<span class="signature">(data)</span><span class="type-signature"> &rarr; {Promise}</span></h4>
</dt>
<dd>
<div class="description">
<p>Append <code>data</code> to the file</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th>Default</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>data</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Buffer</span>
</td>
<td class="attributes">
</td>
<td class="default">
</td>
<td class="description last"></td>
</tr>
<tr>
<td class="name"><code>options.encoding</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">null</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
'utf8'
</td>
<td class="description last"><p>ignored if data is a
buffer</p></td>
</tr>
<tr>
<td class="name"><code>options.mode</code></td>
<td class="type">
<span class="param-type">Number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
438
</td>
<td class="description last"><p>default is 0666 in Octal</p></td>
</tr>
<tr>
<td class="name"><code>options.flag</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
'w'
</td>
<td class="description last"></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L83">lineno 83</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Promise</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="dirname"><span class="type-signature"></span>dirname<span class="signature">()</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the dirname of the file</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L159">lineno 159</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="extname"><span class="type-signature"></span>extname<span class="signature">()</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the extension of a file</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L147">lineno 147</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="read"><span class="type-signature"></span>read<span class="signature">()</span><span class="type-signature"> &rarr; {Promise}</span></h4>
</dt>
<dd>
<div class="description">
<p>Read from the file</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th>Default</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>options.encoding</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">null</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
null
</td>
<td class="description last"></td>
</tr>
<tr>
<td class="name"><code>options.flag</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
'r'
</td>
<td class="description last"></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L46">lineno 46</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Promise</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="rename"><span class="type-signature"></span>rename<span class="signature">(newPath)</span><span class="type-signature"> &rarr; {Promise}</span></h4>
</dt>
<dd>
<div class="description">
<p>Rename the file</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>newPath</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>The new path for the file. Will be resolved
relative to File.base.</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L103">lineno 103</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Promise</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="stat"><span class="type-signature"></span>stat<span class="signature">()</span><span class="type-signature"> &rarr; {Promise}</span></h4>
</dt>
<dd>
<div class="description">
<p>Return a Stat object for the file</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L135">lineno 135</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Promise</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="unlink"><span class="type-signature"></span>unlink<span class="signature">()</span><span class="type-signature"> &rarr; {Promise}</span></h4>
</dt>
<dd>
<div class="description">
<p>Delete the file</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L123">lineno 123</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Promise</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="write"><span class="type-signature"></span>write<span class="signature">(data)</span><span class="type-signature"> &rarr; {Promise}</span></h4>
</dt>
<dd>
<div class="description">
<p>Write <code>data</code> to the file</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th>Default</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>data</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Buffer</span>
</td>
<td class="attributes">
</td>
<td class="default">
</td>
<td class="description last"></td>
</tr>
<tr>
<td class="name"><code>options.encoding</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">null</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
'utf8'
</td>
<td class="description last"><p>ignored if data is a
buffer</p></td>
</tr>
<tr>
<td class="name"><code>options.mode</code></td>
<td class="type">
<span class="param-type">Number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
438
</td>
<td class="description last"><p>default is 0666 in Octal</p></td>
</tr>
<tr>
<td class="name"><code>options.flag</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="default">
'w'
</td>
<td class="description last"></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/slang800/fobject/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/slang800/fobject/blob/master/index.js#L63">lineno 63</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Promise</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

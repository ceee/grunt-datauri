# grunt-datauri

> create base64 encoded data-uris for css from images



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-datauri --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-datauri');
```

## The "datauri" task

### Overview
The _datauri_ task let's you create css datauri's from images. Supported for all image types. Tested are `png`, `jpg`, `gif`, `bmp`.

If you specify `sass` or `scss` files as destination, than [sass placeholders](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#placeholder_selectors_) are used instead of classes.

The class names are generated from the filename. You can specify prefix and suffix for these names.

### Options

#### options.classPrefix
Type: `String`
Default value: `""`

This `string` is prefixed to all generated class names.

#### options.classSuffix
Type: `String`
Default value: `""`

This `string` is suffixed to all generated class names.

### Options (Files)


#### src
Type: `String` or `Array`

Contains a single image or an array of images.


#### dest
Type: `String` or `Array`

Contains all output css files.


#### files
Type: `Array`

This array can be used as a substitution for `src` and `dest` to allow multi-processing per task.


### Usage Example

_Gruntfile.js_
```js
grunt.initConfig( {
	datauri: {
		default: {
			options: {
				classPrefix: 'data-'
			},
			src: [
				"test/fixtures/test-png.png",
				"test/fixtures/test-gif.gif",
				"test/fixtures/test-jpg.jpg",
				"test/fixtures/test-bmp.bmp"
			],
			dest: [
				"tmp/base64.css",
				"tmp/base64.scss",
				"tmp/base64.sass"
			]
		}
	}
} )
```

##### Output

_tmp/base64.css_
```css
.data-test-png {
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAAN.....");
}
.data-test-gif {
	background-image: url("data:image/png;base64,R0lGODlhZABkAJEA.....");
}
...
```

_tmp/base64.scss_
```scss
%data-test-png {
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAAN.....");
}
...
```

_tmp/base64.sass_
```scss
%data-test-png
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAAN.....");
...
```

## Release History
* 2013-05-16      v0.2.0      add placeholder (sass) support and support for multiple dest-files
* 2013-05-15      v0.1.0      basic functionality


## Contributors
* [@ceee](https://github.com/ceee) Tobias Klika

const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const ROLLUP_PLUGINS = [resolve(), commonjs()];

gulp.task('default', () => {});

gulp.task('copy-webextension-polyfill', async () => {
	gulp.src([
		'./node_modules/webextension-polyfill/dist/browser-polyfill.js',
		'./node_modules/webextension-polyfill/dist/browser-polyfill.js.map'
	])
		.pipe(gulp.dest('./dist/shared'));
});

gulp.task('copy-webextension-polyfill-min', async () => {
	gulp.src([
		'./node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
		'./node_modules/webextension-polyfill/dist/browser-polyfill.min.js.map'
	])
		.pipe(gulp.dest('./dist/shared'));
});

gulp.task('watch:content_scripts', async () => {
  const input = './src/content_scripts/index.js';
  const watcher = rollup.watch({
    input,
    plugins: ROLLUP_PLUGINS,
    output: [
      {
        file: './dist/content_scripts/index.js',
	      format: 'iife',
	      strict: false
      },
    ],
    watch: {
      include: input,
    },
  });

  watcher.on('event', ({ code }) => {
    if (code === 'END') {
			console.log('content_script bundled');
		}
  });
});

gulp.task('watch:background', async () => {
  const input = './src/background/index.js';
  const watcher = rollup.watch({
    input,
    plugins: ROLLUP_PLUGINS,
    output: [
      {
        file: './dist/background/index.js',
        format: 'iife',
      },
    ],
    watch: {
      include: input,
    },
  });

	watcher.on('event', ({ code }) => {
		if (code === 'END') {
			console.log('background bundled');
		}
  });
});

gulp.task('watch', ['copy-webextension-polyfill', 'watch:background', 'watch:content_scripts']);

gulp.task('build:background', async () => {
  console.log('building background');
  const bundle = await rollup.rollup({
    input: './src/background/index.js',
    plugins: ROLLUP_PLUGINS,
  });

  await bundle.write({
    file: './dist/background/index.js',
    format: 'iife',
  });
});

gulp.task('build:content_scripts', async () => {
  console.log('building content_scripts');
  const bundle = await rollup.rollup({
    input: './src/content_scripts/index.js',
    plugins: ROLLUP_PLUGINS,
  })

  await bundle.write({
    file: './dist/content_scripts/index.js',
    format: 'iife',
	  strict: false
  });
});

gulp.task('build:all', ['copy-webextension-polyfill-min', 'build:background', 'build:content_scripts']);

const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const ROLLUP_PLUGINS = [resolve(), commonjs()];

gulp.task('default', () => {});

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

gulp.task('watch', ['watch:content_scripts']);

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

gulp.task('build:all', ['build:content_scripts']);

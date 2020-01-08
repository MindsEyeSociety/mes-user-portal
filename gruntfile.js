/**
 * Grunt dev helper and validator.
 * @author Echo Gregor
 */

module.exports = grunt => {
	'use strict';

	const appjs = [
		'config',
		'controllers',
		'helpers',
		'models',
		'middlewares',
		'migrations',
		'seeds',
		'test',
		'.'
	].map( i => i + '/*.js' );

	grunt.initConfig({
		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			js: {
				files: appjs,
				tasks: [ 'eslint', 'jscs' ]
			}
		},

		eslint: {
			target: appjs,
			options: {
				envs: [ 'node' ]
			}
		},
		jscs: {
			all: appjs
		}
	});

	// Sets watch to prevent exit.
	grunt.event.on( 'watch', function() {
		grunt.option( 'force', true );
	});

	require( 'load-grunt-tasks' )( grunt );

	grunt.registerTask( 'default', [ 'watch' ] );
	grunt.registerTask( 'validate', [ 'eslint', 'jscs' ] );
};

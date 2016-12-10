module.exports = function(grunt){

	grunt.initConfig({
		//Clean and New folder for optimized code
		clean: {
			dev: {
				src: ['dest/'],
			},
		},
		mkdir: {
			dev: {
				options: {
					create: ['dest/']
				},
			},
		},
		//Copy thee files in 'dest' folder
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'source/', src: ['**'], dest: 'dest/'}
				],
			},
		},
		//JS Minification
		uglify: {
			my_target: {
                files: [{
                    expand: true,
                    cwd: 'source/js',
                    src: ['*.js'],
                    dest: 'dest/js'
                }]
            }
		},
		//CSS Minification
		cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'source/css',
                    src: ['*.css'],
                    dest: 'dest/css',
                    ext: '.css'
                }]
            }
        },
	});

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['clean','mkdir','copy','uglify','cssmin']);
};
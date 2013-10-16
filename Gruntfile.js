module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var packageJson = grunt.file.readJSON("package.json"),
        src = 'scripts/openseadragon-viewerinputhook.js',
        minified = 'scripts/openseadragon-viewerinputhook.min.js';

    grunt.initConfig({
        pkg: packageJson,
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [src]
        },
        uglify: {
            options: {
                preserveComments: 'some',
                banner: '//! <%= pkg.name %> ' + packageJson.version + ' <%= grunt.template.today("yyyy-mm-dd") %>\n'
            },
            build: {
                src: src,
                dest: minified
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify']);

};
module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {}]
                    ]
                },
                files: {
                    "./dist/app.min.js": ["./src/Main.js"]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/app.min.js': ['dist/app.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ["./src/*.js"],
                tasks: ["browserify"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["browserify", "uglify"]);
};
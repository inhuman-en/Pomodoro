module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        src: {
            libRoot: 'src/lib',
            root: 'src',
            js: 'src/js',
            css: 'src/css'
        },

        dest: {
            root: 'build',
            js: 'build/js',
            css: 'build/css'
        },

        clean: ["<%= dest.root %>"],

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= src.libRoot %>**/*.js', '<%= src.js %>/**/*.js'],
                dest: '<%= dest.js %>/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= dest.js %>/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    '<%= dest.css %>/<%= pkg.name %>-<%= pkg.version %>.min.css': ['src/css/**/*.css']
                }
            }
        },

        injector: {
            options: {
                ignorePath: "<%= dest.root %>/",
                addRootSlash: false
            },
            local_dependencies: {
                files: {
                    '<%= dest.root %>/index.html': [
                        '<%= dest.js %>/<%= pkg.name %>-<%= pkg.version %>.min.js',
                        '<%= dest.css %>**/*.css'
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true
                },
                files: {
                    '<%= dest.root %>/index.html': 'src/index.html'
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= src.js %>**/*.js', '<%= src.css %>**/*.css', '<%= src.root %>*.html'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        },

        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: 'README.md',
                    dest: '',
                    ext: '.html'
                }]
            },
            options: {
                markdownOptions: {
                    gfm: true
                }
            }
        },

        'http-server': {
            
            // TODO: production setup
            dev: {
                root: "src",
                
                host: "127.0.0.1",
                port: 8282,

                showDir: true,
                autoIndex: true,

                // server default file extension 
                ext: "html",

                // run in parallel with other tasks 
                runInBackground: false,

                // specify a logger function. By default the requests are 
                // sent to stdout. 
                logFn: function(req, res, error) {},

                // Tell grunt task to open the browser 
                openBrowser: true
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-http-server');

    //TODO: add tests
    grunt.registerTask('build', ['clean', 'concat', 'uglify', 'cssmin', 'htmlmin', 'injector']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('serve', ['http-server']);

};